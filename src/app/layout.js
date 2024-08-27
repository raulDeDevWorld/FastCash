import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fast Cash",
  description: "Fast Cash System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>

      </body>
    </html>
  );
}
