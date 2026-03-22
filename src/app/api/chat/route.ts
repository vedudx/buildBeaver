import OpenAI from "openai";

const BASE_SYSTEM_PROMPT =
  "You are BuildBeaver, a BC small business guide. " +
  "Help users start and register their business in British Columbia. " +
  "Be concise, practical, and explicit when something should be confirmed with an official BC or CRA source. " +
  "Use plain language and never ask the user to repeat information you already have.";

export async function POST(req: Request) {
  const { messages, pageContext, userContext } = await req.json() as {
    messages: { role: "user" | "assistant"; content: string }[];
    pageContext?: string;
    userContext?: string;
  };

  const sections: string[] = [BASE_SYSTEM_PROMPT];
  if (userContext) sections.push(`User's business profile: ${userContext}`);
  if (pageContext) sections.push(`Current page context: ${pageContext}`);

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      { role: "system", content: sections.join("\n\n") },
      ...messages,
    ],
  });

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? "";
        if (text) controller.enqueue(new TextEncoder().encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
