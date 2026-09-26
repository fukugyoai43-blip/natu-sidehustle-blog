"use client";

import { useEffect, useState } from "react";

type CounterResponse = {
  configured: boolean;
  count: number | null;
};

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visitor-count", { cache: "no-store" })
      .then((response) => response.json() as Promise<CounterResponse>)
      .then((data) => {
        if (data.configured && typeof data.count === "number") {
          setCount(data.count);
        }
      })
      .catch(() => undefined);
  }, []);

  return <div className="visitor-counter" aria-live="polite">
    <span className="visitor-counter-label">TOTAL VISITS</span>
    <strong>{count === null ? "…" : count.toLocaleString()}</strong>
    <span className="visitor-counter-copy">累計訪問<br />同じブラウザは1回</span>
  </div>;
}
