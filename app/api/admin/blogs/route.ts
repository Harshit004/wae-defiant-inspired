import { NextResponse } from 'next/server';
import { readBlogDB, writeBlogDB } from '@/lib/blogDb';
import { BlogPost } from '@/data/blogs';

export async function GET() {
  try {
    const { blogs, writers } = readBlogDB();
    return NextResponse.json({
      success: true,
      blogs: Object.values(blogs),
      writers: Object.values(writers),
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to read blogs.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id, blogData } = body;
    const dbState = readBlogDB();

    if (action === 'create') {
      const { title, category, description, imageSrc, imageSrcHover, heroImage, writerId, readTime, status, contentColumns } = blogData;

      const generatedId = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      if (dbState.blogs[generatedId]) {
        return NextResponse.json(
          { success: false, message: `Blog with ID/slug "${generatedId}" already exists.` },
          { status: 400 }
        );
      }

      const newBlogPost: BlogPost = {
        id: generatedId,
        title,
        category,
        description,
        imageSrc: imageSrc || '',
        imageSrcHover: imageSrcHover || '',
        heroImage: heroImage || '',
        writerId: writerId || 'aditi-sharma',
        readTime: readTime || '2 min read',
        status: status || 'Live',
        createdAt: new Date().toISOString(),
        contentColumns: contentColumns || [[], [], []],
      };

      dbState.blogs[generatedId] = newBlogPost;
      await writeBlogDB(dbState);

      return NextResponse.json({ success: true, blog: newBlogPost });
    }

    if (action === 'update') {
      if (!id || !dbState.blogs[id]) {
        return NextResponse.json({ success: false, message: 'Blog not found.' }, { status: 404 });
      }

      const { title, category, description, imageSrc, imageSrcHover, heroImage, writerId, readTime, status, contentColumns } = blogData;
      const existing = dbState.blogs[id];

      dbState.blogs[id] = {
        ...existing,
        title: title || existing.title,
        category: category || existing.category,
        description: description !== undefined ? description : existing.description,
        imageSrc: imageSrc !== undefined ? imageSrc : existing.imageSrc,
        imageSrcHover: imageSrcHover !== undefined ? imageSrcHover : existing.imageSrcHover,
        heroImage: heroImage !== undefined ? heroImage : existing.heroImage,
        writerId: writerId || existing.writerId,
        readTime: readTime || existing.readTime,
        status: status || existing.status,
        contentColumns: contentColumns || existing.contentColumns,
      };

      await writeBlogDB(dbState);
      return NextResponse.json({ success: true, blog: dbState.blogs[id] });
    }

    if (action === 'delete') {
      if (!id || !dbState.blogs[id]) {
        return NextResponse.json({ success: false, message: 'Blog not found.' }, { status: 404 });
      }

      delete dbState.blogs[id];
      await writeBlogDB(dbState);

      return NextResponse.json({ success: true, message: 'Blog deleted successfully.' });
    }

    return NextResponse.json({ success: false, message: 'Invalid action.' }, { status: 400 });
  } catch (error: any) {
    console.error('Error in Blog API:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal server error.' }, { status: 500 });
  }
}
