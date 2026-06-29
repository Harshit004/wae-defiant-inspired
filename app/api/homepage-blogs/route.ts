import { NextResponse } from 'next/server';
import { readBlogDB } from '@/lib/blogDb';

export async function GET() {
  try {
    const { blogs } = readBlogDB();

    const featuredBlogs = Object.values(blogs)
      .filter((b) => b.featuredOnHomepage === true && b.status === 'Live')
      .slice(0, 3)
      .map((b) => ({
        id: b.id,
        title: b.title,
        description: b.description,
        heroImage: b.heroImage,
        category: b.category,
        readTime: b.readTime,
      }));

    return NextResponse.json({ success: true, blogs: featuredBlogs });
  } catch (error) {
    return NextResponse.json({ success: false, blogs: [] }, { status: 500 });
  }
}
