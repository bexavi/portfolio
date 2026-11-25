import { KB, type Passage } from "@/data/profile";

const STOP = new Set("a an the is are was were do does did you your i me my of to in on for and or with what who where when how have has about can tell".split(" "));

export function tokenize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9+@.\- ]/g, " ").split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w));
}

/** Keyword retrieval over the profile passages; returns the best matches. */
export function retrieve(question: string, k = 5): Passage[] {
  const q = tokenize(question);
  const scored = KB.map((p) => {
    const hay = tokenize(`${p.keys} ${p.title} ${p.say}`);
    const set = new Set(hay);
    let score = 0;
    for (const w of q) {
      if (set.has(w)) score += 2;
      else if (hay.some((h) => h.startsWith(w) || w.startsWith(h))) score += 1;
    }
    return { p, score };
  }).filter((x) => x.score > 0);
  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, k).map((x) => x.p);
  return top.length ? top : KB.filter((p) => p.id === "who" || p.id === "looking");
}
