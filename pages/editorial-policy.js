import Layout from "../components/Layout";

export default function EditorialPolicy() {
  return (
    <Layout
      title="Editorial Policy"
      description="How AgentStack decides what to cover, keeps articles current, and handles corrections."
      canonical="/editorial-policy"
    >
      <h1 className="font-display font-semibold text-3xl text-ink mb-6">Editorial Policy</h1>
      <div className="article-body">
        <h2 className="font-display font-semibold text-xl text-ink mt-6 mb-3">Independence</h2>
        <p>
          AgentStack does not run affiliate links or accept payment in exchange for coverage or
          rankings. If that changes for a specific article, it will be disclosed at the top of
          that article, not buried in a footer.
        </p>

        <h2 className="font-display font-semibold text-xl text-ink mt-10 mb-3">Keeping content current</h2>
        <p>
          Coding agents ship new versions often enough that an article can go stale within weeks.
          Every guide and comparison carries a published date and a separately tracked "updated"
          date (see the byline on each article) — the updated date only moves when the content was
          actually re-checked against current product docs, not on cosmetic edits.
        </p>

        <h2 className="font-display font-semibold text-xl text-ink mt-10 mb-3">Corrections</h2>
        <p>
          If something in an article is wrong or out of date, we'd rather hear about it and fix it
          than leave it. Reach out via the contact details on the homepage. Material corrections
          are reflected in the article's updated date; the nature of the correction is not hidden.
        </p>

        <h2 className="font-display font-semibold text-xl text-ink mt-10 mb-3">Sourcing</h2>
        <p>
          Claims about a specific tool's behavior are checked against that vendor's own current
          documentation and, where the article is a comparison or benchmark, against original
          hands-on testing described in{" "}
          <a href="/how-we-test" className="text-accent2 hover:text-accent">How We Test</a>.
        </p>
      </div>
    </Layout>
  );
}
