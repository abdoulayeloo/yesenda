import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: 'swap',
});

export const metadata = {
  icons: {
    icon: '/vercel.svg',
  },
  title: "Yesanda - L'Art d'être élégante",
  description: "Boutique de vêtements féminins et créations uniques.",
};

import Shell from "@/components/layout/Shell";
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <Shell>{children}</Shell>
        </CartProvider>
      </body>
    </html>
  );
}
