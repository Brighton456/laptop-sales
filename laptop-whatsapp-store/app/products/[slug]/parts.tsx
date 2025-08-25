'use client';
import { useCart } from "@/contexts/CartContext";
import { getLaptopBySlug } from "@/lib/products";

export function AddToCart({ slug }: { slug: string }) {
  const { addToCart } = useCart();
  const product = getLaptopBySlug(slug)!;
  return (
    <button
      onClick={() => addToCart(product)}
      className="rounded-2xl px-5 py-3 border border-slate-700 hover:border-brand-600 transition"
    >
      Add to Quote
    </button>
  );
}
