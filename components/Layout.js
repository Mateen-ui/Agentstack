import Head from "next/head";
import Link from "next/link";
import LogoMark from "./LogoMark";

const SITE_TITLE = "AgentStack";
const SITE_DESCRIPTION =
  "A field guide to AI coding agents — how they work, which one to use, and how to run them without breaking production.";

export default function Layout({ children, title, description }) {
  const pageTitle = title ? `${title} — ${SITE_TITLE}` : `${SITE_TITLE} — The AI Coding Agents Blog`;

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-body">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description || SITE_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      <header className="border-b border-line">
        <div className="max-w-3xl mx-auto px-5 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoMark size={30} />
            <span className="font-display font-semibold text-lg tracking-tight text-ink">
              {SITE_TITLE}
            </span>
          </Link>
          <nav className="flex gap-6 text-[0.95rem] text-muted">
            <Link href="/" className="hover:text-ink transition-colors">
              Guides
            </Link>
            <Link href="/about" className="hover:text-ink transition-colors">
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-5 py-12 w-full">{children}</main>

      <footer className="border-t border-line">
        <div className="max-w-3xl mx-auto px-5 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-muted">
          <span>© {new Date().getFullYear()} {SITE_TITLE}. Built with Next.js.</span>
          <span className="font-mono text-xs">agentstack.dev</span>
        </div>
      </footer>
    </div>
  );
}
