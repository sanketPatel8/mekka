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
    <TranslationProvider>
      <GlobalStateProvider >
        <html lang="en">
          <head></head>
          <body className={dmsans.className}>
            <Wrapper>{children}</Wrapper>
            <ScrollToTop />
            <ScrollTopBehaviour />
          </body>
        </html>
      </GlobalStateProvider>
    </TranslationProvider>
  );
}
