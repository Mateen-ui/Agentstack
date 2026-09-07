import Layout from "../components/Layout";
import { DEFAULT_AUTHOR } from "../lib/site";

export default function About() {
  return (
    <Layout
      title="About"
      description="Who writes AgentStack, why the niche, and how we approach coverage of AI coding agents."
      canonical="/about"
    >
      <h1 className="font-display font-semibold text-3xl text-ink mb-6">About AgentStack</h1>
      <div className="article-body">
        <p>
          AgentStack is a field guide to AI coding agents — the autonomous tools that now plan
          changes, edit code across whole repositories, run tests, and open pull requests with
          less hand-holding than a plain autocomplete assistant.
        </p>
        <p>
          The space moves fast: new releases, new pricing, new failure modes. This blog exists to
          cut through the noise with practical, tested guidance — what each tool is actually good
          at, how to configure it safely, and what to watch out for before you give an agent
          shell access to your codebase.
        </p>

        <h2 className="font-display font-semibold text-xl text-ink mt-10 mb-3">Who writes this</h2>
        <p>
          Articles are written and maintained by the {DEFAULT_AUTHOR.name}. {DEFAULT_AUTHOR.bio}{" "}
          See <a href="/how-we-test" className="text-accent2 hover:text-accent">How We Test</a> for
          the methodology behind comparisons and benchmarks, and{" "}
          <a href="/editorial-policy" className="text-accent2 hover:text-accent">our editorial policy</a>{" "}
          for how corrections and updates are handled.
        </p>

        <p>
          Have a topic you want covered, or spotted something inaccurate? Reach out via the
          contact details on the homepage — or just start reading the latest guides.
        </p>
      </div>
    </Layout>
  );
}
