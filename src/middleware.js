import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  let user = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      user = payload;
    } catch {
      user = null;
    }
  }

  const { pathname } = req.nextUrl;

  if (!user && (pathname === "/" || pathname.startsWith("/dashboard"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (user && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/register"],
};
