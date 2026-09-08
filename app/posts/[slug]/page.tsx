import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/posts";
import { dateText } from "@/components/post-card";
import { Markdown } from "@/components/markdown";
import { Comments } from "@/components/comments";
import { siteConfig } from "@/site.config";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getPost(slug);
    if (!post) return {};
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription,
      alternates: { canonical: `/posts/${post.slug}` },
      openGraph: {
        type: "article",
        title: post.seoTitle || post.title,
        description: post.seoDescription,
        url: `/posts/${post.slug}`,
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        images: post.eyecatch ? [{ url: post.eyecatch, alt: post.title }] : undefined,
      },
    };
  });
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    description: post.seoDescription,
    image: post.eyecatch ? `${siteConfig.url}${post.eyecatch}` : undefined,
    author: { "@type": "Person", name: siteConfig.author },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/posts/${post.slug}`,
  };

  return <article className="shell article">
    <p className="eyebrow">{post.category} · {dateText(post.publishedAt)}</p>
    <h1>{post.title}</h1>
    <p className="article-desc">{post.seoDescription}</p>
    <p className="tags">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</p>
    {post.eyecatch ? <div className="article-thumbnail"><Image src={post.eyecatch} alt="" fill priority sizes="(max-width: 780px) calc(100vw - 40px), 780px" /><p>{post.title}</p></div> : null}
    <Markdown content={post.content} />
    <section className="comments-section" aria-labelledby="comments-heading"><p className="eyebrow">コメント</p><h2 id="comments-heading">この記事へのひとこと</h2><p>よかった点や改善のアイデアなど、気軽にコメントを残してください。</p><Comments /></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  </article>;
}
