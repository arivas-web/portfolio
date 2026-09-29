import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Stat = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  metric: string;
  metricLabel: string;
  stats: Stat[];
  tags: string[];
  order: number;
  date: string;
  body: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: string;
  body: string;
};

function readDir(dir: string) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.md$/, ""), data, content };
    });
}

export function getCases(): CaseStudy[] {
  return readDir("casos")
    .map(({ slug, data, content }) => ({
      slug,
      title: data.title,
      summary: data.summary,
      metric: data.metric,
      metricLabel: data.metricLabel,
      stats: data.stats ?? [],
      tags: data.tags ?? [],
      order: data.order ?? 99,
      date: String(data.date ?? ""),
      body: content,
    }))
    .sort((a, b) => a.order - b.order);
}

export function getPosts(): Post[] {
  return readDir("blog")
    .map(({ slug, data, content }) => ({
      slug,
      title: data.title,
      excerpt: data.excerpt,
      date: String(data.date ?? ""),
      tags: data.tags ?? [],
      readingTime: data.readingTime ?? "",
      body: content,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getCase(slug: string) {
  return getCases().find((c) => c.slug === slug);
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}

export function renderMarkdown(md: string) {
  // Quita los comentarios HTML (notas internas / TODO) antes de publicar
  return marked.parse(md.replace(/<!--[\s\S]*?-->/g, ""), { async: false });
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}
