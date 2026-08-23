import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "おすすめ・商品",
  description: "natuのおすすめ・商品への案内ページ。",
  alternates: { canonical: "/recommendations" },
};

const serviceItems = [
  ["note", siteConfig.links.note],
  ["Brain", siteConfig.links.brain],
  ["BOOTH", siteConfig.links.booth],
  ["Gumroad", siteConfig.links.gumroad],
  ["楽天ROOM", siteConfig.links.rakutenRoom],
] as const;

export default function Recommendations() {
  return (
    <div className="shell page prose">
      <p className="eyebrow">おすすめ・商品</p>
      <h1>おすすめ・商品</h1>
      <p>実際に作った商品や、紹介したいものを掲載するページです。リンク先の内容・価格・条件が分かる形でご案内します。</p>
      <div className="link-list">
        {serviceItems.map(([label, href]) => href ? (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}を見る →</a>
        ) : <p key={label}>{label}：準備中</p>)}
      </div>
      <section className="affiliate-section" aria-labelledby="affiliate-heading">
        <p className="eyebrow">PR・アフィリエイト広告</p>
        <h2 id="affiliate-heading">AI活用に関するおすすめ</h2>
        <p className="affiliate-notice">当サイトはアフィリエイト広告（A8.netを含む）を利用しています。リンクから商品を購入された場合、当サイトに紹介料が入ることがあります。</p>
        <div className="affiliate-grid">
          <article className="affiliate-card">
            <p className="affiliate-label">PR</p>
            <h3>PLAUD NOTE</h3>
            <p>AIを活用した音声記録・文字起こしに関心がある方向けのボイスレコーダーです。</p>
            <a href="https://px.a8.net/svt/ejp?a8mat=4BABTC+14HK8A+5J4W+5YZ76" rel="nofollow">PLAUD NOTE</a>
            <img alt="" aria-hidden="true" height="1" src="https://www19.a8.net/0.gif?a8mat=4BABTC+14HK8A+5J4W+5YZ76" width="1" />
          </article>
          <article className="affiliate-card">
            <p className="affiliate-label">PR</p>
            <h3>ZENCHORD1</h3>
            <p>AI議事録機能を備えたイヤホン。仕事や記録の効率化に関心がある方向けです。</p>
            <a href="https://px.a8.net/svt/ejp?a8mat=4BABTC+13W2B6+5QLS+HV7V6" rel="nofollow">AI時代の仕事術＋AI議事録イヤホン【ZENCHORD1】</a>
            <img alt="" aria-hidden="true" height="1" src="https://www18.a8.net/0.gif?a8mat=4BABTC+13W2B6+5QLS+HV7V6" width="1" />
          </article>
        </div>
      </section>
    </div>
  );
}
