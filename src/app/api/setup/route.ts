import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
 try {
  const { userId } = auth();
  if (!userId) {
   return new NextResponse('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const { firstName, lastName, business, role, email, preferences } = body;

  // Create profile
  const profile = await prisma.profile.create({
   data: {
    userId,
    email,
    firstName,
    lastName,
    business,
    role,
    settings: {
     create: {
      notifications: preferences,
      preferences: {
       darkMode: preferences.darkMode,
      },
     },
    },
   },
  });

  return NextResponse.json(profile);
 } catch (error) {
  console.error('Setup error:', error);
  return new NextResponse('Internal Error', { status: 500 });
 }
} 