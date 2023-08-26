import "./globals.css";

import { Footer } from "./(site)/components/footer/Footer";
import { Header } from "./(site)/components/header/Header";
import { SessionProviderContext } from "./context/SessionProviderContext";
import { Inter, Poppins, Nunito } from "next/font/google";
import { QueryProvider } from "./context/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${nunito.variable}`}>
      <body className={`${inter.className}`}>
        <SessionProviderContext>
          <QueryProvider>
            <Header />

            <div className="pt-10 sm:pt-[108px] md:pt-[120px] lg:pt-32">
              {children}
            </div>

            <Footer />
          </QueryProvider>
        </SessionProviderContext>
      </body>
    </html>
  );
}
