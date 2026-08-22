import Link from "next/link";
import { siteConfig } from "@/site.config";
export function SiteFooter() { return <footer className="footer"><div className="shell"><p className="brand">{siteConfig.name}</p><p>成功も失敗も、次の一歩のために記録します。</p><div className="footer-links"><Link href="/contact">お問い合わせ</Link><Link href="/privacy">プライバシーポリシー</Link></div><small>© {new Date().getFullYear()} natu</small></div></footer>; }
