import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { PROJECTS } from "@/data/profile";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Bekithemba Nkomo" },
      { name: "description", content: "Graph data science projects: supply chain risk analytics, a GraphRAG research chatbot, a graph movie recommender and AI evaluation work." },
      { property: "og:title", content: "Projects — Bekithemba Nkomo" },
      { property: "og:description", content: "Neo4j, GraphRAG and recommender projects by data analyst Bekithemba Nkomo." },
    ],
  }),
  component: Projects,
});

function Projects() {
  const tags = [...new Set(PROJECTS.flatMap((p) => p.tags))];
  const [tag, setTag] = useState<string | null>(null);
  const list = tag ? PROJECTS.filter((p) => p.tags.includes(tag)) : PROJECTS;
  return (
    <main className="min-h-screen pb-24">
      <SiteNav />
      <section className="mx-auto max-w-6xl px-5 pt-10">
        <h1 className="animate-rise text-5xl font-bold md:text-6xl">Selected work</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Filter by tool or method to see where I've used it.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <button onClick={() => setTag(null)} className={`tag ${tag === null ? "border-primary bg-primary text-primary-foreground" : ""}`}>All</button>
          {tags.map((t) => <button key={t} onClick={() => setTag(t === tag ? null : t)} className={`tag hover:border-primary ${tag === t ? "border-primary bg-primary text-primary-foreground" : ""}`}>{t}</button>)}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {list.map((p, i) => (
            <article key={p.id} id={p.id} className="animate-rise scroll-mt-24 rounded-3xl bg-card p-7 shadow-card transition hover:-translate-y-1 target:shadow-glow" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">{p.kind}</p>
                <span className="font-display text-3xl font-bold text-primary/30">0{PROJECTS.indexOf(p) + 1}</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold">{p.title}</h2>
              <p className="mt-3 text-muted-foreground">{p.text}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
            </article>
          ))}
        </div>
        <div className="mt-14 rounded-3xl bg-ink p-8">
          <p className="font-display text-2xl font-bold">Curious about a project?</p>
          <Link to="/" hash="ask" className="mt-4 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-accent">Ask me about it</Link>
        </div>
      </section>
    </main>
  );
}
