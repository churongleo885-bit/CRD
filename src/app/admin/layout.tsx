import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Users, Settings, Tag, MessageSquare, LogOut, PackageSearch } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-secondary/30 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/admin" className="text-xl font-bold text-primary">Madhukati Admin</Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-4">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-md font-medium">
              <LayoutDashboard className="h-5 w-5" /> Dashboard
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md font-medium transition-colors">
              <PackageSearch className="h-5 w-5" /> Products
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md font-medium transition-colors">
              <ShoppingBag className="h-5 w-5" /> Orders
            </Link>
            <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md font-medium transition-colors">
              <Users className="h-5 w-5" /> Customers
            </Link>
            <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md font-medium transition-colors">
              <Tag className="h-5 w-5" /> Categories
            </Link>
            <Link href="/admin/reviews" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md font-medium transition-colors">
              <MessageSquare className="h-5 w-5" /> Reviews
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t border-border">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md font-medium transition-colors mb-2">
            Back to Store
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-md font-medium transition-colors">
            <LogOut className="h-5 w-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        {/* Mobile Header */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-border bg-card md:hidden">
          <Link href="/admin" className="text-xl font-bold text-primary">Admin</Link>
          <button className="text-muted-foreground"><LayoutDashboard /></button>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
