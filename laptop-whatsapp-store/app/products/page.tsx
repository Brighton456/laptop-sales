'use client';

import { useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import ProductCard from "@/components/ProductCard";
import { laptops } from "@/lib/products";

type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'name-asc' | 'name-desc';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get initial values from URL or use defaults
  const initialBrand = searchParams.get('brand') || '';
  const initialSearch = searchParams.get('q') || '';
  const initialMinPrice = searchParams.get('min') ? Number(searchParams.get('min')) : '';
  const initialMaxPrice = searchParams.get('max') ? Number(searchParams.get('max')) : '';
  const initialSort = (searchParams.get('sort') || 'newest') as SortOption;
  const initialInStock = searchParams.get('inStock') === 'true';

  // State with URL values as initial state
  const [brand, setBrand] = useState<string>(initialBrand);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [minPrice, setMinPrice] = useState<number | ''>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<number | ''>(initialMaxPrice);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [inStockOnly, setInStockOnly] = useState<boolean>(initialInStock);
  
  // Debounce search to avoid too many re-renders
  const [debouncedSearch] = useDebounce(searchQuery, 300);

  // Get unique brands and price range for filters
  const brands = useMemo(() => {
    const brandSet = new Set(laptops.map(l => l.brand));
    return Array.from(brandSet).sort();
  }, []);

  const priceRange = useMemo(() => {
    const prices = laptops.map(l => l.priceKES);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, []);

  // Update URL when filters change
  const updateURL = (updates: Record<string, string | number | boolean | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value === null || value === false) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    
    // Update URL without page reload
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...laptops];

    // Apply filters
    result = result.filter(laptop => {
      const matchesSearch = !debouncedSearch || 
        laptop.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesBrand = !brand || laptop.brand === brand;
      const matchesMinPrice = !minPrice || laptop.priceKES >= Number(minPrice);
      const matchesMaxPrice = !maxPrice || laptop.priceKES <= Number(maxPrice);
      const matchesStock = !inStockOnly || Math.random() > 0.3; // Simulate stock status
      
      return matchesSearch && matchesBrand && matchesMinPrice && matchesMaxPrice && matchesStock;
    });

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.priceKES - b.priceKES;
        case 'price-desc':
          return b.priceKES - a.priceKES;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'newest':
        default:
          return 0; // Already in the right order
      }
    });

    return result;
  }, [brand, debouncedSearch, minPrice, maxPrice, sortBy, inStockOnly]);

  // Handle filter changes
  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setBrand(value);
    updateURL({ brand: value || null });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateURL({ q: value || null });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : '';
    setMinPrice(value);
    updateURL({ min: value || null });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : '';
    setMaxPrice(value);
    updateURL({ max: value || null });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortOption;
    setSortBy(value);
    updateURL({ sort: value });
  };

  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setInStockOnly(value);
    updateURL({ inStock: value || null });
  };

  const clearFilters = () => {
    setBrand('');
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    setInStockOnly(false);
    setSortBy('newest');
    updateURL({
      brand: null,
      q: null,
      min: null,
      max: null,
      sort: 'newest',
      inStock: null
    });
  };

  const hasActiveFilters = brand || searchQuery || minPrice || maxPrice || inStockOnly || sortBy !== 'newest';

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-gray-800 rounded-xl p-6 sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                {hasActiveFilters && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search laptops..."
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Brand
                </label>
                <select
                  value={brand}
                  onChange={handleBrandChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price Range (KES)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                      min="0"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                      min={minPrice || 0}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  Range: KES {priceRange.min.toLocaleString()} - {priceRange.max.toLocaleString()}
                </div>
              </div>

              {/* In Stock Toggle */}
              <div className="flex items-center mb-6">
                <input
                  id="in-stock"
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={handleInStockChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500"
                />
                <label htmlFor="in-stock" className="ml-2 text-sm text-gray-300">
                  In stock only
                </label>
              </div>

              <div className="text-xs text-gray-400 p-3 bg-gray-700/50 rounded-lg">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {brand || 'All'} Laptops
                </h1>
                <p className="text-gray-400">
                  Browse our selection of high-performance laptops
                </p>
              </div>
              
              <div className="w-full md:w-64">
                <label htmlFor="sort" className="sr-only">Sort by</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(laptop => (
                  <ProductCard key={laptop.id} product={laptop} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-800/50 rounded-xl p-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-white">No laptops found</h3>
                <p className="mt-1 text-gray-400">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
