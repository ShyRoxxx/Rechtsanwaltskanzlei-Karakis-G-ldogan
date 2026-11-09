import type { ElementType } from "react";

/** Überschrift, deren Zeilen beim Erscheinen aus einer Maske steigen. */
export default function Lines({
  as: Tag = "h2",
  lines,
  className = "",
  delay,
  id,
}: {
  as?: ElementType;
  lines: string[];
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <Tag className={className} data-reveal="lines" data-delay={delay} id={id}>
      {lines.map((l, i) => (
        <span className="line" key={i}>
          <span className="line-in">{l}</span>
        </span>
      ))}
    </Tag>
  );
}
