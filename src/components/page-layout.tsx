"use client";

import { Header } from "./header";
import { Footer } from "./footer";

interface PageLayoutProps {
 children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
 return (
  <div className="min-h-screen flex flex-col">
   <Header />
   <main className="flex-1">
    <div className="container mx-auto px-4 py-16">
     {children}
    </div>
   </main>
   <Footer />
  </div>
 );
} 