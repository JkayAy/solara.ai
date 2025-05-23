import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
 try {
  const { userId } = getAuth(req);

  if (!userId) {
   return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
   );
  }

  // Attempt to refresh the session
  const response = await fetch('https://helping-mink-73.clerk.accounts.dev/v1/client/sessions/refresh', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
   },
  });

  if (!response.ok) {
   throw new Error('Failed to refresh session');
  }

  return NextResponse.json({ success: true });
 } catch (error) {
  console.error('Token refresh error:', error);
  return NextResponse.json(
   { error: 'Failed to refresh token' },
   { status: 500 }
  );
 }
} 