import { NextResponse } from 'next/server';
import { readSubscribersDB, writeSubscribersDB } from '@/lib/subscribers-db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, pageLink } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    const dbState = readSubscribersDB();
    
    // Check if email already exists
    if (dbState.subscribers.some(sub => sub.email === email)) {
      return NextResponse.json({ success: false, message: 'Email is already subscribed' }, { status: 400 });
    }

    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString('en-US', { hour12: false });

    const newSubscriber = {
      id: crypto.randomUUID(),
      email,
      date,
      time,
      pageLink: pageLink || '/',
    };

    dbState.subscribers.push(newSubscriber);
    
    await writeSubscribersDB(dbState);

    return NextResponse.json({ success: true, subscriber: newSubscriber });
  } catch (error: any) {
    console.error('Error adding subscriber:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal server error.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dbState = readSubscribersDB();
    return NextResponse.json({
      success: true,
      subscribers: dbState.subscribers,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to read subscribers.' }, { status: 500 });
  }
}
