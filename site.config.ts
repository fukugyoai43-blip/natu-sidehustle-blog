export const siteConfig = {
  name: "natuの副業記録",
  description: "AI・物販・SNS・デジタル販売。40代から実際に試している副業を、成功も失敗もそのまま記録しています。",
  // 独自ドメインを使う場合は、Vercelの NEXT_PUBLIC_SITE_URL で上書きできます。
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://natu-sidehustle-blog.vercel.app",
  author: "natu",
  links: {
    threads: "",
    x: "https://x.com/fukugyo_ai_43",
    note: "https://note.com/fukugyo_ai_43",
    brain: "",
    booth: "https://fukugyoai43.booth.pm/",
    gumroad: "",
    rakutenRoom: "",
  },
} as const;
