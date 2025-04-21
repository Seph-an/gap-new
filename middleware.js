export async function middleware(request) {
  const url = new URL(request.url);

  if (url.searchParams.has("filter")) {
    const filter = url.searchParams.get("filter");
    const page = url.searchParams.get("page") || "1";
    const newPath =
      page === "1"
        ? `/blog/category/${filter}`
        : `/blog/category/${filter}/${page}`;
    return Response.redirect(new URL(newPath, url.origin));
  }

  if (url.searchParams.has("page")) {
    const basePath = url.pathname;
    const page = url.searchParams.get("page");
    return Response.redirect(new URL(`${basePath}/${page}`, url.origin));
  }
}

export const config = {
  matcher: [
    "/blog",
    "/blog/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
