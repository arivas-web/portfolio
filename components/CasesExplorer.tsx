"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { CaseStudy } from "@/lib/content";
import { sceneFor, tagStyles } from "@/lib/tags";
import { Icon } from "./Icon";

type CaseCard = Omit<CaseStudy, "body">;

export function CasesExplorer({ cases }: { cases: CaseCard[] }) {
  const [active, setActive] = useState("Todos");

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    cases.forEach((c) => c.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, [cases]);

  const visible = active === "Todos" ? cases : cases.filter((c) => c.tags.includes(active));

  return (
    <>
      <div className="chips" role="tablist" aria-label="Filtrar casos por área">
        <button
          role="tab"
          aria-selected={active === "Todos"}
          className={`chip scene-sky ${active === "Todos" ? "active" : ""}`}
          onClick={() => setActive("Todos")}
        >
          <Icon name="all" /> Todos
        </button>
        {tags.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={active === t}
            className={`chip ${sceneFor(t)} ${active === t ? "active" : ""}`}
            onClick={() => setActive(t)}
          >
            <Icon name={tagStyles[t]?.icon ?? "sparkles"} /> {t}
          </button>
        ))}
      </div>

      <div className="cases">
        {visible.map((c, i) => (
          <Link
            key={c.slug}
            href={`/casos/${c.slug}`}
            className={`case glass ${sceneFor(c.tags[0])} ${i === 0 && active === "Todos" ? "featured" : ""}`}
          >
            <div className="case-main">
              <div className="case-tags">
                {c.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="case-metric">
                <b>{c.metric}</b>
                <span>{c.metricLabel}</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.summary}</p>
              <span className="case-link">
                Ver caso completo <ArrowUpRight size={16} />
              </span>
            </div>
            {i === 0 && active === "Todos" && (
              <div className="case-side">
                {c.stats.map((s) => (
                  <div key={s.label}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </Link>
        ))}
        {visible.length === 0 && <div className="empty glass">No hay casos en esta categoría todavía.</div>}
      </div>
    </>
  );
}
