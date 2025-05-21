import { NextResponse } from 'next/server';
import { mockTeamPerformance } from '@/lib/mock-data';

export async function GET() {
 try {
  // In a real application, you would fetch this data from your database
  return NextResponse.json(mockTeamPerformance);
 } catch (error) {
  console.error('Error fetching team performance:', error);
  return NextResponse.json(
   { error: 'Failed to fetch team performance' },
   { status: 500 }
  );
 }
} 