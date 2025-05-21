import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function hasCompletedSetup(userId: string): Promise<boolean> {
 try {
  const profile = await prisma.profile.findUnique({
   where: { userId },
   select: { id: true },
  });

  return !!profile;
 } catch (error) {
  console.error('Error checking setup status:', error);
  return false;
 }
} 