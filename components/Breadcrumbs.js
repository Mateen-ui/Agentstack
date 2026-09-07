import Link from "next/link";

// items: [{ name: "Guides", href: "/" }, { name: "Post Title" }]
// Last item has no href -- it's the current page.
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-mono text-muted mb-4">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-accent transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-ink" aria-current="page">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
