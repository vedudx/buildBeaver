import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are an AI form assistant inside "BuildBeaver", a web app that helps users start a business in Canada.

ROLE
Help users understand and complete form fields in the current step.

CONTEXT
You are given the current step, the current field (if applicable), available options, and the user's business details. Always use this context — never ask the user to repeat information you already have.

BEHAVIOR
- Be concise and clear
- Explain terms in simple, non-legal language
- Focus on the specific field or question the user asks about
- Give practical guidance, not theory

FIELD HELP
When a user asks about a form option (e.g. "What is sole proprietorship?"):
- Give a 1–2 sentence explanation
- Include when to choose it
- Default recommendation: suggest the simplest option if appropriate

Example: "Sole proprietorship means you personally own the business. It's the simplest and cheapest option, and most people choose this when starting small."

COMPARISONS (if relevant)
If multiple options exist, briefly compare them.
Example: "Sole proprietorship is simple but you are personally liable. A corporation is more complex but separates your personal and business liability."

FORM GUIDANCE
- Help users choose the best option for their situation
- Suggest reasonable inputs if needed
- Do NOT generate random or unrealistic data

RULES
- Do NOT give legal disclaimers
- Do NOT over-explain
- Do NOT go off-topic

GOAL
Help the user quickly understand the field and confidently choose an option.`;

export async function POST(req: Request) {
  const { messages, pageContext, userContext, currentField, fieldOptions } =
    await req.json() as {
      messages: { role: "user" | "assistant"; content: string }[];
      pageContext?: string;
      userContext?: string;
      currentField?: string;
      fieldOptions?: string[];
    };

  // Build the system instruction with all available context
  const contextSections: string[] = [SYSTEM_PROMPT];
  if (userContext) contextSections.push(`User's business profile: ${userContext}`);
  if (pageContext) contextSections.push(`Current step: ${pageContext}`);
  if (currentField) contextSections.push(`Current field the user is focused on: ${currentField}`);
  if (fieldOptions?.length) {
    contextSections.push(`Available options for this field: ${fieldOptions.join(", ")}`);
  }

  // Gemini uses "user" / "model" roles (not "assistant")
  // The last message must be from the user — split history from the final prompt
  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const userMessage = messages[messages.length - 1].content;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: contextSections.join("\n\n"),
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
}
