import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run protection on /admin dashboard routes and /api/admin write APIs
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('wae_cms_session')?.value;

    if (!token) {
      // Rewrite to Next.js 404 page so it appears non-existent to crawler / public
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
