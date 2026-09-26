import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

export function getVisitorCounterStore() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null;
  }

  redis ??= new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
  return redis;
}
