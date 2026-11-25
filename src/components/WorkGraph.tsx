import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { PROJECTS } from "@/data/profile";

const W = 1000, H = 460;
const ANCHORS: [number, number][] = [[160, 200], [400, 300], [620, 160], [860, 290]];

export function WorkGraph() {
  const navigate = useNavigate();
  const [hot, setHot] = useState<string | null>(null);
  const { nodes, edges } = useMemo(() => {
    const tools = [...new Set(PROJECTS.flatMap((p) => p.tags))];
    const pos: Record<string, { x: number; y: number }> = {};
    PROJECTS.forEach((p, i) => { const a = ANCHORS[i] ?? [500, 230]; pos[p.id] = { x: a[0], y: a[1] }; });
    tools.forEach((t) => {
      const owners = PROJECTS.filter((p) => p.tags.includes(t));
      const cx = owners.reduce((s, p) => s + (pos[p.id]?.x ?? 0), 0) / owners.length;
      const cy = owners.reduce((s, p) => s + (pos[p.id]?.y ?? 0), 0) / owners.length;
      const idx = owners[0]?.tags.indexOf(t) ?? 0;
      const ang = idx * 1.05 + owners.length;
      const r = owners.length > 1 ? 40 : 120;
      pos[t] = { x: Math.max(40, Math.min(W - 40, cx + Math.cos(ang) * r)), y: Math.max(30, Math.min(H - 30, cy + Math.sin(ang) * r * 0.9)) };
    });
    return { nodes: { tools, pos }, edges: PROJECTS.flatMap((p) => p.tags.map((t) => [p.id, t] as const)) };
  }, []);
  const near = (id: string) => hot === null || hot === id || edges.some(([a, b]) => (a === hot && b === id) || (b === hot && a === id));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Graph of projects and the tools behind them">
      {edges.map(([a, b]) => {
        const A = nodes.pos[a]!, B = nodes.pos[b]!;
        const on = hot === a || hot === b;
        return <line key={a + b} x1={A.x} y1={A.y} x2={B.x} y2={B.y} className={on ? "stroke-primary" : "stroke-border"} strokeWidth={on ? 2.5 : 1.5} opacity={hot && !on ? 0.25 : 1} />;
      })}
      {nodes.tools.map((t) => {
        const p = nodes.pos[t]!;
        return (
          <g key={t} opacity={near(t) ? 1 : 0.2} onMouseEnter={() => setHot(t)} onMouseLeave={() => setHot(null)}>
            <circle cx={p.x} cy={p.y} r={7} className="fill-foreground stroke-background" strokeWidth={3} />
            <text x={p.x} y={p.y - 13} textAnchor="middle" fontSize={13} className="fill-muted-foreground">{t}</text>
          </g>
        );
      })}
      {PROJECTS.map((pr) => {
        const p = nodes.pos[pr.id]!;
        return (
          <g key={pr.id} tabIndex={0} role="link" aria-label={`${pr.short} project`} className="cursor-pointer outline-none" opacity={near(pr.id) ? 1 : 0.3}
            onMouseEnter={() => setHot(pr.id)} onMouseLeave={() => setHot(null)} onFocus={() => setHot(pr.id)} onBlur={() => setHot(null)}
            onClick={() => navigate({ to: "/projects", hash: pr.id })} onKeyDown={(e) => e.key === "Enter" && navigate({ to: "/projects", hash: pr.id })}>
            <circle cx={p.x} cy={p.y} r={hot === pr.id ? 28 : 23} className="fill-primary stroke-background transition-all" strokeWidth={4} />
            <text x={p.x} y={p.y + 46} textAnchor="middle" fontSize={17} fontWeight={700} className="fill-foreground font-display">{pr.short}</text>
          </g>
        );
      })}
    </svg>
  );
}
