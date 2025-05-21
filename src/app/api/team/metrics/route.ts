import { NextResponse } from 'next/server';
import { mockTeamMetrics } from '@/lib/mock-data';

export async function GET() {
 try {
  // In a real application, you would fetch this data from your database
  return NextResponse.json(mockTeamMetrics);
 } catch (error) {
  console.error('Error fetching team metrics:', error);
  return NextResponse.json(
   { error: 'Failed to fetch team metrics' },
   { status: 500 }
  );
 }
} 