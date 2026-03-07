import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth");
  const isAppRoute = request.nextUrl.pathname.startsWith("/app");
  const isSuccessRoute = request.nextUrl.pathname.startsWith("/success");
  
  // Allow access to success page (they just paid)
  if (isSuccessRoute) {
    return NextResponse.next();
  }
  
  // Protect the /app route
  if (isAppRoute && !authCookie) {
    // Redirect to home page
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/success/:path*"],
};