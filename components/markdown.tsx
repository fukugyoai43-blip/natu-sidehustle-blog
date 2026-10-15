export const headingId = (index: number) => `heading-${index}`;

function inlineText(value: string) {
  const parts = value.split(/(https?:\/\/[^\s<]+)/g);
  return parts.map((part, index) => part.startsWith("http") ? <a key={index} href={part} target="_blank" rel="noreferrer">{part}</a> : part);
}

export function Markdown({ content }: { content: string }) { const lines = content.split("\n"); const out: React.ReactNode[] = []; let list: string[] = [];
  const flush = () => { if (list.length) { out.push(<ul key={`l${out.length}`}>{list.map((item, i) => <li key={i}>{inlineText(item)}</li>)}</ul>); list = []; } };
  lines.forEach((line, index) => { if (line.startsWith("- ")) { list.push(line.slice(2)); return; } flush(); if (!line) return; if (line.startsWith("## ")) out.push(<h2 id={headingId(index)} key={index}>{inlineText(line.slice(3))}</h2>); else if (line.startsWith("### ")) out.push(<h3 key={index}>{inlineText(line.slice(4))}</h3>); else if (line.startsWith("> ")) out.push(<blockquote key={index}>{inlineText(line.slice(2))}</blockquote>); else out.push(<p key={index}>{inlineText(line)}</p>); }); flush(); return <div className="prose">{out}</div>; }
