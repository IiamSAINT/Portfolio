import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/ParticleBackground";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScrolling from "@/components/SmoothScrolling";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Omotosho Opeyemi | Cybersecurity & Fullstack",
  description: "Cybersecurity ENgineer, Fullstack Developer, and AI Enthusiast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-white/20 selection:text-white`}>
        <SmoothScrolling>
          <ParticleBackground />
          <LoadingScreen />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
