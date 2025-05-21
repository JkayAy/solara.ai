import { NextResponse } from 'next/server';
import { mockDocuments } from '@/lib/mock-data';

export async function GET(request: Request) {
 try {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
   return NextResponse.json([]);
  }

  // Search through documents by title, type, and tags
  const searchResults = mockDocuments.filter(doc =>
   doc.title.toLowerCase().includes(query) ||
   doc.type.toLowerCase().includes(query) ||
   doc.tags.some(tag => tag.toLowerCase().includes(query))
  );

  return NextResponse.json(searchResults);
 } catch (error) {
  console.error('Error searching documents:', error);
  return NextResponse.json(
   { error: 'Failed to search documents' },
   { status: 500 }
  );
 }
} 