import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
 const footerLinks = {
  product: [
   { name: 'Features', href: '/#features' },
   { name: 'Pricing', href: '/#pricing' },
   { name: 'Integrations', href: '/integrations' },
   { name: 'Updates', href: '/updates' },
   { name: 'Roadmap', href: '/roadmap' },
  ],
  company: [
   { name: 'About', href: '/about' },
   { name: 'Blog', href: '/blog' },
   { name: 'Careers', href: '/careers' },
   { name: 'Press', href: '/press' },
   { name: 'Partners', href: '/partners' },
  ],
  legal: [
   { name: 'Privacy', href: '/privacy' },
   { name: 'Terms', href: '/terms' },
   { name: 'Security', href: '/security' },
   { name: 'Cookies', href: '/cookies' },
   { name: 'Licenses', href: '/licenses' },
  ],
  resources: [
   { name: 'Documentation', href: '/docs' },
   { name: 'Help Center', href: '/help' },
   { name: 'API', href: '/api' },
   { name: 'Status', href: '/status' },
   { name: 'Contact', href: '/contact' },
  ],
 };

 const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
 ];

 return (
  <footer className="bg-background border-t">
   <div className="container mx-auto px-4 py-12">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
     <div>
      <h3 className="font-semibold text-lg mb-4">Product</h3>
      <ul className="space-y-3">
       {footerLinks.product.map((link) => (
        <li key={link.name}>
         <Link
          href={link.href}
          className="text-muted-foreground hover:text-primary transition-colors"
         >
          {link.name}
         </Link>
        </li>
       ))}
      </ul>
     </div>

     <div>
      <h3 className="font-semibold text-lg mb-4">Company</h3>
      <ul className="space-y-3">
       {footerLinks.company.map((link) => (
        <li key={link.name}>
         <Link
          href={link.href}
          className="text-muted-foreground hover:text-primary transition-colors"
         >
          {link.name}
         </Link>
        </li>
       ))}
      </ul>
     </div>

     <div>
      <h3 className="font-semibold text-lg mb-4">Legal</h3>
      <ul className="space-y-3">
       {footerLinks.legal.map((link) => (
        <li key={link.name}>
         <Link
          href={link.href}
          className="text-muted-foreground hover:text-primary transition-colors"
         >
          {link.name}
         </Link>
        </li>
       ))}
      </ul>
     </div>

     <div>
      <h3 className="font-semibold text-lg mb-4">Resources</h3>
      <ul className="space-y-3">
       {footerLinks.resources.map((link) => (
        <li key={link.name}>
         <Link
          href={link.href}
          className="text-muted-foreground hover:text-primary transition-colors"
         >
          {link.name}
         </Link>
        </li>
       ))}
      </ul>
     </div>
    </div>

    <div className="mt-12 pt-8 border-t">
     <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-muted-foreground text-sm">
       © {new Date().getFullYear()} Solara. All rights reserved.
      </div>
      <div className="flex space-x-4">
       {socialLinks.map((link) => (
        <a
         key={link.name}
         href={link.href}
         target="_blank"
         rel="noopener noreferrer"
         className="text-muted-foreground hover:text-primary transition-colors"
         aria-label={`Follow us on ${link.name}`}
        >
         <link.icon className="w-5 h-5" />
        </a>
       ))}
      </div>
     </div>
    </div>
   </div>
  </footer>
 );
} 