import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, type Post } from "@/lib/posts";
import { dateText, PostCard } from "@/components/post-card";
import { headingId, Markdown } from "@/components/markdown";
import { Comments } from "@/components/comments";
import { siteConfig } from "@/site.config";

const articlePoints = (post: Post) => [
  `${post.category}で実際に試したこと`,
  "進める中で感じたこと・気をつけていること",
  "次に改善したいこと、続けるために考えていること",
];

const getHeadings = (content: string) => content.split("\n").flatMap((line, index) => line.startsWith("## ") ? [{ title: line.slice(3), id: headingId(index) }] : []);

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
      openGraph: { type: "article", title: post.seoTitle || post.title, description: post.seoDescription, url: `/posts/${post.slug}`, publishedTime: post.publishedAt, modifiedTime: post.updatedAt, images: post.eyecatch ? [{ url: post.eyecatch, alt: post.title }] : undefined },
    };
  });
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const headings = getHeadings(post.content);
  const relatedPosts = [...getAllPosts().filter((item) => item.slug !== post.slug && item.category === post.category), ...getAllPosts().filter((item) => item.slug !== post.slug && item.category !== post.category)].slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, datePublished: post.publishedAt, dateModified: post.updatedAt || post.publishedAt, description: post.seoDescription,
    image: post.eyecatch ? `${siteConfig.url}${post.eyecatch}` : undefined, author: { "@type": "Person", name: siteConfig.author }, publisher: { "@type": "Organization", name: siteConfig.name }, mainEntityOfPage: `${siteConfig.url}/posts/${post.slug}`,
  };

  return <article className="shell article">
    <p className="eyebrow">{post.category} · {dateText(post.publishedAt)}</p>
    <h1>{post.title}</h1>
    <p className="article-desc">{post.seoDescription}</p>
    <p className="tags">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</p>
    {post.eyecatch ? <div className="article-thumbnail"><Image src={post.eyecatch} alt="" fill priority sizes="(max-width: 780px) calc(100vw - 40px), 780px" /><p>{post.title}</p></div> : null}

    <section className="article-guide" aria-labelledby="article-guide-heading"><p className="eyebrow">AT A GLANCE</p><h2 id="article-guide-heading">この記事で分かること</h2><ul>{articlePoints(post).map((point) => <li key={point}>{point}</li>)}</ul></section>
    <aside className="author-note"><div className="author-mark" aria-hidden="true">N</div><div><p>この記事を書いた人</p><strong>natu</strong><span>AI・物販・SNS・デジタル販売を、実際に試しながら記録しています。</span><Link href="/profile">プロフィールを見る →</Link></div></aside>
    {headings.length > 1 ? <nav className="article-toc" aria-label="目次"><p>目次</p><ol>{headings.map((heading) => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ol></nav> : null}

    <Markdown content={post.content} />
    <section className="related-posts" aria-labelledby="related-posts-heading"><div className="section-head"><div><p className="eyebrow">NEXT READS</p><h2 id="related-posts-heading">次に読む記事</h2></div><Link href="/posts">記事一覧へ →</Link></div><div className="post-grid">{relatedPosts.map((related) => <PostCard key={related.slug} post={related} />)}</div></section>
    <section className="comments-section" aria-labelledby="comments-heading"><p className="eyebrow">コメント</p><h2 id="comments-heading">この記事へのひとこと</h2><p>よかった点や改善のアイデアなど、気軽にコメントを残してください。</p><Comments /></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  </article>;
}
