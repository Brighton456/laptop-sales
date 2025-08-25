import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";
import { CartProvider } from "@/contexts/CartContext";

export const metadata = {
  title: "Laptop Hub – WhatsApp Orders",
  description: "Modern laptop store with WhatsApp ordering (no checkout)",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <header className="border-b border-slate-800">
            <div className="container flex items-center justify-between py-4">
              <Link href="/" className="text-xl font-semibold tracking-tight">
                Laptop <span className="text-brand-500">Hub</span>
              </Link>
              <nav className="flex items-center gap-6">
                <Link href="/products" className="hover:text-brand-500">Laptops</Link>
                <Link href="/compare" className="hover:text-brand-500">Compare</Link>
                <Link href="/cart" className="hover:text-brand-500">Quote Cart</Link>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-slate-800 mt-16">
            <div className="container py-10 text-sm text-slate-400">
              © {new Date().getFullYear()} Laptop Hub — WhatsApp orders only.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
