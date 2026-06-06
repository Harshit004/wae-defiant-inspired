import { NextResponse } from 'next/server';
import { createSessionToken } from '@/lib/auth';

const ADMIN_EMAIL = 'admin@wae.com';
const ADMIN_PASSWORD = 'WaeAdminSecurePassword2026!'; // Hardcoded password

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = await createSessionToken(email, 'admin');

      const response = NextResponse.json({ success: true, message: 'Logged in successfully' });
      
      // Set secure HttpOnly session cookie
      response.cookies.set('wae_cms_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 3600 // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid email address or password.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
