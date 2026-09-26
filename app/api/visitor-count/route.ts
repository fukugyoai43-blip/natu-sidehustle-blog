import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getVisitorCounterStore } from "@/lib/visitor-counter";

export const dynamic = "force-dynamic";

const VISITOR_COOKIE = "natu_blog_visitor";
const COUNTER_KEY = "natu-blog:unique-visitors";

export async function GET() {
  const store = getVisitorCounterStore();

  if (!store) {
    return NextResponse.json({ configured: false, count: null }, { headers: { "Cache-Control": "no-store" } });
  }

  const cookieStore = await cookies();
  const hasVisited = cookieStore.has(VISITOR_COOKIE);

  if (!hasVisited) {
    await store.incr(COUNTER_KEY);
  }

  const count = await store.get<number>(COUNTER_KEY) ?? 0;
  const response = NextResponse.json({ configured: true, count }, { headers: { "Cache-Control": "no-store" } });

  if (!hasVisited) {
    response.cookies.set(VISITOR_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  return response;
}
