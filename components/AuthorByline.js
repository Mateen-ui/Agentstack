import Link from "next/link";
import { format } from "date-fns";

export default function AuthorByline({ author, date, updated, readingTime }) {
  const showUpdated = updated && updated !== date;
  return (
    <div className="text-sm text-muted mb-10 font-mono flex flex-wrap items-center gap-x-2 gap-y-1">
      <Link href="/about" className="text-accent2 hover:text-accent transition-colors">
        {author}
      </Link>
      <span>·</span>
      <span>{format(new Date(date), "MMMM d, yyyy")}</span>
      {showUpdated && (
        <>
          <span>·</span>
          <span>Updated {format(new Date(updated), "MMMM d, yyyy")}</span>
        </>
      )}
      <span>·</span>
      <span>{readingTime} min read</span>
    </div>
  );
}
