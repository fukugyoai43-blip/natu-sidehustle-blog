export const siteConfig = {
  name: "natuの副業記録",
  searchTitle: "natuの副業記録｜AI×副業・SNS自動化の実践ブログ",
  description: "AI×副業・SNS自動化・物販・デジタル販売を、40代から実際に試す実践ブログ。成功も失敗も隠さず記録しています。",
  // 独自ドメインを使う場合は、Vercelの NEXT_PUBLIC_SITE_URL で上書きできます。
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://natu-sidehustle-blog.vercel.app",
  author: "natu",
  links: {
    threads: "https://www.threads.com/@fukugyo.ai.43",
    x: "https://x.com/fukugyo_ai_43",
    note: "https://note.com/fukugyo_ai_43",
    brain: "https://brain-market.com/u/fukugyoai43/a/byUjNxYjMgoTZsNWa0JXY",
    booth: "https://fukugyoai43.booth.pm/",
    gumroad: "",
    rakutenRoom: "https://room.rakuten.co.jp/fukugyo.ai.43/items",
  },
} as const;
