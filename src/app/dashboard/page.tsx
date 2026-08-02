"use client";

import Link from "next/link";
import { User, Package, MapPin, Heart, CreditCard, Settings, LogOut } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-[70vh]">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-card rounded-lg border border-border shadow-sm p-4 sticky top-24">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-xl">
                JD
              </div>
              <div>
                <h2 className="font-bold">John Doe</h2>
                <p className="text-sm text-muted-foreground">john@example.com</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 bg-secondary text-foreground rounded-md font-medium">
                <User className="h-5 w-5" /> Profile
              </Link>
              <Link href="/dashboard/orders" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md font-medium transition-colors">
                <Package className="h-5 w-5" /> Orders
              </Link>
              <Link href="/dashboard/addresses" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md font-medium transition-colors">
                <MapPin className="h-5 w-5" /> Addresses
              </Link>
              <Link href="/wishlist" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md font-medium transition-colors">
                <Heart className="h-5 w-5" /> Wishlist
              </Link>
              <Link href="/dashboard/payments" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md font-medium transition-colors">
                <CreditCard className="h-5 w-5" /> Payment Methods
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md font-medium transition-colors">
                <Settings className="h-5 w-5" /> Settings
              </Link>
              <div className="pt-4 mt-4 border-t border-border">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-md font-medium transition-colors">
                  <LogOut className="h-5 w-5" /> Sign Out
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          
          <div className="bg-card rounded-lg border border-border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-border">Personal Information</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input type="text" defaultValue="John" className="w-full px-4 py-2 border border-border rounded-md bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input type="text" defaultValue="Doe" className="w-full px-4 py-2 border border-border rounded-md bg-background" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input type="email" defaultValue="john@example.com" disabled className="w-full px-4 py-2 border border-border rounded-md bg-secondary text-muted-foreground cursor-not-allowed" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input type="tel" defaultValue="+91 9876543210" className="w-full px-4 py-2 border border-border rounded-md bg-background" />
              </div>
              <button type="button" className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:bg-primary/90">
                Save Changes
              </button>
            </form>
          </div>

          <div className="bg-card rounded-lg border border-border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-border">Change Password</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-border rounded-md bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-border rounded-md bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-border rounded-md bg-background" />
              </div>
              <button type="button" className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md font-semibold hover:bg-secondary/80 border border-border">
                Update Password
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
