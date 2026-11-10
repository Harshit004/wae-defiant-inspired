import { NextResponse } from 'next/server';
import { readBlogDB } from '@/lib/blogDb';
import { BLOGS } from '@/data/blogs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = readBlogDB();
    const blogs = (db && db.blogs && Object.keys(db.blogs).length > 0) ? db.blogs : BLOGS;

    let featuredBlogs = Object.values(blogs)
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

    // Fallback: If no blog has featuredOnHomepage === true, pick top 3 live blogs
    if (featuredBlogs.length === 0) {
      featuredBlogs = Object.values(blogs)
        .filter((b) => b.status === 'Live')
        .slice(0, 3)
        .map((b) => ({
          id: b.id,
          title: b.title,
          description: b.description,
          heroImage: b.heroImage,
          category: b.category,
          readTime: b.readTime,
        }));
    }

    return NextResponse.json({ success: true, blogs: featuredBlogs });
  } catch (error) {
    console.error('Error fetching homepage blogs:', error);
    const fallbackBlogs = Object.values(BLOGS)
      .filter((b) => (b.featuredOnHomepage === true || b.status === 'Live'))
      .slice(0, 3)
      .map((b) => ({
        id: b.id,
        title: b.title,
        description: b.description,
        heroImage: b.heroImage,
        category: b.category,
        readTime: b.readTime,
      }));
    return NextResponse.json({ success: true, blogs: fallbackBlogs });
  }
}
