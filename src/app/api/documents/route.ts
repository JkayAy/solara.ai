import { NextResponse } from 'next/server';
import { mockDocuments } from '@/lib/mock-data';

export async function GET() {
 try {
  return NextResponse.json(mockDocuments);
 } catch (error) {
  console.error('Error fetching documents:', error);
  return NextResponse.json(
   { error: 'Failed to fetch documents' },
   { status: 500 }
  );
 }
}

export async function POST(request: Request) {
 try {
  const data = await request.json();
  // In a real application, you would save the document here
  return NextResponse.json({
   id: Date.now().toString(),
   ...data,
   createdAt: new Date().toISOString()
  });
 } catch (error) {
  console.error('Error creating document:', error);
  return NextResponse.json(
   { error: 'Failed to create document' },
   { status: 500 }
  );
 }
} 