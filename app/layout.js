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
import { fetchGlobal } from "@/lib/cms/strapi";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gaprecruitment.co.ke'),
  applicationName: 'Gap Recruitment Services Limited',
};


export default async function RootLayout({ children }) {
  const global = await fetchGlobal();
  return (
    <html>
      <body className={`${inter.className} antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-175555QC9C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-175555QC9C');
          `}
        </Script>
        <Providers>
          <main>
            <Navbar global={global} />
            {children}
          </main>
          <Footer global={global} />
          <Chat global={global} />
          <ChatOptions global={global} />
          <Top />
          <CookieAlert global={global} />
        </Providers>
      </body>
    </html>
  );
}
