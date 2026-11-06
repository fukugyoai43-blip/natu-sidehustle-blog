"use client";

import { useState } from "react";
import styles from "./share-buttons.module.css";

type ShareButtonsProps = {
  title: string;
  url: string;
};

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [message, setMessage] = useState("");
  const encodedText = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  async function shareToInstagram() {
    try {
      if (navigator.share) {
        await navigator.share({ title, text: title, url });
        setMessage("共有メニューを開きました。Instagramを選んでください。");
        return;
      }

      await copyText(`${title}\n${url}`);
      setMessage("記事リンクをコピーしました。Instagramの投稿に貼り付けてください。");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      try {
        await copyText(`${title}\n${url}`);
        setMessage("記事リンクをコピーしました。Instagramの投稿に貼り付けてください。");
      } catch {
        setMessage("共有できませんでした。記事URLをコピーして投稿に貼り付けてください。");
      }
    }
  }

  return (
    <section className={styles.panel} aria-labelledby="share-heading">
      <p className={styles.eyebrow}>SHARE</p>
      <h2 className={styles.title} id="share-heading">この記事をシェアする</h2>
      <p className={styles.description}>役に立ったら、SNSでシェアしてもらえると嬉しいです。</p>
      <div className={styles.actions}>
        <a className={`${styles.button} ${styles.threads}`} href={`https://www.threads.com/intent/post?text=${encodedText}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Threadsの投稿画面を開く"><span className={styles.icon} aria-hidden="true">@</span>Threads</a>
        <a className={`${styles.button} ${styles.x}`} href={`https://x.com/intent/post?text=${encodedText}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Xの投稿画面を開く"><span className={styles.icon} aria-hidden="true">𝕏</span>X</a>
        <button className={`${styles.button} ${styles.instagram}`} type="button" onClick={shareToInstagram} aria-label="端末の共有メニューを開き、Instagramで共有する"><span className={styles.icon} aria-hidden="true">◎</span>Instagram</button>
      </div>
      <p className={styles.note}>Instagramは、スマホの共有メニューから選択できます。PCでは記事リンクをコピーします。</p>
      <p className={styles.message} aria-live="polite">{message}</p>
    </section>
  );
}
