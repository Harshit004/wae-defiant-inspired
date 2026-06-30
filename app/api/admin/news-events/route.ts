import { NextResponse } from 'next/server';
import { readNewsEventsDB, writeNewsEventsDB, NewsEventItem } from '@/lib/newsEventsDb';

export async function GET() {
  try {
    const data = readNewsEventsDB();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to read news/events.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, itemData, itemId, heroTextNews, heroTextAwards } = body;
    const dbState = readNewsEventsDB();

    if (action === 'update_hero') {
      if (heroTextNews !== undefined) dbState.heroTextNews = heroTextNews;
      if (heroTextAwards !== undefined) dbState.heroTextAwards = heroTextAwards;
      
      const success = await writeNewsEventsDB(dbState);
      return NextResponse.json({ success });
    }

    if (action === 'create' || action === 'update') {
      const data = itemData as NewsEventItem;
      if (!data) {
        return NextResponse.json({ success: false, message: 'Item data is missing.' }, { status: 400 });
      }

      // Automatically assign a random ID for new items
      if (action === 'create') {
        data.id = `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      }

      // Basic rank constraint: ensure rank uniqueness if displayOnHomepage is true
      if (data.displayOnHomepage && data.rank) {
        // If another item has this rank, we swap them or push it down
        const existingWithRank = dbState.items.find(i => i.displayOnHomepage && i.rank === data.rank && i.id !== data.id);
        if (existingWithRank) {
          // Just remove the other item's rank to avoid conflicts for now
          // A more complex system would shift them down, but swapping/clearing is simpler
          existingWithRank.displayOnHomepage = false;
        }
      }

      if (action === 'create') {
        dbState.items.push(data);
      } else {
        const idx = dbState.items.findIndex(i => i.id === data.id);
        if (idx !== -1) {
          dbState.items[idx] = data;
        } else {
          return NextResponse.json({ success: false, message: 'Item not found.' }, { status: 404 });
        }
      }

      const success = await writeNewsEventsDB(dbState);
      return NextResponse.json({ success, item: data });
    }

    if (action === 'delete') {
      if (!itemId) {
        return NextResponse.json({ success: false, message: 'Item ID is required for deletion.' }, { status: 400 });
      }
      dbState.items = dbState.items.filter(i => i.id !== itemId);
      const success = await writeNewsEventsDB(dbState);
      return NextResponse.json({ success });
    }

    return NextResponse.json({ success: false, message: 'Invalid action.' }, { status: 400 });

  } catch (error) {
    console.error('Error in news-events POST route:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
