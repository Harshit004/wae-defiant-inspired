import { NextResponse } from 'next/server';
import { readJobsDB, writeJobsDB } from '@/lib/jobsDb';
import { JobPost } from '@/data/jobs';

export async function GET() {
  try {
    const { jobs } = readJobsDB();
    return NextResponse.json({
      success: true,
      jobs: Object.values(jobs),
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to read jobs.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id, jobData } = body;
    const dbState = readJobsDB();

    if (action === 'create') {
      const { 
        title, category, type, time, shortDescription, status, 
        summaryParagraphs, whatYouWillDo, whatYouWillOwn, whoWeAreLookingFor 
      } = jobData;

      const generatedId = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      if (dbState.jobs[generatedId]) {
        return NextResponse.json(
          { success: false, message: `Job with ID/slug "${generatedId}" already exists.` },
          { status: 400 }
        );
      }

      const newJob: JobPost = {
        id: generatedId,
        title,
        category,
        type: type || 'On-site',
        time: time || 'Full time',
        shortDescription: shortDescription || '',
        status: status || 'Live',
        createdAt: new Date().toISOString(),
        summaryParagraphs: summaryParagraphs || [],
        whatYouWillDo: whatYouWillDo || [],
        whatYouWillOwn: whatYouWillOwn || [],
        whoWeAreLookingFor: whoWeAreLookingFor || [],
      };

      dbState.jobs[generatedId] = newJob;
      await writeJobsDB(dbState);

      return NextResponse.json({ success: true, job: newJob });
    }

    if (action === 'update') {
      if (!id || !dbState.jobs[id]) {
        return NextResponse.json({ success: false, message: 'Job not found.' }, { status: 404 });
      }

      const { 
        title, category, type, time, shortDescription, status, 
        summaryParagraphs, whatYouWillDo, whatYouWillOwn, whoWeAreLookingFor 
      } = jobData;
      const existing = dbState.jobs[id];

      dbState.jobs[id] = {
        ...existing,
        title: title || existing.title,
        category: category || existing.category,
        type: type || existing.type,
        time: time || existing.time,
        shortDescription: shortDescription !== undefined ? shortDescription : existing.shortDescription,
        status: status || existing.status,
        summaryParagraphs: summaryParagraphs || existing.summaryParagraphs,
        whatYouWillDo: whatYouWillDo || existing.whatYouWillDo,
        whatYouWillOwn: whatYouWillOwn || existing.whatYouWillOwn,
        whoWeAreLookingFor: whoWeAreLookingFor || existing.whoWeAreLookingFor,
      };

      await writeJobsDB(dbState);
      return NextResponse.json({ success: true, job: dbState.jobs[id] });
    }

    if (action === 'delete') {
      if (!id || !dbState.jobs[id]) {
        return NextResponse.json({ success: false, message: 'Job not found.' }, { status: 404 });
      }

      delete dbState.jobs[id];
      await writeJobsDB(dbState);

      return NextResponse.json({ success: true, message: 'Job deleted successfully.' });
    }

    return NextResponse.json({ success: false, message: 'Invalid action.' }, { status: 400 });
  } catch (error: any) {
    console.error('Error in Job API:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal server error.' }, { status: 500 });
  }
}
