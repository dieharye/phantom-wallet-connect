import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { ReactNode } from "react";
import dynamic from 'next/dynamic'
 
const NavBar = dynamic(() => import('@/components/NavBar'), { ssr: false })

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Test project",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NavBar className="z-30" />
          <div className="p-32 flex justify-center">
          {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}