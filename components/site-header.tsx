import Link from "next/link";
import { siteConfig } from "@/site.config";
export function SiteHeader() { return <header className="header"><div className="shell nav"><Link href="/" className="brand">{siteConfig.name}</Link><nav><Link href="/posts">記事一覧</Link><Link href="/about">このブログについて</Link><Link href="/profile">プロフィール</Link></nav></div></header>; }
