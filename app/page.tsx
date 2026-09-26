import Link from "next/link";
import { categories } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { siteConfig } from "@/site.config";
import { VisitorCounter } from "@/components/visitor-counter";

const readerPaths = [
  { title: "AIを副業に使ってみたい", description: "ChatGPTなどを、実際の作業でどう使っているかを読む。", href: "/categories/ai", label: "AI活用から読む" },
  { title: "メルカリ・物販を学びたい", description: "仕入れ、写真、価格、発送で実際に考えていることを読む。", href: "/categories/reselling", label: "物販から読む" },
  { title: "SNS発信を続けたい", description: "Threadsや自動投稿を試して感じたことを読む。", href: "/categories/social", label: "SNS・集客から読む" },
  { title: "副業のリアルな過程を知りたい", description: "成功だけでなく、迷いや改善も含めた記録を読む。", href: "/categories/journal", label: "運営記録から読む" },
];

export default function Home() {
  const posts = getAllPosts();
  const featured = posts.filter((post) => post.featured).slice(0, 3);
  const experience = posts.filter((post) => post.experience).slice(0, 3);
  const services = [
    { label: "note", href: siteConfig.links.note },
    { label: "Brain", href: siteConfig.links.brain },
    { label: "BOOTH", href: siteConfig.links.booth },
    { label: "Gumroad", href: siteConfig.links.gumroad },
    { label: "楽天ROOM", href: siteConfig.links.rakutenRoom },
  ].filter((service) => service.href);
  const socialLinks = [
    { label: "Threads", href: siteConfig.links.threads },
    { label: "X", href: siteConfig.links.x },
    { label: "Instagram", href: siteConfig.links.instagram },
    { label: "note", href: siteConfig.links.note },
  ].filter((social) => social.href);

  return <>
    <section className="hero">
      <div className="hero-grid shell">
        <div className="hero-copy-wrap">
          <p className="eyebrow">AI × SIDE HUSTLE JOURNAL</p>
          <h1>{siteConfig.name}</h1>
          <p className="hero-copy">AI・物販・SNS・デジタル販売。<br />40代から実際に試している副業を、成功も失敗もそのまま記録しています。</p>
          <div className="hero-tags"><span>AI活用</span><span>物販</span><span>SNS自動化</span><span>デジタル販売</span></div>
          <div className="actions"><Link className="button" href="#start-here">はじめての方へ <span>→</span></Link><Link className="button button-secondary" href="/posts">最新の記事を見る</Link></div>
        </div>
        <aside className="hero-panel" aria-label="このブログの記録">
          <div className="hero-glow" /><p className="panel-label">NOW RECORDING</p>
          <div className="signal-line"><span className="signal-dot" />挑戦の途中を、そのまま残す</div>
          <div className="site-stats"><div><strong>{posts.length}</strong><span>公開記事</span></div><div><strong>{categories.length}</strong><span>カテゴリー</span></div><VisitorCounter /></div>
          <p className="panel-note">小さく試して、改善して、次へ進む。</p>
        </aside>
      </div>
    </section>

    <section className="section shell reader-start" id="start-here">
      <div className="section-heading-copy"><p className="eyebrow">START HERE</p><h2>今の自分に近いところから、読んでみる。</h2><p className="lead">「何から始めればいいか分からない」ときは、気になるテーマを一つ選んでください。実際に試している途中の記録から読めます。</p></div>
      <div className="reader-path-grid">{readerPaths.map((path) => <Link className="reader-path" href={path.href} key={path.title}><h3>{path.title}</h3><p>{path.description}</p><span>{path.label} →</span></Link>)}</div>
    </section>

    <section className="section tinted"><div className="shell"><div className="section-head"><div><p className="eyebrow">FIRST READS</p><h2>まず読んでほしい記事</h2></div><Link href="/posts">すべて見る →</Link></div><div className="post-grid">{featured.map((post) => <PostCard key={post.slug} post={post} />)}</div></div></section>

    <section className="section shell now-section"><div className="now-card"><div><p className="eyebrow">NOW TRYING</p><h2>いま試していること</h2><p>AIを使った発信やデジタル販売、海外向けの販売方法などを、小さく試しながら続けています。結果が出たことも、まだ途中のことも、そのまま残しています。</p></div><Link className="text-link" href="/categories/journal">運営記録を読む →</Link></div></section>

    <section className="section tinted"><div className="shell"><div className="section-head"><div><p className="eyebrow">LATEST</p><h2>最新の副業記録</h2></div><Link href="/posts">記事一覧へ →</Link></div><div className="post-grid">{posts.slice(0, 6).map((post) => <PostCard key={post.slug} post={post} />)}</div></div></section>

    <section className="section shell"><div className="section-heading-copy"><p className="eyebrow">CATEGORY</p><h2>テーマから探す</h2><p className="lead">記事を読む目的が決まっているときは、カテゴリーから選べます。</p></div><div className="category-grid">{categories.map((category) => <Link href={`/categories/${category.slug}`} className="category-card" key={category.slug}><h3>{category.name}</h3><p>{category.description}</p><span>記事を見る →</span></Link>)}</div></section>

    <section className="section tinted"><div className="shell"><div className="section-head"><div><p className="eyebrow">EXPERIMENTS</p><h2>実際にやってみた</h2></div><Link href="/posts">すべての記事を見る →</Link></div><p className="lead">AI、Threads、BOOTH、物販。小さく試した実践と体験の記録です。</p><div className="post-grid">{experience.map((post) => <PostCard key={post.slug} post={post} />)}</div></div></section>

    <section className="section shell about-strip"><div><p className="eyebrow">ABOUT NATU</p><h2>成功だけを見せるためのブログではありません。</h2><p>できたことも、迷ったことも、うまくいかなかったことも。あとから同じように挑戦する人が、一つでも持ち帰れるように記録しています。</p></div><div className="inline-links"><Link href="/about">ブログについて →</Link><Link href="/profile">プロフィール →</Link></div></section>

    <section className="section shell cta"><p className="eyebrow">おすすめ・商品</p><h2>おすすめ・商品</h2><p>note、Brain、BOOTH、Gumroad、楽天ROOMなどへの案内を掲載しています。</p>{services.length ? <div className="inline-links">{services.map((service) => <a href={service.href} key={service.label} target="_blank" rel="noopener noreferrer">{service.label} →</a>)}</div> : <Link href="/recommendations" className="text-link">おすすめ・商品ページを見る →</Link>}</section>

    <section className="section tinted"><div className="shell"><p className="eyebrow">SNS</p><h2>SNSでも発信しています</h2><p className="lead">日々の気づきや、新しい記事のお知らせはSNSで発信しています。</p>{socialLinks.length ? <div className="inline-links">{socialLinks.map((social) => <a href={social.href} key={social.label} target="_blank" rel="noopener noreferrer">{social.label}を見る →</a>)}</div> : <p>リンクは準備中です。</p>}</div></section>
  </>;
}
