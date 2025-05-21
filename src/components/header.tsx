"use client";

import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const navigation = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/#pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
 ];

 return (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
   <div className="container flex h-16 items-center justify-between">
    <Link href="/" className="flex items-center space-x-2">
     <span className="text-xl font-bold">Solara</span>
    </Link>

    {/* Desktop Navigation */}
    <nav className="hidden md:flex items-center space-x-8">
     {navigation.map((item) => (
      <Link
       key={item.name}
       href={item.href}
       className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
       {item.name}
      </Link>
     ))}
    </nav>

    {/* Desktop Auth Buttons */}
    <div className="hidden md:flex items-center space-x-4">
     <SignInButton mode="modal" afterSignInUrl="/dashboard">
      <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
       Sign In
      </button>
     </SignInButton>
     <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
      <button className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
       Get Started
      </button>
     </SignUpButton>
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
       <SignInButton mode="modal" afterSignInUrl="/dashboard">
        <button className="w-full text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
         Sign In
        </button>
       </SignInButton>
       <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
        <button className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
         Get Started
        </button>
       </SignUpButton>
      </div>
     </div>
    </div>
   )}
  </header>
 );
} 