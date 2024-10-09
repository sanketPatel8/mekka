// layout.js
"use client";

import ScrollToTop from "@/components/common/ScrollToTop";
import "../public/css/style.css";
import "select2/dist/css/select2.min.css";

import { DM_Sans } from "next/font/google";
import ScrollTopBehaviour from "@/components/common/ScrollTopBehavier";
import Wrapper from "@/components/layout/Wrapper";
import { TranslationProvider } from "@/app/context/TranslationContext";
import { GlobalStateProvider } from "@/app/context/GlobalStateContext";
import { AuthContextProvider } from "./context/authContext";
import { PeopleProvider } from "./context/PeopleContext";
import Head from "next/head";
import { CurrencyProvider } from "./context/currencyContext";
import { UserProfileProvider } from "./context/ProfileContext";
const dmsans = DM_Sans({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// Only import 'select2' JS on the client-side
if (typeof window !== "undefined") {
  import("bootstrap");
  import("select2/dist/js/select2.min.js");
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Home - MekkaBooking</title>
        <meta
          name="description"
          content="Welcome to MekkaBooking, your travel booking partner."
        />
        <meta property="og:title" content="Home - MekkaBooking" />
        <meta
          property="og:description"
          content="Welcome to MekkaBooking, your travel booking partner."
        />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        <meta property="og:url" content="https://www.mekkabooking.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MekkaBooking" />
      </Head>
      <body className={dmsans.className}>
        <AuthContextProvider>
          <CurrencyProvider>
            <TranslationProvider>
              <GlobalStateProvider>
                <PeopleProvider>
                  <Wrapper>
                    <UserProfileProvider>{children}</UserProfileProvider>
                  </Wrapper>
                  <ScrollToTop />
                  <ScrollTopBehaviour />
                </PeopleProvider>
              </GlobalStateProvider>
            </TranslationProvider>
          </CurrencyProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
