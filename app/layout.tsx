import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import "./globals.css";
import Header from "@/components/header";
import Image from "next/image";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import ToastProvider from "@/providers/toast-provider";

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font--urbanist" });

export const metadata: Metadata = {
  title: "Foody app",
  description: "Food ordering app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "bg-background antialiased relative",
            urbanist.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            <Image
              src="/img/hero.svg"
              alt="Hero"
              width={0}
              height={0}
              className="absolute -z-10 right-0 top-0 w-full md:w-[60%]"
            />

            <Header userId={userId} />

            {children}

            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
