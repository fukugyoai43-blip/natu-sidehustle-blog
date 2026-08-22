import type { Metadata } from "next"; import { getAllPosts } from "@/lib/posts"; import { PostCard } from "@/components/post-card";
export const metadata: Metadata = { title: "ブログ記事一覧", description: "AI活用、物販、SNS、デジタル販売など副業の実践記録一覧。", alternates:{canonical:"/posts"} };
export default function PostsPage() { const posts=getAllPosts(); return <div className="shell page"><p className="eyebrow">ALL POSTS</p><h1>ブログ記事一覧</h1><p className="lead">実際に試した副業とAI活用の記録です。</p><div className="post-grid">{posts.map(p=><PostCard key={p.slug} post={p}/>)}</div></div>; }
