import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Lines from "./Lines";
import JsonLd from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export default function PageHead({
  crumbs,
  lines,
  lead,
  children,
}: {
  crumbs: { name: string; path: string }[];
  lines: string[];
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-head">
      <div className="page-head-glow" aria-hidden />
      <div className="wrap relative">
        <nav aria-label="Brotkrumen" className="crumbs">
          <ol>
            <li><Link href="/" className="link-u">Start</Link></li>
            {crumbs.map((c, i) => (
              <li key={c.path}>
                <ChevronRight size={14} strokeWidth={2} aria-hidden />
                {i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path} className="link-u">{c.name}</Link>}
              </li>
            ))}
          </ol>
        </nav>
        <Lines as="h1" className="page-title" lines={lines} />
        {lead && <p className="lead mt-6 max-w-[40rem]" data-reveal="up" data-delay="0.15">{lead}</p>}
        {children}
      </div>
      <JsonLd data={breadcrumbLd(crumbs)} />
    </header>
  );
}
