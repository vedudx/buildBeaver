import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are BuildBeaver, a B.C. business setup assistant. Help users understand and complete the current form field. Be brief and plain. Explain options in 1–2 sentences. No legal disclaimers. No off-topic answers.`;

export async function POST(req: Request) {
  const { messages, pageContext, userContext, currentField, fieldOptions } =
    await req.json() as {
      messages: { role: "user" | "assistant"; content: string }[];
      pageContext?: string;
      userContext?: string;
      currentField?: string;
      fieldOptions?: string[];
    };

  // Build system message — only include context that is set
  const ctx: string[] = [SYSTEM_PROMPT];
  if (pageContext) ctx.push(`Step: ${pageContext}`);
  if (currentField) ctx.push(`Field: ${currentField}${fieldOptions?.length ? ` (${fieldOptions.join(" / ")})` : ""}`);
  if (userContext) ctx.push(`User: ${userContext}`);
  const systemContent = ctx.join(" | ");

  // Keep only the last 3 exchanges to minimise input tokens
  const recentMessages = messages.slice(-6);

  console.log("[/api/chat] system:", systemContent);
  console.log("[/api/chat] history turns:", recentMessages.length - 1);
  console.log("[/api/chat] user message:", recentMessages[recentMessages.length - 1]?.content);

  // Gemini requires history to start with a user turn — drop any leading model turns
  const rawHistory = recentMessages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const firstUserIdx = rawHistory.findIndex((m) => m.role === "user");
  const history = firstUserIdx === -1 ? [] : rawHistory.slice(firstUserIdx);
  const userMessage = recentMessages[recentMessages.length - 1].content;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemContent,
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(userMessage);

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("[/api/chat] Gemini error:", err);
    const isQuota =
      (err as { status?: number }).status === 429 ||
      (err instanceof Error && (
        err.message.includes("429") ||
        err.message.toLowerCase().includes("quota")
      ));
    return new Response(
      isQuota
        ? "The AI is temporarily rate-limited. Please wait a moment and try again."
        : "Sorry, something went wrong. Please try again.",
      {
        status: isQuota ? 429 : 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      },
    );
  }
}
