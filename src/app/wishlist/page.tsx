"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart, Heart, Check } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
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

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-secondary p-8 rounded-full mb-6">
          <Heart className="h-16 w-16 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Save items you love to your wishlist. Review them anytime and easily move them to your cart when you're ready to buy.
        </p>
        <Link href="/shop" className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="group flex flex-col bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-square overflow-hidden bg-secondary">
              <button 
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 z-10 p-2 bg-white/80 hover:bg-white text-muted-foreground hover:text-red-500 rounded-full transition-colors shadow-sm"
                title="Remove from Wishlist"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <Link href={`/shop/${item.id}`}>
                <Image 
                  src={item.image} 
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <div className="text-xs text-muted-foreground mb-1">{item.category}</div>
              <Link href={`/shop/${item.id}`} className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1 mb-2">
                {item.name}
              </Link>
              
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="font-bold text-xl">₹{item.price}</span>
                <button 
                  onClick={(e) => handleAddToCart(item, e)}
                  className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {addedItems[item.id] ? (
                    <><Check className="h-4 w-4" /> Added</>
                  ) : (
                    <><ShoppingCart className="h-4 w-4" /> Add to Cart</>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
