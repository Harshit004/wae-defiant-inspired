import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isApiAdmin = pathname.startsWith('/api/admin');
  const isApiAnalytics = pathname === '/api/analytics' || pathname.startsWith('/api/analytics/');
  const isApiSubscribersGet = (pathname === '/api/subscribers' || pathname.startsWith('/api/subscribers/')) && request.method === 'GET';

  if (isApiAdmin || isApiAnalytics || isApiSubscribersGet) {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    if (!token) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Unauthorized' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }

    const session = await verifySessionToken(token);
    if (!session) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Unauthorized' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/admin/:path*',
    '/api/analytics',
    '/api/subscribers',
  ],
};

