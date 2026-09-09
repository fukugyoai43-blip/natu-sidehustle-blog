import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dateText } from "@/components/post-card";
import { Markdown } from "@/components/markdown";
import { getDraftPost } from "@/lib/posts";

const draft = getDraftPost("_draft-side-hustle-time-and-building.md");

export const metadata: Metadata = {
  title: "下書き確認｜natuの副業記録",
  robots: { index: false, follow: false },
};

export default function SideHustleTimeAndBuildingDraftPage() {
  if (!draft) notFound();

  return (
    <article className="shell article">
      <p className="eyebrow">下書きの確認用（まだ公開していません）</p>
      <h1>{draft.title}</h1>
      <p className="article-desc">{draft.seoDescription}</p>
      <p className="tags">{draft.tags.map((tag) => <span key={tag}>#{tag}</span>)}</p>
      {draft.eyecatch ? <div className="article-thumbnail"><Image src={draft.eyecatch} alt="" fill priority sizes="(max-width: 780px) calc(100vw - 40px), 780px" /><p>{draft.title}</p></div> : null}
      <p className="eyebrow">{draft.category} · {dateText(draft.publishedAt)}</p>
      <Markdown content={draft.content} />
    </article>
  );
}
