import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { categoryFor } from "@/lib/categories";
export function dateText(date: string) { return new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(new Date(date)); }
export function PostCard({ post }: { post: Post }) {
  const category = categoryFor(post.category);
  return <article className="post-card">
    {post.eyecatch ? <Link href={`/posts/${post.slug}`} className="post-thumbnail" aria-label={`${post.title}を読む`}><Image src={post.eyecatch} alt="" fill sizes="(max-width: 760px) calc(100vw - 64px), 360px" /><span>{post.title}</span></Link> : null}
    <p className="eyebrow">{category?.name ?? post.category} <span>·</span> {dateText(post.publishedAt)}</p>
    <h3><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3><p>{post.seoDescription}</p><Link className="text-link" href={`/posts/${post.slug}`}>記事を読む →</Link>
  </article>;
}
