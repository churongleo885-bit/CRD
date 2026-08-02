"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, Search, User, Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalWishlistItems = wishlistItems.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-secondary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-1 justify-center lg:justify-start">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-primary">Madhukati Craft</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:gap-8 lg:items-center">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About Us</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button className="text-foreground hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/wishlist" className="relative text-foreground hover:text-primary transition-colors hidden sm:block">
              <Heart className="h-5 w-5" />
              {mounted && totalWishlistItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {totalWishlistItems}
                </span>
              )}
            </Link>
            <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors hidden sm:block">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="relative text-foreground hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn("lg:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="space-y-1 px-2 pb-3 pt-2 shadow-lg bg-background border-t border-border absolute w-full">
          <Link href="/" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary">Home</Link>
          <Link href="/shop" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary">Shop</Link>
          <Link href="/about" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary">About Us</Link>
          <Link href="/contact" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary">Contact</Link>
          <div className="flex gap-4 px-3 py-2 border-t border-border mt-2">
            <Link href="/wishlist" className="flex items-center gap-2 text-base font-medium">
              <Heart className="h-5 w-5" /> Wishlist
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2 text-base font-medium">
              <User className="h-5 w-5" /> Account
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
