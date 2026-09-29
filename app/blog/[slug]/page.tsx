import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, getPosts, renderMarkdown } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="container">
      <div className="article">
        <Link href="/blog" className="back">
          <ArrowLeft size={16} /> Blog
        </Link>
        <h1>{post.title}</h1>
        <p className="lead">{post.excerpt}</p>
        <div className="post-meta" style={{ marginTop: 14 }}>
          {formatDate(post.date)} · {post.readingTime} · {post.tags.join(" · ")}
        </div>
        <div className="prose glass" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />
      </div>
    </article>
  );
}
