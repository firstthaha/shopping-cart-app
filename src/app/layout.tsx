import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "../stores/ShopContext";

const prompt = Prompt({
  subsets: ["thai"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-thai",
});

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Shopping Cart Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${prompt.variable}`}>
        <main className="mx-auto max-w-5xl p-6">
          <header className="mb-6">
            <h1 className="text-xl font-semibold text-zinc-900">
              ระบบตะกร้าสินค้า
            </h1>
          </header>
          <ShopProvider>{children}</ShopProvider>
        </main>
      </body>
    </html>
  );
}
