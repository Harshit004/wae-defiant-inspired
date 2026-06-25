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
    
    // Format date in YYYY-MM-DD in Asia/Kolkata timezone (IST)
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const dateParts = dateFormatter.formatToParts(now);
    const year = dateParts.find(p => p.type === 'year')?.value;
    const month = dateParts.find(p => p.type === 'month')?.value;
    const day = dateParts.find(p => p.type === 'day')?.value;
    const date = `${year}-${month}-${day}`;

    // Format time in HH:MM:SS in Asia/Kolkata timezone (IST)
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    const time = timeFormatter.format(now);

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
