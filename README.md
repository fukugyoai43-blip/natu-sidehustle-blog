# natuの副業記録

Next.js + Markdown で運用する、個人の副業・AI活用ブログです。既存アプリとは完全に独立しています。

## 記事を追加する

`content/posts/` に `.md` ファイルを追加します。`content/posts/_template.md` を複製し、必要事項を入力してください。下書きは `published: false` のまま保存し、確認後 `true` に変更すると公開対象になります。

`site.config.ts` で説明文、SNS、外部サービスのリンクを変更できます。空のリンクはサイトに表示されません。

## ローカル起動

```bash
npm install
npm run dev
```

## AI下書きの扱い

AIにはテンプレートと同じフロントマターを含むMarkdownを作らせます。生成物は必ず人が確認し、公開設定を切り替えてからGitHubへ反映します。自動公開は行いません。
