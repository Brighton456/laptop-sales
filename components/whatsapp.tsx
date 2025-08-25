'use client';
import { useMemo } from "react";

const PHONE = "254720363215"; // 0720363215 in international format

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${PHONE}?text=${encoded}`;
}

export default function WhatsAppButton({ message }: { message: string }) {
  const href = useMemo(() => buildWhatsAppLink(message), [message]);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 bg-green-500 font-semibold text-white shadow hover:bg-green-600 transition"
    >
      <span>💬 Chat on WhatsApp</span>
    </a>
  );
}
