"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { Check, ChevronRight, CreditCard, MapPin, Truck } from "lucide-react";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const { items, getSubtotal } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = getSubtotal();
  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 150;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  if (!mounted) return null;

  const handleNext = () => {
    if (step === 3) {
      useCartStore.getState().clearCart();
    }
    setStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  if (items.length === 0 && step !== 4) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/shop" className="text-primary hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      {/* Stepper */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border -z-10"></div>
          
          {[
            { num: 1, label: "Address", icon: MapPin },
            { num: 2, label: "Shipping", icon: Truck },
            { num: 3, label: "Payment", icon: CreditCard },
            { num: 4, label: "Review", icon: Check }
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-2 bg-background px-2">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= s.num ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground border border-border'}`}>
                {step > s.num ? <Check className="h-5 w-5" /> : <s.icon className="h-4 w-4" />}
              </div>
              <span className={`text-xs font-medium ${step >= s.num ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Main Checkout Area */}
        <div className="flex-1 space-y-6">
          {step === 1 && (
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input type="text" className="w-full px-4 py-2 border border-border rounded-md focus:ring-1 focus:ring-primary outline-none bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input type="text" className="w-full px-4 py-2 border border-border rounded-md focus:ring-1 focus:ring-primary outline-none bg-background" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input type="email" className="w-full px-4 py-2 border border-border rounded-md focus:ring-1 focus:ring-primary outline-none bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-2 border border-border rounded-md focus:ring-1 focus:ring-primary outline-none bg-background" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address Line 1</label>
                  <input type="text" className="w-full px-4 py-2 border border-border rounded-md focus:ring-1 focus:ring-primary outline-none bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address Line 2 (Optional)</label>
                  <input type="text" className="w-full px-4 py-2 border border-border rounded-md focus:ring-1 focus:ring-primary outline-none bg-background" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-medium">City</label>
                    <input type="text" className="w-full px-4 py-2 border border-border rounded-md focus:ring-1 focus:ring-primary outline-none bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">State</label>
                    <input type="text" className="w-full px-4 py-2 border border-border rounded-md focus:ring-1 focus:ring-primary outline-none bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">PIN Code</label>
                    <input type="text" className="w-full px-4 py-2 border border-border rounded-md focus:ring-1 focus:ring-primary outline-none bg-background" />
                  </div>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-6">Shipping Method</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border-2 border-primary rounded-lg cursor-pointer bg-primary/5">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" defaultChecked className="h-4 w-4 text-primary focus:ring-primary border-border" />
                    <div>
                      <div className="font-semibold text-foreground">Standard Delivery</div>
                      <div className="text-sm text-muted-foreground">3-5 business days</div>
                    </div>
                  </div>
                  <div className="font-bold">₹150</div>
                </label>
                <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" className="h-4 w-4 text-primary focus:ring-primary border-border" />
                    <div>
                      <div className="font-semibold text-foreground">Express Delivery</div>
                      <div className="text-sm text-muted-foreground">1-2 business days</div>
                    </div>
                  </div>
                  <div className="font-bold">₹300</div>
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary">
                  <input type="radio" name="payment" className="h-4 w-4 text-primary focus:ring-primary" />
                  <span className="font-semibold">Credit/Debit Card (Stripe)</span>
                </label>
                <label className="flex items-center gap-3 p-4 border-2 border-primary rounded-lg cursor-pointer bg-primary/5">
                  <input type="radio" name="payment" defaultChecked className="h-4 w-4 text-primary focus:ring-primary" />
                  <span className="font-semibold">UPI / NetBanking (Razorpay)</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary">
                  <input type="radio" name="payment" className="h-4 w-4 text-primary focus:ring-primary" />
                  <span className="font-semibold">Cash on Delivery</span>
                </label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm text-center py-12">
              <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Order Placed Successfully!</h2>
              <p className="text-muted-foreground mb-8">Thank you for your purchase. Your order ID is #MC-{Math.floor(100000 + Math.random() * 900000)}</p>
              <div className="flex justify-center gap-4">
                <Link href="/dashboard/orders" className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md font-semibold hover:bg-secondary/80">
                  Track Order
                </Link>
                <Link href="/" className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:bg-primary/90">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="flex justify-between pt-4">
              {step > 1 ? (
                <button onClick={handleBack} className="px-6 py-2 border border-border rounded-md font-semibold hover:bg-secondary">
                  Back
                </button>
              ) : (
                <div></div>
              )}
              <button onClick={handleNext} className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-semibold flex items-center gap-2 hover:bg-primary/90">
                {step === 3 ? "Place Order" : "Continue"} <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        {step < 4 && (
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-card rounded-lg border border-border shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4 pb-4 border-b border-border">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate pr-4">{item.quantity}x {item.name}</span>
                    <span className="font-medium shrink-0">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 pb-2">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
