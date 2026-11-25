import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { WorkGraph } from "@/components/WorkGraph";
import { AskPanel } from "@/components/AskPanel";
import { SKILLS } from "@/data/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bekithemba Nkomo — Data Analyst & Graph Data Science" },
      { name: "description", content: "Data analyst in Harare building graph-powered data products. Explore projects or ask anything about my qualifications." },
      { property: "og:title", content: "Bekithemba Nkomo — Data Analyst" },
      { property: "og:description", content: "Graph-powered data products, Neo4j certified. Ask the portfolio anything about my work." },
    ],
  }),
  component: Index,
});

const EDU = [
  ["2025–26", "M.S., Data Analytics and Visualization", "Katz School of Science and Health, Yeshiva University, New York"],
  ["PGDip", "Sustainable Project Management, Monitoring and Evaluation", "Midlands State University, Zimbabwe"],
  ["2020", "B.Sc. Honours, Computer Science", "National University of Science and Technology (NUST), Zimbabwe"],
];
const EXP = [
  ["2026", "AI annotation and evaluation fellow", "Code evaluation, fail-to-pass test writing and model-response review"],
  ["2023", "Administrative and Finance Clerk, FHI 360", "Procurement and finance administration"],
  ["2022–23", "Information Technology Assistant, FHI 360", "IT for offices across two provinces, 80+ users, security and backup"],
  ["2021–22", "Information Technology Intern, FHI 360", "Azure and SharePoint administration"],
  ["2018–19", "ICT Intern, City of Harare", "Harare"],
];
const CERTS = [
  ["Neo4j Graph Data Science Certification", "Neo4j GraphAcademy · March 2026"],
  ["AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents", "Udemy · Ed Donner and Ligency · April 2026"],
];

function Index() {
  return (
    <main>
      <SiteNav />
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-10">
        <p className="animate-rise text-sm font-semibold uppercase tracking-widest text-accent">Data analyst · Harare, Zimbabwe</p>
        <h1 className="animate-rise mt-4 max-w-4xl text-5xl font-bold md:text-7xl">I build <span className="text-primary">graph-powered</span> data products.</h1>
        <p className="animate-rise mt-6 max-w-2xl text-lg text-muted-foreground">I turn connected data into decisions: supply-chain risk networks, research chatbots grounded in knowledge graphs, and recommenders that learn from relationships.</p>
        <div className="animate-rise mt-8 flex flex-wrap gap-3">
          <Link to="/projects" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-accent">View projects</Link>
          <a href="#ask" className="rounded-full border-2 border-foreground px-6 py-3 font-semibold transition hover:border-primary hover:text-accent">Ask about me</a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <div className="rounded-3xl border border-border bg-card/50 p-4">
          <WorkGraph />
          <p className="px-2 pb-1 text-sm text-muted-foreground">My work as a graph. Pink nodes are projects — click one to open it.</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[["M.S. Data Analytics", "Yeshiva University"], ["B.Sc. Hons CS", "NUST Zimbabwe, 2020"], ["Neo4j GDS certified", "Cypher, GDS, NeoDash"], ["3 languages", "English, Shona, Ndebele"]].map(([a, b]) => (
            <div key={a} className="rounded-2xl bg-card p-5 shadow-card"><p className="font-display text-lg font-bold">{a}</p><p className="text-sm text-muted-foreground">{b}</p></div>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="text-4xl font-bold">About</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>I started in IT in Harare, first at the City of Harare and then at FHI 360, where I ran the IT for offices across two provinces and kept more than 80 people connected, secure and backed up. That taught me data only matters when someone can act on it.</p>
            <p>Graduate study took me deep into graph data science: modelling networks in Neo4j, running PageRank, Betweenness Centrality and Louvain, and presenting results in dashboards people actually use.</p>
            <p>I'm looking for roles in data analytics, data product design and development, and product ownership.</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {SKILLS.map((s) => (
            <div key={s.h}><h3 className="text-base font-bold">{s.h}</h3><div className="mt-2 flex flex-wrap gap-1.5">{s.i.map((t) => <span key={t} className="tag">{t}</span>)}</div></div>
          ))}
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-3">
          {[["Education", EDU], ["Experience", EXP]].map(([title, rows]) => (
            <div key={title as string} className={title === "Experience" ? "md:col-span-2" : ""}>
              <h2 className="text-3xl font-bold">{title as string}</h2>
              <ol className="mt-6 space-y-5">
                {(rows as string[][]).map(([y, t, d]) => (
                  <li key={t} className="grid grid-cols-[5rem_1fr] gap-3"><span className="font-display text-primary">{y}</span><div><p className="font-semibold">{t}</p><p className="text-sm opacity-70">{d}</p></div></li>
                ))}
              </ol>
            </div>
          ))}
          <div className="md:col-span-3">
            <h2 className="text-3xl font-bold">Certifications</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {CERTS.map(([t, d]) => <div key={t} className="rounded-2xl border border-secondary-foreground/20 p-5"><p className="font-display font-bold">{t}</p><p className="text-sm opacity-70">{d}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="ask" className="mx-auto max-w-4xl px-5 py-20">
        <h2 className="text-4xl font-bold">Ask about me</h2>
        <p className="mt-3 text-muted-foreground">Your question pulls the matching parts of my profile, and the reply is written only from those passages.</p>
        <div className="mt-8"><AskPanel /></div>
      </section>

      <section id="contact" className="bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-4xl font-bold md:text-6xl">Let's work with your data.</h2>
          <p className="mt-4 opacity-70">Open to data analytics, data product and product owner roles, in Zimbabwe or remote.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:bnkomo984@gmail.com" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-accent">bnkomo984@gmail.com</a>
            <a href="https://linkedin.com/in/bekithemba-nkomo-da" target="_blank" rel="noreferrer" className="rounded-full border-2 border-secondary-foreground/40 px-6 py-3 font-semibold hover:border-primary">LinkedIn</a>
            <a href="https://github.com/bexavi" target="_blank" rel="noreferrer" className="rounded-full border-2 border-secondary-foreground/40 px-6 py-3 font-semibold hover:border-primary">GitHub</a>
          </div>
          <p className="mt-16 text-sm opacity-50">© 2026 Bekithemba Nkomo · Harare, Zimbabwe</p>
        </div>
      </section>
    </main>
  );
}
