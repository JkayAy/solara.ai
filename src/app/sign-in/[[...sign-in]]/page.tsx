import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignInPage() {
 return (
  <div className="flex min-h-screen items-center justify-center">
   <SignIn
    appearance={{
     baseTheme: dark,
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
    redirectUrl="/dashboard"
    signUpUrl="/sign-up"
   />
  </div>
 );
} 