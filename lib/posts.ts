import fs from "node:fs";
import path from "node:path";

export type Post = { title: string; slug: string; publishedAt: string; updatedAt?: string; category: string; tags: string[]; eyecatch?: string; seoTitle?: string; seoDescription?: string; published: boolean; featured?: boolean; experience?: boolean; content: string };
const postsDir = path.join(process.cwd(), "content", "posts");

function parseValue(value: string) {
  const clean = value.trim();
  if (clean === "true" || clean === "false") return clean === "true";
  if (clean.startsWith("[") && clean.endsWith("]")) return clean.slice(1, -1).split(",").map((item) => item.trim().replace(/^['\"]|['\"]$/g, "")).filter(Boolean);
  return clean.replace(/^['\"]|['\"]$/g, "");
}

function parsePost(fileName: string): Post {
  const raw = fs.readFileSync(path.join(postsDir, fileName), "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`Invalid frontmatter: ${fileName}`);
  const data = Object.fromEntries(match[1].split(/\r?\n/).filter(Boolean).map((line) => { const at = line.indexOf(":"); return [line.slice(0, at).trim(), parseValue(line.slice(at + 1))]; }));
  return { ...(data as Omit<Post, "content">), content: match[2].trim() };
}

export function getAllPosts(includeDrafts = false) {
  return fs.readdirSync(postsDir).filter((file) => file.endsWith(".md") && !file.startsWith("_")).map(parsePost)
    .filter((post) => includeDrafts || post.published)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}
export const getPost = (slug: string) => getAllPosts().find((post) => post.slug === slug);
