import { NextResponse } from 'next/server';
import { readEnquiriesDB, writeEnquiriesDB } from '@/lib/enquiriesDb';

const rateLimit = new Map<string, { count: number, resetTime: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    
    const userLimit = rateLimit.get(ip);
    if (userLimit && userLimit.resetTime > now) {
      if (userLimit.count >= MAX_REQUESTS) {
        const remainingMs = userLimit.resetTime - now;
        const remainingMinutes = Math.floor(remainingMs / 60000);
        const remainingSeconds = Math.floor((remainingMs % 60000) / 1000);
        
        return NextResponse.json(
          { success: false, message: `Too many attempts. Please try again after ${remainingMinutes} minutes and ${remainingSeconds} seconds.` }, 
          { status: 429 }
        );
      }
      userLimit.count++;
    } else {
      rateLimit.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    }

    const body = await request.json();
    const { fullName, companyName, email, phone, pageLink, message, type } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    if (message && message.length > 2000) {
      return NextResponse.json({ success: false, message: 'Message exceeds the 2000 character limit.' }, { status: 400 });
    }

    const dbState = readEnquiriesDB();
    
    const newEnquiry = {
      id: crypto.randomUUID(),
      fullName,
      companyName: companyName || '',
      email,
      phone,
      pageLink: pageLink || '',
      message: message || undefined,
      type: type || 'product',
      createdAt: new Date().toISOString()
    };

    dbState.enquiries[newEnquiry.id] = newEnquiry;
    
    await writeEnquiriesDB(dbState);

    return NextResponse.json({ success: true, enquiry: newEnquiry });
  } catch (error: any) {
    console.error('Error submitting enquiry:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal server error.' }, { status: 500 });
  }
}
