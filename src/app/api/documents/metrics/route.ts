import { NextResponse } from 'next/server';
import { mockDocumentMetrics } from '@/lib/mock-data';

export async function GET() {
 try {
  // In a real application, you would fetch this data from your database
  return NextResponse.json(mockDocumentMetrics);
 } catch (error) {
  console.error('Error fetching document metrics:', error);
  return NextResponse.json(
   { error: 'Failed to fetch document metrics' },
   { status: 500 }
  );
 }
} 