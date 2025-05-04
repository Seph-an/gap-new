// This is the root layout for a Next.js application.
// It sets up the HTML structure, including the head and body elements.
// It also imports global styles and provides a context for the application.

import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import Script from "next/script";
import Chat from "@/components/Common/Chat/Chat";
import ChatOptions from "@/components/Common/Chat/ChatOptions";
import Top from "@/components/Common/Top";
import CookieAlert from "@/components/Common/CookieAlert";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gap Recruitment",
  description: "Recruitment services and career support in Kenya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag: Replace with your Measurement ID */}
        {/* <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-06R4RXHDRL`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-06R4RXHDRL');
          `}
        </Script> */}
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <main>
            <Navbar />
            {children}
            <Footer />
            <Chat />
            <ChatOptions />
            <Top />
            <CookieAlert />
          </main>
        </Providers>
      </body>
    </html>
  );
}
