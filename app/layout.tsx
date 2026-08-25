import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/site.config";
import { Analytics } from "@vercel/analytics/next";
export const metadata: Metadata = { metadataBase: new URL(siteConfig.url), title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` }, description: siteConfig.description, alternates: { canonical: "/" }, openGraph: { type: "website", locale: "ja_JP", siteName: siteConfig.name, title: siteConfig.name, description: siteConfig.description }, twitter: { card: "summary_large_image" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ja"><body><SiteHeader/><main>{children}</main><SiteFooter/><Analytics/></body></html>; }
