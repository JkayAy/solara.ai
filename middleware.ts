import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { hasCompletedSetup } from "@/lib/auth";

export default authMiddleware({
 publicRoutes: [
  "/",
  "/api/webhooks(.*)",
  "/privacy",
  "/terms",
  "/cookies",
  "/security",
  "/about",
  "/contact",
  "/blog",
  "/careers",
  "/press",
  "/partners",
  "/docs",
  "/help",
  "/api",
  "/status",
  "/updates",
  "/roadmap",
  "/integrations"
 ],
 afterAuth: async (auth, req) => {
  // If the user is not signed in and trying to access a protected route, redirect to sign-in
  if (!auth.userId && !auth.isPublicRoute) {
   return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // If the user is signed in and trying to access the setup page, allow it
  if (auth.userId && req.nextUrl.pathname === "/setup") {
   return NextResponse.next();
  }

  // If the user is signed in but hasn't completed setup, redirect to setup
  if (auth.userId && !auth.isPublicRoute && req.nextUrl.pathname !== "/setup") {
   const completedSetup = await hasCompletedSetup(auth.userId);
   if (!completedSetup) {
    return NextResponse.redirect(new URL("/setup", req.url));
   }
  }

  return NextResponse.next();
 },
});

export const config = {
 matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 