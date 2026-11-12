import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from './lib/auth';
import { JOBS } from './data/jobs';

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Handle /product-description-page?product=... cleanly dropping query parameters
  if (pathname === '/product-description-page') {
    const product = searchParams.get('product')?.toLowerCase();
    const productMap: Record<string, string> = {
      'aurela': '/portfolio/trublu/aurela',
      'reva': '/portfolio/bluwae/reva',
      'venus': '/portfolio/bluwae/venus',
    };
    const destination = (product && productMap[product]) || '/portfolio';
    return NextResponse.redirect(new URL(destination, request.url), 301);
  }

  // Handle expired/closed job pages with HTTP 410 (Gone)
  if (pathname.startsWith('/join-wae/')) {
    const jobId = pathname.replace('/join-wae/', '').split('/')[0];
    const liveJob = JOBS[jobId];
    if (!liveJob || liveJob.status !== 'Live') {
      const goneHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Position Closed | WAE</title>
  <meta name="robots" content="noindex, nofollow" />
</head>
<body style="background:#0F0F0F;color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px;box-sizing:border-box;">
  <div style="text-align:center;max-width:540px;">
    <span style="display:inline-block;color:#0081C9;font-size:14px;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px;font-weight:600;">410 — Position Closed</span>
    <h1 style="font-size:32px;font-weight:400;margin:0 0 16px;line-height:1.2;">This Job is No Longer Active</h1>
    <p style="color:#AEAEAE;font-size:15px;line-height:1.6;margin:0 0 32px;">This job opening has been filled or closed and is no longer accepting applications.</p>
    <a href="/join-wae" style="display:inline-block;padding:12px 28px;background:#ffffff;color:#000000;text-decoration:none;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:500;">Explore Open Positions</a>
  </div>
</body>
</html>`;
      return new NextResponse(goneHtml, {
        status: 410,
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }
  }

  const isApiAdmin = pathname.startsWith('/api/admin') && pathname !== '/api/admin/upload';
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
    '/join-wae/:path*',
    '/product-description-page',
  ],
};

