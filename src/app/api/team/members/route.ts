import { NextResponse } from 'next/server';
import { mockTeamMembers } from '@/lib/mock-data';

export async function GET() {
 try {
  // In a real application, you would fetch this data from your database
  return NextResponse.json(mockTeamMembers);
 } catch (error) {
  console.error('Error fetching team members:', error);
  return NextResponse.json(
   { error: 'Failed to fetch team members' },
   { status: 500 }
  );
 }
}

export async function POST(request: Request) {
 try {
  const data = await request.json();
  // In a real application, you would save this data to your database
  return NextResponse.json({ message: 'Member created successfully' });
 } catch (error) {
  console.error('Error creating team member:', error);
  return NextResponse.json(
   { error: 'Failed to create team member' },
   { status: 500 }
  );
 }
} 