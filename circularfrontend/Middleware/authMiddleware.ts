import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from 'jose';

export async function authMiddleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const { pathname } = request.nextUrl;

    const isAuthRoute = pathname.startsWith('/auth');
    const protectedRoutes = ['/campus', '/student'];
    const isProtected = protectedRoutes.some(path => pathname.startsWith(path));

    let currentToken = accessToken;
    let finalResponse = NextResponse.next();

    // 1. Guard: No session at all
    if (!accessToken && !refreshToken && isProtected) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // 2. Logic: Token is expired, but we have a refresh token
    const accessTokenExpired = isTokenExpired(accessToken);
    
    if (accessTokenExpired && refreshToken && isProtected) {
        try {
            // Use native fetch instead of axios in middleware
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/refresh_token`, {
                method: 'POST',
                // We MUST manually pass the refreshToken to the C# backend
                headers: { 
                    'Cookie': `refreshToken=${refreshToken}`,
                    'Content-Type': 'application/json' 
                },
            });

            if (res.ok) {
                // Option A: Forward the exact cookie headers the C# backend sent
                const setCookieHeader = res.headers.get('set-cookie');
                if (setCookieHeader) {
                    finalResponse.headers.set('set-cookie', setCookieHeader);
                    
                    // Extract the new string to allow the role-check below to work
                    const match = setCookieHeader.match(/accessToken=([^;]+)/);
                    if (match) currentToken = match[1];
                }
            } else {
                // If refresh failed (e.g., Refresh Token also expired)
                return NextResponse.redirect(new URL('/auth/login', request.url));
            }
        } catch (error) {
            console.error("Refresh fetch failed:", error);
        }
    }

    // 3. Role-Based Redirection
    if (currentToken && !isTokenExpired(currentToken)) {
        try {
            const decoded: any = decodeJwt(currentToken);
            const role = (decoded.role || decoded.Role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])?.toLowerCase();

            if (isAuthRoute) {
                const target = role === 'campus' ? '/campus' : '/student';
                return NextResponse.redirect(new URL(target, request.url));
            }
        } catch (e) {
            console.error("JWT Decode Error", e);
        }
    }

    return finalResponse;
}

const isTokenExpired = (token: string | undefined) => {
    if (!token) return true;
    try {
        const decoded = decodeJwt(token);
        const now = Math.floor(Date.now() / 1000);
        return (decoded.exp ?? 0) < now;
    } catch {
        return true;
    }
};

// Crucial: Only run middleware on page routes, not static assets
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};