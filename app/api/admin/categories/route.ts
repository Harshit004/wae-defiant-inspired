import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  try {
    const { categories } = readDB();
    return NextResponse.json({ success: true, categories: Object.values(categories) });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to read categories.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id, title, description, imageUrl, paragraphs } = body;
    const dbState = readDB();

    if (action === 'create') {
      const generatedId = title.toLowerCase().trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      if (dbState.categories[generatedId]) {
        return NextResponse.json(
          { success: false, message: `Category with title "${title}" already exists.` },
          { status: 400 }
        );
      }

      dbState.categories[generatedId] = {
        id: generatedId,
        title,
        description,
        imageUrl: imageUrl || '',
        paragraphs: paragraphs || [description],
        products: []
      };

      await writeDB(dbState);
      return NextResponse.json({ success: true, category: dbState.categories[generatedId] });
    }

    if (action === 'update') {
      if (!id || !dbState.categories[id]) {
        return NextResponse.json({ success: false, message: 'Category not found.' }, { status: 404 });
      }

      const existing = dbState.categories[id];
      dbState.categories[id] = {
        ...existing,
        title: title || existing.title,
        description: description || existing.description,
        imageUrl: imageUrl !== undefined ? imageUrl : existing.imageUrl,
        paragraphs: paragraphs || existing.paragraphs
      };

      await writeDB(dbState);
      return NextResponse.json({ success: true, category: dbState.categories[id] });
    }

    if (action === 'delete') {
      if (!id || !dbState.categories[id]) {
        return NextResponse.json({ success: false, message: 'Category not found.' }, { status: 404 });
      }

      delete dbState.categories[id];
      await writeDB(dbState);
      return NextResponse.json({ success: true, message: 'Category deleted successfully.' });
    }

    return NextResponse.json({ success: false, message: 'Invalid action.' }, { status: 400 });
  } catch (error) {
    console.error('Error in Category API:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
