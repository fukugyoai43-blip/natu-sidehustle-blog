import Link from "next/link";
import { siteConfig } from "@/site.config";
export function SiteHeader() { return <header className="header"><div className="shell nav"><Link href="/" className="brand"><span className="brand-mark" aria-hidden="true">N</span><span><small>AI × SIDE HUSTLE</small>{siteConfig.name}</span></Link><nav><Link href="/posts">記事一覧</Link><Link href="/about">このブログについて</Link><Link href="/profile">プロフィール</Link></nav></div></header>; }
