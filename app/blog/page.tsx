import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos sobre IA aplicada, RevOps y generación de demanda.",
};

export default function BlogPage() {
  const posts = getPosts();
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Blog</span>
            <h1 style={{ fontSize: "clamp(36px, 6vw, 60px)", letterSpacing: "-0.04em" }}>
              Lo que aprendo, <span className="serif">contado</span>
            </h1>
          </div>
        </div>
        <div className="posts">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="post glass">
              <span className="post-meta">
                {formatDate(p.date)} · {p.readingTime}
              </span>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
