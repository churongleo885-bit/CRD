"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, Minus, Plus, ShoppingCart, Check, Heart, Shield, Truck, RotateCcw } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  
  const { addItem } = useCartStore();
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();

  // Mock product data
  const product = {
    id,
    name: "Premium Handwoven Bamboo Basket",
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 124,
    description: "This exquisite handwoven bamboo basket is crafted by skilled artisans using traditional techniques passed down through generations. Perfect for storage, decoration, or as a thoughtful gift. Made from 100% natural and sustainably sourced bamboo.",
    features: [
      "100% natural bamboo",
      "Eco-friendly and sustainable",
      "Handcrafted by rural artisans",
      "Durable and lightweight",
      "Multi-purpose storage solution"
    ],
    specifications: [
      { name: "Material", value: "Bamboo" },
      { name: "Dimensions", value: "12\" x 12\" x 10\"" },
      { name: "Weight", value: "450g" },
      { name: "Origin", value: "Assam, India" },
    ],
    images: [
      "/images/product_mat.png",
      "/images/product_bag.png",
      "/images/product_runner.png",
      "/images/product_mat.png"
    ],
    category: "Bamboo Crafts",
    inStock: true
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
      quantity: quantity
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const toggleWishlist = () => {
    if (isInWishlist(product.id.toString())) {
      removeWishlist(product.id.toString());
    } else {
      addWishlist({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">Home</Link> &gt; 
        <Link href="/shop" className="hover:text-primary"> Shop</Link> &gt; 
        <Link href="/categories/bamboo" className="hover:text-primary"> {product.category}</Link> &gt; 
        <span className="text-foreground"> {product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-16">
        {/* Product Images */}
        <div className="w-full md:w-1/2 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-4 overflow-x-auto sm:overflow-y-auto sm:w-24 shrink-0 pb-2 sm:pb-0">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-square w-20 sm:w-full rounded-md overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-primary' : 'border-transparent'}`}
              >
                <Image src={img} alt={`Thumbnail ${idx+1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-secondary">
            <Image 
              src={product.images[activeImage]} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-2 text-sm text-primary font-medium">{product.category}</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`h-5 w-5 ${star <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground underline cursor-pointer">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-end gap-3 mb-6">
            <span className="text-3xl font-bold text-primary">₹{product.price}</span>
            <span className="text-xl text-muted-foreground line-through mb-1">₹{product.originalPrice}</span>
            <span className="text-sm font-bold text-green-600 mb-1.5 bg-green-100 px-2 py-0.5 rounded">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          </div>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity and Actions */}
          <div className="space-y-6 pb-8 border-b border-border">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded-md">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-secondary transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-secondary transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-green-600 font-medium ml-2">In Stock</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                {isAdded ? (
                  <><Check className="h-5 w-5" /> Added to Cart</>
                ) : (
                  <><ShoppingCart className="h-5 w-5" /> Add to Cart</>
                )}
              </button>
              <button 
                onClick={() => {
                  handleAddToCart();
                  window.location.href = "/checkout";
                }}
                className="flex-1 bg-accent text-accent-foreground py-3 rounded-md font-semibold hover:bg-accent/90 transition-colors"
              >
                Buy Now
              </button>
              <button 
                onClick={toggleWishlist}
                className="p-3 border border-border rounded-md hover:bg-secondary text-muted-foreground transition-colors flex items-center justify-center"
                title={isInWishlist(product.id.toString()) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product.id.toString()) ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="py-6 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-5 w-5 text-primary" />
              <span>Free shipping on orders over ₹1000</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-5 w-5 text-primary" />
              <span>Authentic Handmade Product Guarantee</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span>7-day easy return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12">
        <div className="flex gap-8 border-b border-border mb-8 overflow-x-auto">
          <button className="pb-4 font-semibold text-primary border-b-2 border-primary whitespace-nowrap">Description & Features</button>
          <button className="pb-4 font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">Specifications</button>
          <button className="pb-4 font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">Reviews ({product.reviews})</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Product Features</h3>
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              {product.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Specifications</h3>
            <div className="space-y-3">
              {product.specifications.map((spec, idx) => (
                <div key={idx} className="flex border-b border-border pb-2">
                  <span className="w-1/3 text-muted-foreground">{spec.name}</span>
                  <span className="w-2/3 font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
