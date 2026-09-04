 import { useState } from "react";

const posts = [
  {
    tag: "ARCHITECTURE",
    title: "The Anatomy of an Agent Stack",
    excerpt:
      "Model, memory, tools, and orchestration aren't separate products — they're layers that fail differently.",
    grad: ["#4B3FF2", "#0E9C8C"],
  },
  {
    tag: "MEMORY",
    title: "Why Agents Need Long-Term Memory",
    excerpt:
      "A context window is not a memory. The difference shows up the moment a user expects an agent to remember something.",
    grad: ["#0E9C8C", "#4B3FF2"],
  },
  {
    tag: "TOOL USE",
    title: "Tool Calling: Giving Agents Hands",
    excerpt:
      "The gap between an agent that can describe an action and one that can take it safely is mostly a schema problem.",
    grad: ["#4B3FF2", "#7A6CFF"],
  },
  {
    tag: "MULTI-AGENT",
    title: "When One Agent Isn't Enough",
    excerpt:
      "Splitting work across agents buys specialization and parallelism — and buys back coordination overhead.",
    grad: ["#0E9C8C", "#4B3FF2"],
  },
  {
    tag: "OBSERVABILITY",
    title: "Watching Agents Think",
    excerpt:
      "Logs tell you what an agent did. Traces tell you why. Most incidents live in the gap between those two.",
    grad: ["#4B3FF2", "#0E9C8C"],
  },
  {
    tag: "SAFETY",
    title: "Guardrails Without Gridlock",
    excerpt:
      "Every constraint is a tax on capability. The job is the smallest set of rails that stops the failures that matter.",
    grad: ["#7A6CFF", "#0E9C8C"],
  },
  {
    tag: "RETRIEVAL",
    title: "Agentic RAG vs. Traditional RAG",
    excerpt:
      "Traditional RAG retrieves once and answers. Agentic RAG decides whether the answer is even worth trusting.",
    grad: ["#0E9C8C", "#7A6CFF"],
  },
  {
    tag: "EVALUATION",
    title: "Grading Agents on More Than Accuracy",
    excerpt:
      "An agent that's 95% accurate but unpredictable is harder to ship than one that's 85% and fails the same way.",
    grad: ["#4B3FF2", "#0E9C8C"],
  },
  {
    tag: "CODING AGENTS",
    title: "The Rise of Autonomous Coding Agents",
    excerpt:
      "The shift from autocomplete to agents that open PRs unattended changes what code review is for.",
    grad: ["#0E9C8C", "#4B3FF2"],
  },
  {
    tag: "COST",
    title: "Cost Control for Always-On Agents",
    excerpt:
      "An agent that runs 24/7 doesn't have a token bill, it has a burn rate — controlled by caching and routing.",
    grad: ["#7A6CFF", "#4B3FF2"],
  },
];

/**
 * FieldNotesCubes
 * Placeholder-topic teaser grid, styled to match AgentStack's paper/ink/
 * indigo-teal system. Placed in pages/index.js under the "Latest guides"
 * list. Cards are not yet linked to real posts — add an href per entry
 * once real posts exist for them.
 */
export default function FieldNotesCubes() {
  const [flipped, setFlipped] = useState({});
  const toggle = (i) => setFlipped((f) => ({ ...f, [i]: !f[i] }));

  return (
    <section className="mt-20">
      <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-line">
        <h2 className="font-display font-semibold text-sm tracking-wide text-muted">
          Field Notes
        </h2>
        <span className="font-mono text-xs text-muted">{posts.length} topics</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {posts.map((p, i) => (
          <div
            key={p.title}
            className="fn-stage"
            style={{ perspective: "1200px", height: "220px" }}
            onClick={() => toggle(i)}
          >
            <div
              className={`fn-cube relative w-full h-full cursor-pointer ${
                flipped[i] ? "fn-flipped" : ""
              }`}
            >
              <div className="fn-face absolute inset-0 rounded-xl border border-line bg-raised overflow-hidden flex flex-col">
                <div
                  className="h-20 w-full"
                  style={{
                    background: `linear-gradient(135deg, ${p.grad[0]}, ${p.grad[1]})`,
                  }}
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <span className="font-mono text-[10px] text-muted tracking-wide">
                    {p.tag}
                  </span>
                  <h3 className="font-display font-semibold text-sm text-ink leading-snug mt-2">
                    {p.title}
                  </h3>
                </div>
              </div>

              <div className="fn-face fn-back absolute inset-0 rounded-xl border border-line bg-ink text-paper p-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-semibold text-xs text-accent2 mb-2">
                    {p.tag}
                  </h4>
                  <p className="text-xs leading-relaxed opacity-80">{p.excerpt}</p>
                </div>
                <span className="font-mono text-[10px] opacity-50">
                  0{i + 1} / {posts.length}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .fn-cube {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.25, 1);
        }
        .fn-stage:hover .fn-cube,
        .fn-cube.fn-flipped {
          transform: rotateY(180deg);
        }
        .fn-face {
          backface-visibility: hidden;
        }
        .fn-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
