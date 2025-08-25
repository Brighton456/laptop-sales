'use client';
import { useMemo, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { buildWhatsAppLink } from "@/components/whatsapp";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  const message = useMemo(() => {
    if (!cartItems.length) return "Hello, I would like to inquire about laptops.";
    const lines = cartItems.map(item => `• ${item.name} x${item.quantity} — KES ${item.priceKES.toLocaleString()}`);
    const intro = name ? `Hello, I'm ${name}.` : `Hello,`;
    const notes = note ? `\nNotes: ${note}` : '';
    return `${intro} I'd like to order the following laptops:\n${lines.join("\n")}\nSubtotal: KES ${cartTotal.toLocaleString()}${notes}\nPlease confirm availability and delivery options.`;
  }, [cartItems, cartTotal, name, note]);

  const href = buildWhatsAppLink(message);

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mb-6">Quote Cart</h1>
      {!cartItems.length ? (
        <div className="text-slate-400">Your cart is empty.</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 bg-slate-900/40 border border-slate-800 rounded-xl p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="w-28 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-slate-400">{item.cpu} • {item.ram} • {item.storage}</div>
                  <div className="mt-1 text-sm">KES {item.priceKES.toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" min={1} value={item.quantity} onChange={e=>updateQuantity(item.id, Math.max(1, Number(e.target.value)||1))}
                         className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1" />
                  <button onClick={()=>removeFromCart(item.id)} className="text-sm text-red-400 hover:text-red-300">Remove</button>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className="text-sm text-slate-400 hover:text-slate-200">Clear cart</button>
          </div>
          <aside className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 h-fit">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">KES {cartTotal.toLocaleString()}</span>
            </div>
            <div className="mt-4">
              <label className="block text-sm mb-1">Your name (optional)</label>
              <input value={name} onChange={e=>setName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2" placeholder="e.g., Brighton" />
            </div>
            <div className="mt-3">
              <label className="block text-sm mb-1">Notes (optional)</label>
              <textarea value={note} onChange={e=>setNote(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2" placeholder="Delivery location, color, etc." />
            </div>
            <a href={href} target="_blank" rel="noopener noreferrer"
               className="mt-4 block text-center rounded-2xl px-5 py-3 bg-green-500 hover:bg-green-600 font-semibold text-white">
              💬 Send Order via WhatsApp
            </a>
            <div className="text-xs text-slate-400 mt-2">You’ll be redirected to WhatsApp chat with 0720 363 215 with the items pre-filled.</div>
          </aside>
        </div>
      )}
    </div>
  );
}
