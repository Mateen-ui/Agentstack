import Layout from "../components/Layout";

export default function HowWeTest() {
  return (
    <Layout
      title="How We Test"
      description="The methodology behind AgentStack's comparisons and benchmarks: what we run, how we score it, and what we disclose."
      canonical="/how-we-test"
    >
      <h1 className="font-display font-semibold text-3xl text-ink mb-6">How We Test</h1>
      <div className="article-body">
        <p>
          AgentStack's comparisons are built on firsthand use, not spec-sheet summaries. This page
          describes the standing methodology referenced from individual guides and comparisons —
          update it as the actual testing process solidifies.
        </p>

        <h2 className="font-display font-semibold text-xl text-ink mt-10 mb-3">What we run</h2>
        <p>
          Where a comparison claims a tool handled a task well or poorly, that claim should trace
          back to the same task run across each agent being compared — the same repository, the
          same prompt, the same starting state. Replace this paragraph with the specifics once
          your benchmark suite (per the roadmap's <code>/benchmarks/ai-coding-agent-benchmark-2026</code>{" "}
          page) is running: which repos, which task types (bug fix, refactor, greenfield feature,
          large-codebase navigation), and which agent versions were in scope.
        </p>

        <h2 className="font-display font-semibold text-xl text-ink mt-10 mb-3">How we score it</h2>
        <p>
          Document the scoring dimensions here once defined — for example: did the change compile
          and pass tests, how many turns/iterations it took, whether it stayed within the intended
          scope of the task, and any manual review notes. Being specific about failure modes (not
          just success rate) is what makes a benchmark citable rather than promotional.
        </p>

        <h2 className="font-display font-semibold text-xl text-ink mt-10 mb-3">What we disclose</h2>
        <ul>
          <li>Tool versions and dates tested, since these agents change quickly.</li>
          <li>Any relationship with a vendor (sponsorship, free credits, early access).</li>
          <li>When a comparison was last re-verified against current product docs.</li>
        </ul>

        <p>
          Every comparison and benchmark article should link back to this page, and this page
          should stay current with the actual process — not read as aspirational copy once real
          testing is underway.
        </p>
      </div>
    </Layout>
  );
}
