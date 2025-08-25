'use client';
import { useEffect, useMemo, useState } from "react";
import { laptops } from "@/lib/products";
import Link from "next/link";

export default function ComparePage({ searchParams }: { searchParams: { add?: string }}) {
  const [sel, setSel] = useState<string[]>([]);

  useEffect(() => {
    if (searchParams?.add && !sel.includes(searchParams.add)) {
      setSel(prev => [...prev, searchParams.add!]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.add]);

  const selected = useMemo(() => sel.map(s => laptops.find(l => l.slug === s)).filter(Boolean), [sel]);

  function toggle(slug: string) {
    setSel(prev => prev.includes(slug) ? prev.filter(x => x !== slug) : [...prev, slug]);
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mb-4">Compare Laptops</h1>
      <div className="mb-4 text-sm text-slate-400">Select up to 3 laptops to compare.</div>

      <div className="grid md:grid-cols-3 gap-3 mb-6">
        {laptops.map(l => (
          <button key={l.id} onClick={()=>toggle(l.slug)}
            className={`rounded-xl px-4 py-3 border ${sel.includes(l.slug) ? 'border-brand-600 bg-brand-600/10' : 'border-slate-700 hover:border-brand-600'}`}>
            {l.name}
          </button>
        ))}
      </div>

      {selected.length === 0 ? (
        <div className="text-slate-400">No laptops selected yet.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {selected.slice(0,3).map((p:any) => (
            <div key={p.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-lg" />
              <div className="mt-2 font-semibold">{p.name}</div>
              <div className="text-sm text-slate-400">{p.cpu}</div>
              <div className="text-sm text-slate-400">{p.ram} • {p.storage}</div>
              <div className="text-sm text-slate-400">{p.display}</div>
              <div className="mt-2 font-semibold">KES {p.priceKES.toLocaleString()}</div>
              <Link href={`/products/${p.slug}`} className="mt-3 inline-block rounded-xl px-4 py-2 bg-brand-600 hover:bg-brand-700">View</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
