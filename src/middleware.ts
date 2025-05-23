import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
 // Public routes that don't require authentication
 publicRoutes: [
  "/",
  "/api/webhook",
  "/api/health",
  "/status",
  "/docs",
  "/cookies",
  "/licenses",
  "/security",
  "/roadmap",
  "/updates",
  "/contact",
  "/help",
  "/terms",
  "/api",
  "/privacy",
  "/about",
  "/pricing",
  "/features",
  "/blog",
  "/community",
  "/tutorials",
  "/kb",
  "/partners",
  "/press",
  "/careers",
 ],
 // Routes that can be accessed while signed out
 ignoredRoutes: [
  "/api/webhook",
  "/api/health",
 ],
 // Handle redirects after authentication
 afterAuth(auth, req) {
  // Handle users who aren't authenticated
  if (!auth.userId && !auth.isPublicRoute) {
   const signInUrl = new URL('/sign-in', req.url);
   signInUrl.searchParams.set('redirect_url', req.url);
   return Response.redirect(signInUrl);
  }

  // Handle users who are authenticated
  if (auth.userId && req.nextUrl.pathname === '/') {
   const dashboardUrl = new URL('/dashboard', req.url);
   return Response.redirect(dashboardUrl);
  }

  // Handle users who are authenticated but trying to access auth pages
  if (auth.userId && (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up')) {
   const dashboardUrl = new URL('/dashboard', req.url);
   return Response.redirect(dashboardUrl);
  }
 },
});

export const config = {
 matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 