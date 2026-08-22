import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export function generateStaticParams() { return categories.map((category) => ({ slug: category.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const category = categories.find((item) => item.slug === slug);
  return category ? { title: `${category.name}の記事`, description: category.description, alternates: { canonical: `/categories/${slug}` } } : {};
}
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const category = categories.find((item) => item.slug === slug); if (!category) notFound();
  const posts = getAllPosts().filter((post) => post.category === category.name);
  return <div className="shell page"><p className="eyebrow">CATEGORY</p><h1>{category.name}</h1><p className="lead">{category.description}</p>{posts.length ? <div className="post-grid">{posts.map((post) => <PostCard key={post.slug} post={post} />)}</div> : <p>このカテゴリーの記事は準備中です。</p>}</div>;
}
