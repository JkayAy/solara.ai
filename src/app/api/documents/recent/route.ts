import { NextResponse } from 'next/server';
import { mockDocuments } from '@/lib/mock-data';

export async function GET() {
 try {
  // Sort documents by lastModified date and return the most recent ones
  const recentDocuments = [...mockDocuments]
   .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
   .slice(0, 5);

  return NextResponse.json(recentDocuments);
 } catch (error) {
  console.error('Error fetching recent documents:', error);
  return NextResponse.json(
   { error: 'Failed to fetch recent documents' },
   { status: 500 }
  );
 }
} 