"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, ShieldCheck, Truck, Clock, Check } from "lucide-react";
import * as motion from "framer-motion/client";
import { useCartStore } from "@/store/cartStore";

export default function Home() {
  const { addItem } = useCartStore();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleAddToCart = (product: any, id: string, e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: id,
      name: product.name,
      price: parseInt(product.price.replace(/,/g, '')),
      image: product.image,
      category: "Madhukati Craft",
      quantity: 1
    });
    
    setAddedItems(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Madhukati Craft Woven Mats"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-secondary-foreground drop-shadow-md">
            Handcrafted with Tradition, Crafted for Today
          </h1>
          <p className="text-lg md:text-xl text-secondary-foreground font-medium drop-shadow-md max-w-2xl mx-auto">
            Discover authentic, premium, and eco-friendly handmade crafts directly from talented artisans across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/shop"
              className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/categories"
              className="px-8 py-3 rounded-md bg-white text-primary font-semibold hover:bg-gray-100 transition-colors shadow-sm"
            >
              Explore Collections
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Why Choose Madhukati Craft</h2>
            <p className="mt-4 text-muted-foreground">We believe in preserving traditions while offering premium quality.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "Eco-Friendly", desc: "Sustainable materials and processes." },
              { icon: ShieldCheck, title: "Premium Quality", desc: "Crafted to perfection and durability." },
              { icon: Truck, title: "Fast Shipping", desc: "Secure and timely delivery worldwide." },
              { icon: Clock, title: "Authentic", desc: "Directly from traditional artisans." },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm border border-border">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections Placeholder */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Featured Collections</h2>
              <p className="mt-2 text-muted-foreground">Explore our most loved handcrafted categories.</p>
            </div>
            <Link href="/categories" className="hidden sm:flex items-center text-primary font-medium hover:underline">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Home Decor", image: "/images/product_mat.png" },
              { title: "Bags & Totes", image: "/images/product_bag.png" },
              { title: "Dining & Runners", image: "/images/product_runner.png" },
            ].map((category, i) => (
              <Link key={i} href={`/categories/${category.title.toLowerCase().replace(/ /g, "-")}`} className="group relative h-80 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <h3 className="relative z-10 text-2xl font-bold text-white drop-shadow-md">{category.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Placeholder */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Best Sellers</h2>
            <p className="mt-4 text-muted-foreground">Our most popular artisanal creations.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mock Products */}
            {[
              { name: "Handwoven Bamboo Basket", price: "1,299", image: "/images/product_mat.png" },
              { name: "Terracotta Planter Set", price: "899", image: "/images/product_runner.png" },
              { name: "Cane Lounge Chair", price: "5,499", image: "/images/product_bag.png" },
            ].map((product, i) => (
              <div key={i} className="group flex flex-col bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/shop/${i+1}`} className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image} 
                    alt={product.name} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <span className="font-bold text-primary">₹{product.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Madhukati Craft</p>
                  <button 
                    onClick={(e) => handleAddToCart(product, (i + 1).toString(), e)}
                    className="w-full mt-4 bg-secondary text-secondary-foreground py-2 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {addedItems[(i + 1).toString()] ? (
                      <><Check className="h-4 w-4" /> Added</>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
