import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5">
      <Link to="/" className="font-display text-lg font-bold">Bekithemba Nkomo</Link>
      <div className="flex flex-wrap gap-5 text-sm font-medium">
        <Link to="/projects" className="border-b-2 border-transparent py-1 hover:border-primary" activeProps={{ className: "border-primary" }}>Projects</Link>
        <a href="/#about" className="border-b-2 border-transparent py-1 hover:border-primary">About</a>
        <a href="/#ask" className="border-b-2 border-transparent py-1 hover:border-primary">Ask me</a>
        <a href="/#contact" className="border-b-2 border-transparent py-1 hover:border-primary">Contact</a>
      </div>
    </nav>
  );
}
