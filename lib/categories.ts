export const categories = [
  { name: "AI活用", slug: "ai", description: "AIを実際の副業や日々の作業で使った記録" },
  { name: "副業実践", slug: "side-hustle", description: "試して、振り返り、改善する副業の記録" },
  { name: "物販", slug: "reselling", description: "仕入れや販売で学んだこと" },
  { name: "SNS・集客", slug: "social", description: "SNS発信と人に届けるための試行錯誤" },
  { name: "デジタル販売", slug: "digital-sales", description: "素材・テンプレート・デジタル商品の販売記録" },
  { name: "運営記録", slug: "journal", description: "ブログと副業を続けるための振り返り" },
] as const;

export const categoryFor = (name: string) => categories.find((category) => category.name === name);
