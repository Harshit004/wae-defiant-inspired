import { NextResponse } from 'next/server';
import { readEnquiriesDB, writeEnquiriesDB } from '@/lib/enquiriesDb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, companyName, email, phone, pageLink } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const dbState = readEnquiriesDB();
    
    const newEnquiry = {
      id: crypto.randomUUID(),
      fullName,
      companyName: companyName || '',
      email,
      phone,
      pageLink: pageLink || '',
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
