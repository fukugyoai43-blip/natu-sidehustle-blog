export const siteConfig = {
  name: "natuの副業記録",
  description: "AI・物販・SNS・デジタル販売。40代から実際に試している副業を、成功も失敗もそのまま記録しています。",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  author: "natu",
  links: {
    threads: "",
    x: "",
    note: "",
    brain: "",
    booth: "",
    gumroad: "",
    rakutenRoom: "",
  },
} as const;
