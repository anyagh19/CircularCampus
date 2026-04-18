import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./Middleware/authMiddleware";

export function middleware(request: NextRequest , response: NextResponse)
{
    const authResponse = authMiddleware(request)
    if(authResponse) return authResponse;

    return NextResponse.next();
}

export const config = {
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};