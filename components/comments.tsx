"use client";

import { useEffect, useRef } from "react";

export function Comments() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current || container.current.childElementCount) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "fukugyoai43-blip/natu-sidehustle-blog");
    script.setAttribute("data-repo-id", "R_kgDOUA_D6A");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOUA_D6M4DD_p3");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "ja");
    container.current.appendChild(script);
  }, []);

  return <div ref={container} className="giscus" />;
}
