import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout title="About">
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
        <p>
          Have a topic you want covered? Reach out via the contact details on the homepage — or
          just start reading the latest guides.
        </p>
      </div>
    </Layout>
  );
}
