import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
 return (
  <div className="flex min-h-screen items-center justify-center">
   <SignUp
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
    signInUrl="/sign-in"
   />
  </div>
 );
} 