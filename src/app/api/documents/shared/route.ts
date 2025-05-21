import { NextResponse } from 'next/server';
import { mockDocuments } from '@/lib/mock-data';

export async function GET() {
 try {
  // Filter documents that are shared
  const sharedDocuments = mockDocuments.filter(doc => doc.shared);
  return NextResponse.json(sharedDocuments);
 } catch (error) {
  console.error('Error fetching shared documents:', error);
  return NextResponse.json(
   { error: 'Failed to fetch shared documents' },
   { status: 500 }
  );
 }
} 