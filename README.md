# Laptop Hub – WhatsApp Orders Only (No Checkout)

A Next.js (App Router) + Tailwind starter for a laptop e-commerce catalog where customers **order via WhatsApp** with pre-filled messages. No on-site checkout.

## Quick Start

```bash
pnpm i   # or npm install / yarn
pnpm dev # http://localhost:3000
```

## WhatsApp Number

Sales agent: **0720363215** (Kenya) → international format used in links: **254720363215**.  
Update it in `components/whatsapp.tsx` if needed.

## How it Works

- Product pages include a **Chat on WhatsApp** button with a message like:  
  `Hello, I'm interested in the Dell XPS 15 (i7, 16GB, 512GB). Please share availability and best price.`
- The **Quote Cart** composes a single message containing all items, quantities, subtotal, and optional name/notes.
- No checkout flow is implemented; all orders are completed in WhatsApp.

## Structure

- `/app` — routes (home, products, compare, cart)
- `/components` — UI + cart context + WhatsApp helpers
- `/lib/products.ts` — demo data (replace with your DB later)

## Customize

- Replace demo data in `lib/products.ts`.
- Tailwind config in `tailwind.config.ts`.
- SEO metadata in `app/layout.tsx`.

Enjoy!
