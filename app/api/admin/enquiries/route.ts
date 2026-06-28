import { NextResponse } from 'next/server';
import { readEnquiriesDB, writeEnquiriesDB } from '@/lib/enquiriesDb';

export async function GET() {
  try {
    const dbState = readEnquiriesDB();
    const enquiries = Object.values(dbState.enquiries).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch enquiries.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id } = body;
    const dbState = readEnquiriesDB();

    if (action === 'delete') {
      if (!id || !dbState.enquiries[id]) {
        return NextResponse.json({ success: false, message: 'Enquiry not found.' }, { status: 404 });
      }

      delete dbState.enquiries[id];
      await writeEnquiriesDB(dbState);
      
      return NextResponse.json({ success: true, message: 'Enquiry deleted successfully.' });
    }

    return NextResponse.json({ success: false, message: 'Invalid action.' }, { status: 400 });
  } catch (error: any) {
    console.error('Error in Enquiries API:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal server error.' }, { status: 500 });
  }
}
