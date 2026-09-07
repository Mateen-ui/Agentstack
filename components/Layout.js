import Head from "next/head";
import Link from "next/link";
import LogoMark from "./LogoMark";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, SITE_TWITTER } from "../lib/site";

export default function Layout({
  children,
  title,
  description,
  keywords,
  canonical, // path only, e.g. "/posts/my-post" -- SITE_URL is prepended
  ogImage,
  ogType = "website",
  jsonLd, // object or array of objects to emit as JSON-LD
}) {
  const pageTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — The AI Coding Agents Blog`;
  const desc = description || SITE_DESCRIPTION;
  const canonicalUrl = `${SITE_URL}${canonical || ""}`;
  const image = ogImage || `${SITE_URL}/favicon.svg`;
  const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url(/bg-network.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-screen flex flex-col bg-paper/90 backdrop-blur-sm text-ink font-body">
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={desc} />
          {keywords && <meta name="keywords" content={keywords} />}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href={canonicalUrl} />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <meta name="google-site-verification" content="siVuAlWtY2uDcJtA_iRN1aO8huUyJsADHnEGHCoYQJ0" />

          {/* Open Graph */}
          <meta property="og:site_name" content={SITE_NAME} />
          <meta property="og:type" content={ogType} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={desc} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:image" content={image} />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={SITE_TWITTER} />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={desc} />
          <meta name="twitter:image" content={image} />

          {jsonLdList.map((obj, i) => (
            <script
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
            />
          ))}
        </Head>
        <header className="border-b border-line">
          <div className="max-w-3xl mx-auto px-5 py-5 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <LogoMark size={30} />
              <span className="font-display font-semibold text-lg tracking-tight text-ink">
                {SITE_NAME}
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
            <span>© {new Date().getFullYear()} {SITE_NAME}. Built with Next.js.</span>
            <nav className="flex gap-4 font-mono text-xs">
              <Link href="/how-we-test" className="hover:text-ink transition-colors">How We Test</Link>
              <Link href="/editorial-policy" className="hover:text-ink transition-colors">Editorial Policy</Link>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}
