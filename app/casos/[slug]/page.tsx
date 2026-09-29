import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCase, getCases, renderMarkdown } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCase((await params).slug);
  return c ? { title: c.title, description: c.summary } : {};
}

export default async function CasePage({ params }: Props) {
  const c = getCase((await params).slug);
  if (!c) notFound();

  return (
    <article className="container">
      <div className="article">
        <Link href="/#casos" className="back">
          <ArrowLeft size={16} /> Casos de éxito
        </Link>
        <div className="case-tags" style={{ marginTop: 18 }}>
          {c.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <h1>{c.title}</h1>
        <p className="lead">{c.summary}</p>
        <div className="stats article-stats glass">
          <div className="stat">
            <b>{c.metric}</b>
            <span>{c.metricLabel}</span>
          </div>
          {c.stats.map((s) => (
            <div className="stat" key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        <div className="prose glass" dangerouslySetInnerHTML={{ __html: renderMarkdown(c.body) }} />
      </div>
    </article>
  );
}
