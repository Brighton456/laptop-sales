'use client';

import { useCart } from '@/contexts/CartContext';
import { Laptop } from '@/lib/products';
import Link from 'next/link';
import Image from 'next/image';
// Icons will be replaced with simple text/symbols until lucide-react is installed

interface ProductCardProps {
  product: Laptop;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, cartItems } = useCart();
  
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}
      >
        ★
      </span>
    ));
  };

  const discountAmount = product.originalPrice ? product.originalPrice - product.priceKES : 0;
  const discountPercentage = product.originalPrice ? Math.round((discountAmount / product.originalPrice) * 100) : 0;

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 rounded-2xl p-6 flex flex-col hover:border-brand-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/20 hover:-translate-y-1 backdrop-blur-sm relative overflow-hidden group">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
        {product.isNew && (
          <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
            ⚡
            NEW
          </span>
        )}
        {product.isFeatured && (
          <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center gap-1">
            🏆
            FEATURED
          </span>
        )}
        {discountPercentage > 0 && (
          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
            📈
            -{discountPercentage}%
          </span>
        )}
      </div>

      {/* Stock indicator */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`} />
      </div>
      
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-slate-800/50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <div className="flex-1 flex flex-col relative z-10">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-brand-500/20 text-brand-300 text-xs rounded-full border border-brand-500/30">
              {product.category}
            </span>
            <span className="text-slate-500 text-xs">
              {product.brand}
            </span>
          </div>
          
          <h3 className="font-bold text-lg leading-tight mb-2 text-white group-hover:text-brand-300 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-slate-400 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-yellow-400 text-sm font-medium">
              {product.rating}
            </span>
            <span className="text-slate-500 text-sm">
              ({product.reviews} reviews)
            </span>
          </div>
          
          <p className="text-slate-400 text-sm">
            {product.cpu} • {product.ram} • {product.storage}
          </p>
          {product.gpu && (
            <p className="text-slate-400 text-sm">
              {product.gpu}
            </p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {product.highlights.slice(0, 3).map((highlight, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600/50 hover:bg-brand-500/20 hover:text-brand-300 hover:border-brand-500/30 transition-all"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              {product.originalPrice && (
                <div className="text-sm text-slate-500 line-through">
                  KES {product.originalPrice.toLocaleString()}
                </div>
              )}
              <div className="text-2xl font-bold text-white">
                KES {product.priceKES.toLocaleString()}
              </div>
              {discountAmount > 0 && (
                <div className="text-sm text-green-400 font-medium">
                  Save KES {discountAmount.toLocaleString()}
                </div>
              )}
            </div>
            {!product.inStock && (
              <span className="text-red-400 text-sm font-medium">
                Out of Stock
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="flex-1 text-center rounded-xl px-4 py-3 bg-slate-800/80 hover:bg-slate-700 transition-all duration-200 text-white font-medium border border-slate-600/50 hover:border-slate-500"
            >
              View Details
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={isInCart || !product.inStock}
              className={`flex-1 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                isInCart
                  ? 'bg-green-600/20 text-green-400 border border-green-600/30 cursor-not-allowed'
                  : !product.inStock
                  ? 'bg-gray-600/20 text-gray-500 border border-gray-600/30 cursor-not-allowed'
                  : 'bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white hover:shadow-lg hover:shadow-brand-500/25 transform hover:scale-105'
              }`}
            >
              {isInCart ? 'In Cart' : !product.inStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
