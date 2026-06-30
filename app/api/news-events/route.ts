import { NextResponse } from 'next/server';
import { readNewsEventsDB, writeNewsEventsDB } from '@/lib/newsEventsDb';

export async function GET() {
  try {
    const data = readNewsEventsDB();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to read news/events.' }, { status: 500 });
  }
}
