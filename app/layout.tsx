import "./globals.css";

import { Footer } from "./(site)/components/footer/Footer";
import { Header } from "./(site)/components/header/Header";
import { Inter, Poppins, Nunito, Roboto } from "next/font/google";
import { QueryProvider } from "./context/QueryProvider";
import { LayoutWrapper } from "./context/LayoutWrapper";
import { NextUiProvider } from "./context/NextUiProvider";
import { ToasterContext } from "./context/ToasterContext";
import { SessionProviderContext } from "./context/SessionProviderContext";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poppins",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-nunito",
});

export const metadata = {
  title: "Handouts",
  description: "A multivendor ecommerce website",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${nunito.variable} ${roboto.variable}`}
    >
      <body className={`${inter.className}`}>
        <SessionProviderContext session={session}>
          <ToasterContext />
          <QueryProvider>
            <NextUiProvider>
              <Header />
              <LayoutWrapper>{children}</LayoutWrapper>
              <Footer />
            </NextUiProvider>
          </QueryProvider>
        </SessionProviderContext>
      </body>
    </html>
  );
}
