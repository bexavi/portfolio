import { useRef, useState } from "react";

const SUGGESTIONS = ["What have you built with Neo4j?", "Are you open to remote roles?", "Where did you study?", "What's your experience with RAG?"];

type Source = { title: string; href: string };

export function AskPanel() {
  const [q, setQ] = useState("");
  const [asked, setAsked] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<Source[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const ctrl = useRef<AbortController | null>(null);

  async function ask(question: string) {
    if (!question.trim() || busy) return;
    ctrl.current?.abort();
    const c = new AbortController(); ctrl.current = c;
    setAsked(question); setAnswer(""); setSources([]); setError(""); setBusy(true); setQ("");
    try {
      const res = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }), signal: c.signal });
      if (!res.ok || !res.body) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? "Something went wrong. Please try again in a moment.");
      }
      const src = res.headers.get("X-Sources");
      if (src) setSources(JSON.parse(decodeURIComponent(src)) as Source[]);
      const reader = res.body.getReader(); const dec = new TextDecoder();
      for (;;) { const { done, value } = await reader.read(); if (done) break; setAnswer((a) => a + dec.decode(value, { stream: true })); }
    } catch (e) {
      if ((e as Error).name !== "AbortError") setError((e as Error).message);
    } finally { setBusy(false); }
  }

  return (
    <div className="rounded-3xl bg-card p-6 shadow-card md:p-8">
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={() => ask(s)} className="rounded-full border border-border px-4 py-2 text-sm transition hover:border-primary hover:text-accent">{s}</button>
        ))}
      </div>
      <div className="mt-6 min-h-32 rounded-2xl bg-muted/60 p-5" aria-live="polite">
        {!asked && <p className="text-muted-foreground">Answers come only from my profile — education, experience, projects and certifications.</p>}
        {asked && <p className="mb-3 font-display font-bold">{asked}</p>}
        {asked && !answer && busy && <p className="text-muted-foreground">Searching my profile<span className="animate-blink">…</span></p>}
        {answer && <p className="leading-relaxed">{answer}{busy && <span className="animate-blink text-primary"> ▍</span>}</p>}
        {error && <p className="text-destructive">{error}</p>}
        {sources.length > 0 && !busy && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            From:{[...new Map(sources.map((s) => [s.title, s])).values()].map((s) => <a key={s.title} href={s.href.startsWith("#p") ? `/projects${s.href}` : `/${s.href}`} className="tag hover:border-primary">{s.title}</a>)}
          </div>
        )}
      </div>
      <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); void ask(q); }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask anything about me…" maxLength={500}
          className="flex-1 rounded-full border border-input bg-background px-5 py-3 outline-none focus:border-primary focus:shadow-glow" />
        <button disabled={busy || !q.trim()} className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-accent disabled:opacity-50">Ask</button>
      </form>
    </div>
  );
}
