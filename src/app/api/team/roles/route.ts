import { NextResponse } from 'next/server';
import { mockTeamRoles } from '@/lib/mock-data';

export async function GET() {
 try {
  // In a real application, you would fetch this data from your database
  return NextResponse.json(mockTeamRoles);
 } catch (error) {
  console.error('Error fetching team roles:', error);
  return NextResponse.json(
   { error: 'Failed to fetch team roles' },
   { status: 500 }
  );
 }
}

export async function POST(request: Request) {
 try {
  const data = await request.json();
  // In a real application, you would save this data to your database
  return NextResponse.json({ message: 'Role created successfully' });
 } catch (error) {
  console.error('Error creating team role:', error);
  return NextResponse.json(
   { error: 'Failed to create team role' },
   { status: 500 }
  );
 }
} 