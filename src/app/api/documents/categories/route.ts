import { NextResponse } from 'next/server';
import { mockDocumentCategories } from '@/lib/mock-data';

export async function GET() {
 try {
  return NextResponse.json(mockDocumentCategories);
 } catch (error) {
  console.error('Error fetching document categories:', error);
  return NextResponse.json(
   { error: 'Failed to fetch document categories' },
   { status: 500 }
  );
 }
} 