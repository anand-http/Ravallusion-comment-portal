import localFont from "next/font/local";
import "./globals.css";
import { Alexandria } from 'next/font/google'
import LayoutWrapper from "@/components/LayoutWrapper";



const alexandria = Alexandria({
  subsets: ['latin'],
  weight: ['900', '900'],
});


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Ravallusion",
  description: "Ravallusion course website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${alexandria.variable}  antialiased`}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
