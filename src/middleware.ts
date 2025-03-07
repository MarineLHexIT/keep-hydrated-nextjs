import * as server from 'next/server';
import { auth } from './lib/auth/auth';

export const config = {
    matcher: [
        '/dashboard',
        '/users',
        '/dashboard/:path*',
        '/users/:path*'
    ]
};
export async function middleware(req: server.NextRequest) {

    const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
    const session = await auth();
    const isAuthenticated = !!session?.user;

    if (!isAuthenticated && !isAuthPage) {
        const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
        return server.NextResponse.redirect(new URL(`/auth?callbackUrl=${callbackUrl}`, req.url));
    }

    if (isAuthenticated && isAuthPage) {
        const searchParams = new URL(req.url).searchParams;
        const callbackUrl = searchParams.get('callbackUrl');
        const redirectUrl = callbackUrl ? decodeURIComponent(callbackUrl) : '/';
        return server.NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    return server.NextResponse.next();
}
