'use client';

import { ClerkProvider as BaseClerkProvider } from "@clerk/nextjs";
import { AuthErrorHandler } from '@/lib/auth-error-handler';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ClerkProvider({ children }: { children: React.ReactNode }) {
 return (
  <BaseClerkProvider
   appearance={{
    baseTheme: undefined,
    elements: {
     formButtonPrimary: 'bg-primary hover:bg-primary/90',
     footerActionLink: 'text-primary hover:text-primary/90',
    },
    layout: {
     socialButtonsVariant: "iconButton",
     logoPlacement: "inside",
     logoImageUrl: "/logo.png",
    },
   }}
   onError={(error) => {
    AuthErrorHandler.handleAuthError(error);
   }}
   navigate={(to) => {
    // Handle navigation after authentication
    if (to === '/') {
     window.location.href = '/dashboard';
    } else {
     window.location.href = to;
    }
   }}
  >
   {children}
  </BaseClerkProvider>
 );
} 