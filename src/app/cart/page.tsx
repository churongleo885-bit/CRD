"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 150;
  const tax = subtotal * 0.05; // 5% GST example
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Looks like you haven't added any handcrafted items to your cart yet.
        </p>
        <Link 
          href="/shop" 
          className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
            {/* Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/50 text-sm font-semibold text-muted-foreground">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            {/* Items */}
            <div className="divide-y divide-border">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 items-center">
                  <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <div className="relative h-20 w-20 rounded-md overflow-hidden bg-secondary shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <Link href={`/shop/${item.id}`} className="font-semibold hover:text-primary transition-colors line-clamp-2">
                        {item.name}
                      </Link>
                      <span className="text-xs text-muted-foreground">{item.category}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-center items-center">
                    <span className="sm:hidden text-sm text-muted-foreground">Price:</span>
                    <span className="font-medium">₹{item.price}</span>
                  </div>
                  
                  <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-center items-center">
                    <span className="sm:hidden text-sm text-muted-foreground">Qty:</span>
                    <div className="flex items-center border border-border rounded-md">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-secondary transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-secondary transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-end items-center">
                    <span className="sm:hidden text-sm text-muted-foreground">Total:</span>
                    <span className="font-bold text-primary">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-card rounded-lg border border-border shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6 pb-4 border-b border-border">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (5%)</span>
                <span className="font-medium">₹{tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-border mb-6">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-xl text-primary">₹{total.toFixed(2)}</span>
            </div>
            
            <Link 
              href="/checkout"
              className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-4 text-center">
              <Link href="/shop" className="text-sm font-medium text-muted-foreground hover:text-foreground underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
