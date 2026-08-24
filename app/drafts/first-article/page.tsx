import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dateText } from "@/components/post-card";
import { Markdown } from "@/components/markdown";
import { getDraftPost } from "@/lib/posts";

const draft = getDraftPost("_draft-start-side-hustle-record.md");

export const metadata: Metadata = {
  title: "下書き確認｜natuの副業記録",
  robots: { index: false, follow: false },
};

export default function FirstArticleDraftPage() {
  if (!draft) notFound();

  return (
    <article className="shell article">
      <p className="eyebrow">下書きの確認用（まだ公開していません）</p>
      <h1>{draft.title}</h1>
      <p className="article-desc">{draft.seoDescription}</p>
      <p className="tags">{draft.tags.map((tag) => <span key={tag}>#{tag}</span>)}</p>
      <p className="eyebrow">運営記録 · {dateText(draft.publishedAt)}</p>
      <Markdown content={draft.content} />
    </article>
  );
}
