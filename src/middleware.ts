import * as server from 'next/server';
import { auth } from './lib/auth/auth';

export const config = {
    matcher: [
        '/dashboard',
        '/users',
        '/dashboard/:path*',
        '/users/:path*',
        '/login'
    ]
};

export async function middleware(req: server.NextRequest) {
    const session = await auth();
    const isAuthenticated = !!session?.user;
    const isLoginPage = req.nextUrl.pathname === '/login';

    // If the user is not authenticated and trying to access protected routes
    if (!isAuthenticated && !isLoginPage) {
        return server.NextResponse.redirect(new URL('/login', req.url));
    }

    // If the user is authenticated and trying to access login page
    if (isAuthenticated && isLoginPage) {
        return server.NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return server.NextResponse.next();
}
