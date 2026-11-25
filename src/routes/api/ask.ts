import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { retrieve } from "@/lib/retrieve";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId } from "@/lib/ai/run-id";

export const Route = createFileRoute("/api/ask")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => ({}))) as { question?: unknown };
        const question = typeof body.question === "string" ? body.question.trim().slice(0, 500) : "";
        if (!question) return Response.json({ error: "Please type a question." }, { status: 400 });
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "The assistant is not configured." }, { status: 500 });

        const passages = retrieve(question);
        const context = passages.map((p, i) => `[${i + 1}] ${p.title}: ${p.say}`).join("\n");
        const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
        const provider = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
          fetch: runIdFetch.fetch,
        });
        const result = streamText({
          model: provider.responses("openai/gpt-6-astra"),
          system:
            "You answer questions about Bekithemba Nkomo for recruiters and visitors to his portfolio. Write in first person as Bekithemba, warm and concise (2-4 sentences). Use ONLY the passages provided. If they don't answer the question, say you don't have that detail here and suggest emailing bnkomo984@gmail.com. No markdown headings.",
          messages: [{ role: "user", content: `Passages:\n${context}\n\nQuestion: ${question}` }],
          abortSignal: request.signal,
          providerOptions: { openai: { store: false, forceReasoning: true, reasoningEffort: "low", include: ["reasoning.encrypted_content"] } },
        });
        const res = result.toTextStreamResponse();
        const headers = new Headers(res.headers);
        headers.set("X-Sources", encodeURIComponent(JSON.stringify(passages.map((p) => ({ title: p.title, href: p.href })))));
        return new Response(res.body, { status: res.status, headers });
      },
    },
  },
});
