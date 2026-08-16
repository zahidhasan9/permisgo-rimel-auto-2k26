import { NextResponse } from "next/server";

export function proxy(request) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  const locale = pathname.split("/").filter(Boolean)[0];
  if (["en", "bn", "fr"].includes(locale)) {
    const redirectUrl = request.nextUrl.clone();
    const cleanPath = pathname.split("/").filter(Boolean).slice(1).join("/");
    redirectUrl.pathname = cleanPath ? `/${cleanPath}` : "/";
    const response = NextResponse.redirect(redirectUrl, 308);
    response.cookies.set("permisgo-language", locale, { path: "/", maxAge: 31536000, sameSite: "lax" });
    return response;
  }
  const savedLanguage = request.cookies.get("permisgo-language")?.value;
  requestHeaders.set("x-permisgo-pathname", pathname);
  requestHeaders.set(
    "x-permisgo-locale",
    ["en", "bn", "fr"].includes(savedLanguage) ? savedLanguage : "en",
  );

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|image/|uploads/).*)"],
};
