'use client';

import { notFound } from "next/navigation";
import { getLaptopBySlug } from "@/lib/products";
import WhatsAppButton from "@/components/whatsapp";
import { AddToCart } from "./parts";
import Image from "next/image";
import { useState } from "react";

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = getLaptopBySlug(params.slug);
  if (!product) return notFound();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = product.images || [product.image];

  const message = `Hello, I'm interested in the ${product.name} (${product.cpu}, ${product.ram}, ${product.storage}). Please share availability and best price.`;

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
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <a href="/" className="hover:text-white">Home</a> / 
          <a href="/products" className="hover:text-white ml-1">Products</a> / 
          <span className="text-white ml-1">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800">
              <Image
                src={images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                    ⚡ NEW
                  </span>
                )}
                {product.isFeatured && (
                  <span className="px-3 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full">
                    🏆 FEATURED
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                    📈 -{discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Stock indicator */}
              <div className="absolute top-4 right-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-blue-500 ring-2 ring-blue-500/20' 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30">
                  {product.category}
                </span>
                <span className="text-gray-400 text-sm">{product.brand}</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-3">{product.name}</h1>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-yellow-400 font-medium">{product.rating}</span>
                <span className="text-gray-400">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              {product.originalPrice && (
                <div className="text-gray-500 line-through text-lg mb-1">
                  KES {product.originalPrice.toLocaleString()}
                </div>
              )}
              <div className="text-4xl font-bold text-white mb-2">
                KES {product.priceKES.toLocaleString()}
              </div>
              {discountAmount > 0 && (
                <div className="text-green-400 font-medium">
                  You save KES {discountAmount.toLocaleString()}
                </div>
              )}
            </div>

            {/* Key Specs */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Key Specifications</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Processor</span>
                  <span className="text-white font-medium">{product.cpu}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Memory</span>
                  <span className="text-white font-medium">{product.ram}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Storage</span>
                  <span className="text-white font-medium">{product.storage}</span>
                </div>
                {product.gpu && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Graphics</span>
                    <span className="text-white font-medium">{product.gpu}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Display</span>
                  <span className="text-white font-medium">{product.display}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <WhatsAppButton message={message} />
              <AddToCart slug={product.slug} />
            </div>

            {/* Key Features */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
              <div className="grid grid-cols-1 gap-2">
                {product.keyFeatures?.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="text-green-400">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Perfect For</h3>
              <div className="flex flex-wrap gap-2">
                {product.targetAudience?.map((audience, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30">
                    {audience}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specifications */}
        {product.detailedSpecs && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8">Detailed Specifications</h2>
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Processor</span>
                        <span className="text-white">{product.detailedSpecs.processor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Memory</span>
                        <span className="text-white">{product.detailedSpecs.memory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Storage</span>
                        <span className="text-white">{product.detailedSpecs.storage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Graphics</span>
                        <span className="text-white">{product.detailedSpecs.graphics}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Display & Design</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Display</span>
                        <span className="text-white">{product.detailedSpecs.display}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Weight</span>
                        <span className="text-white">{product.detailedSpecs.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Dimensions</span>
                        <span className="text-white">{product.detailedSpecs.dimensions}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Connectivity</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400 block mb-1">Ports</span>
                        <div className="flex flex-wrap gap-1">
                          {product.detailedSpecs.ports.map((port, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                              {port}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-1">Wireless</span>
                        <div className="flex flex-wrap gap-1">
                          {product.detailedSpecs.connectivity.map((conn, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                              {conn}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">System & Support</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Operating System</span>
                        <span className="text-white">{product.detailedSpecs.os}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Battery</span>
                        <span className="text-white">{product.detailedSpecs.battery}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Warranty</span>
                        <span className="text-white">{product.detailedSpecs.warranty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-8 border border-blue-500/30">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Order?</h3>
            <p className="text-gray-300 mb-6">
              Complete your purchase via WhatsApp for the best prices and personalized service.
            </p>
            <div className="text-sm text-gray-400">
              📱 WhatsApp: +254 720 363 215 | 🕒 Available 9 AM - 8 PM EAT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-static';
