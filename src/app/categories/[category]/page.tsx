"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Filter, Search, ChevronDown, Heart, ShoppingCart, Star, Check } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

// Mock Products
const images = [
  "/images/product_mat.png",
  "/images/product_bag.png",
  "/images/product_runner.png"
];

const products = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Handwoven Madhukati Craft ${i + 1}`,
  price: 500 + (i * 137) % 2000,
  rating: (4 + (i * 0.11) % 1).toFixed(1),
  reviews: 20 + (i * 47) % 80,
  image: images[i % 3],
  category: ["Home Decor", "Bags & Totes", "Dining & Runners"][i % 3],
  isNew: i % 4 === 0,
  discount: i % 3 === 0 ? 15 : 0,
}));

export default function CategoryPage() {
  const params = useParams();
  const categoryParam = typeof params.category === 'string' ? decodeURIComponent(params.category) : '';
  
  // Format the param for display (e.g. home-decor -> Home Decor)
  const displayTitle = categoryParam.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  // Format the param for matching our mock categories
  const formattedCategory = categoryParam.replace(/-/g, ' ').toLowerCase();
  
  const categoryProducts = products.filter(p => p.category.toLowerCase() === formattedCategory);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Recommended");
  const { addItem } = useCartStore();
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1
    });
    
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const toggleWishlist = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id.toString())) {
      removeWishlist(product.id.toString());
    } else {
      addWishlist({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link> &gt; <Link href="/shop" className="hover:text-primary">Shop</Link> &gt; <span className="text-foreground">{displayTitle}</span>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">{displayTitle}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-md font-medium"
          >
            <Filter className="h-4 w-4" /> Filters
          </button>
          
          <div className="relative">
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary font-medium"
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Sidebar Filters */}
        <aside className={`${isFilterOpen ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0 space-y-8`}>
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-border">Categories</h3>
            <ul className="space-y-3 text-muted-foreground">
              {['All', 'Home Decor', 'Bamboo Crafts', 'Cane Products', 'Festival Collection', 'Gift Items'].map(cat => (
                <li key={cat}>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary">
                    <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                    <span>{cat}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-border">Price</h3>
            <div className="space-y-4">
              <input type="range" min="0" max="10000" className="w-full accent-primary" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹0</span>
                <span>₹10,000+</span>
              </div>
            </div>
          </div>

          {/* Material */}
          <div>
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-border">Material</h3>
            <ul className="space-y-3 text-muted-foreground">
              {['Bamboo', 'Cane', 'Clay/Terracotta', 'Wood', 'Cotton'].map(mat => (
                <li key={mat}>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary">
                    <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                    <span>{mat}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Desktop Top Bar */}
          <div className="hidden md:flex justify-between items-center mb-6 pb-4 border-b border-border">
            <p className="text-muted-foreground">Showing {products.length} products</p>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-9 pr-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="relative flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none pl-4 pr-8 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                >
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.length > 0 ? categoryProducts.map((product) => (
              <div key={product.id} className="group flex flex-col bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
                {/* Image Area */}
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  {product.discount > 0 && (
                    <span className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                  {product.isNew && product.discount === 0 && (
                    <span className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </span>
                  )}
                  <button 
                    onClick={(e) => toggleWishlist(product, e)}
                    className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 hover:bg-white text-muted-foreground hover:text-red-500 rounded-full transition-colors"
                  >
                    <Heart className={`h-5 w-5 ${isInWishlist(product.id.toString()) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <Link href={`/shop/${product.id}`}>
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full bg-primary/90 hover:bg-primary text-primary-foreground flex items-center justify-center gap-2 py-2 rounded-md font-medium backdrop-blur-sm transition-colors"
                    >
                      {addedItems[product.id] ? (
                        <><Check className="h-4 w-4" /> Added</>
                      ) : (
                        <><ShoppingCart className="h-4 w-4" /> Add to Cart</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
                  <Link href={`/shop/${product.id}`} className="font-semibold hover:text-primary transition-colors line-clamp-1 mb-1">
                    {product.name}
                  </Link>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>

                  <div className="mt-auto pt-2 flex items-center gap-2">
                    <span className="font-bold text-lg">₹{product.price}</span>
                    {product.discount > 0 && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{Math.round(product.price * (1 + product.discount/100))}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No products found in this category.
              </div>
            )}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-12 gap-2">
            <button className="px-4 py-2 border border-border rounded-md hover:bg-secondary">Previous</button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">1</button>
            <button className="px-4 py-2 border border-border rounded-md hover:bg-secondary">2</button>
            <button className="px-4 py-2 border border-border rounded-md hover:bg-secondary">3</button>
            <button className="px-4 py-2 border border-border rounded-md hover:bg-secondary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
