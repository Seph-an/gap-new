export async function middleware(request) {
  const url = new URL(request.url);

  // Only process blog paths with query params
  if (
    (url.pathname === "/blog" || url.pathname.startsWith("/blog/")) &&
    (url.searchParams.has("filter") || url.searchParams.has("page"))
  ) {
    const filter = url.searchParams.get("filter") || "all";
    const page = url.searchParams.get("page") || "1";
    const cleanPath = `${filter !== "all" ? filter : page !== "1" ? page : ""}`;

    return Response.redirect(new URL(`/blog/${cleanPath}`, url.origin));
  }
}

export const config = {
  matcher: [
    "/blog",
    "/blog/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
