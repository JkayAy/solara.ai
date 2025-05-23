import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/contexts/app-context";
import { Toaster } from "sonner";
import { ClerkProvider } from "@/components/providers/clerk-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Solara AI - Your AI-powered Operating System",
  description: "An AI-powered operating system for solo professionals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AppProvider>
              {children}
              <Toaster richColors position="top-right" />
            </AppProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
