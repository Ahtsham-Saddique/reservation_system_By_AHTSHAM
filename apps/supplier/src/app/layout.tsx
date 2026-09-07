import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EcoTravel | Supplier Portal",
    template: "%s | EcoTravel",
  },
  description:
    "Manage your travel listings, reservations, bookings, and business operations with EcoTravel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 w-full">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}