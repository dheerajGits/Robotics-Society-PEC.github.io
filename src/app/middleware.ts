import { AUTH_COOKIE_NAME } from "@/configuration/auth";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    const isAuthenticated = !!token;

    if (!isAuthenticated) return NextResponse.redirect(new URL("/login", req.url));

    return NextResponse.next();
}

export const config = {
    matcher: ["/protected/:path*"],
};
