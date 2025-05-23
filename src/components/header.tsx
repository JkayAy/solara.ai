"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const { isSignedIn } = useAuth();

 const navigation = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/#pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
 ];

 return (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
   <div className="container flex h-14 items-center">
    <div className="mr-4 flex">
     <Link href="/" className="mr-6 flex items-center space-x-2">
      <span className="font-bold">Solara AI</span>
     </Link>
    </div>
    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
     <nav className="flex items-center space-x-6">
      {navigation.map((item) => (
       <Link
        key={item.name}
        href={item.href}
        className="text-sm font-medium transition-colors hover:text-primary"
       >
        {item.name}
       </Link>
      ))}
     </nav>
     <div className="flex items-center space-x-4">
      {!isSignedIn ? (
       <>
        <SignInButton mode="modal">
         <Button variant="ghost">Sign In</Button>
        </SignInButton>
        <SignUpButton mode="modal">
         <Button>Get Started</Button>
        </SignUpButton>
       </>
      ) : (
       <Link href="/dashboard">
        <Button>Dashboard</Button>
       </Link>
      )}
     </div>
    </div>

    {/* Mobile Menu Button */}
    <button
     className="md:hidden"
     onClick={() => setIsMenuOpen(!isMenuOpen)}
     aria-label="Toggle menu"
    >
     {isMenuOpen ? (
      <X className="h-6 w-6" />
     ) : (
      <Menu className="h-6 w-6" />
     )}
    </button>
   </div>

   {/* Mobile Menu */}
   {isMenuOpen && (
    <div className="md:hidden">
     <div className="container space-y-4 py-4">
      {navigation.map((item) => (
       <Link
        key={item.name}
        href={item.href}
        className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        onClick={() => setIsMenuOpen(false)}
       >
        {item.name}
       </Link>
      ))}
      <div className="pt-4 space-y-2">
       {!isSignedIn ? (
        <>
         <SignInButton mode="modal">
          <button className="w-full text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
           Sign In
          </button>
         </SignInButton>
         <SignUpButton mode="modal">
          <button className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
           Get Started
          </button>
         </SignUpButton>
        </>
       ) : (
        <Link href="/dashboard">
         <button className="w-full text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          Dashboard
         </button>
        </Link>
       )}
      </div>
     </div>
    </div>
   )}
  </header>
 );
} 