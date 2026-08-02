import Image from "next/image";
import Link from "next/link";
import { Leaf, Heart, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Madhukati Craft was born out of a passion for preserving traditional Indian artistry and empowering rural artisans.
          </p>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden shadow-md">
              <Image 
                src="/images/product_mat.png"
                alt="Artisan crafting"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-primary">How We Started</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  The seeds of Madhukati Craft were sown deep in the rural villages of West Bengal. It began with a simple observation: the remarkable, intricate art of weaving Madhurkathi (natural reed) mats was slowly fading away. Artisans who had learned these centuries-old techniques from their ancestors were struggling to find modern markets for their craft. 
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg mt-4">
                  We started by partnering with just a handful of local weavers, committed to providing them with fair wages and a platform to showcase their incredible talent. Our goal was to preserve the authenticity of the craft while introducing modern, functional designs like table runners, eco-friendly totes, and contemporary home decor that fit seamlessly into today's lifestyle.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-primary">Where We Are Today</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Today, Madhukati Craft has blossomed into a thriving community that connects hundreds of rural artisans with conscious consumers around the globe. We have expanded our catalog beyond the traditional sleeping mats to include premium, sustainable lifestyle products that bring a touch of earthy elegance to any home.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg mt-4">
                  Despite our growth, our core values remain unchanged. Every piece is still 100% handwoven using locally sourced, sustainable materials. We continue to empower artisan communities, ensuring that this beautiful heritage art form not only survives but thrives for generations to come.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border shadow-sm">
              <Leaf className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-muted-foreground">Every product is crafted using eco-friendly, locally sourced materials that leave a minimal carbon footprint.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border shadow-sm">
              <Heart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Handmade Process</h3>
              <p className="text-muted-foreground">No mass production. Each item is individually crafted by skilled hands, making every piece unique.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border shadow-sm">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Meet the Artisans</h3>
              <p className="text-muted-foreground">We work directly with craft communities, providing them a reliable livelihood and global recognition.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
