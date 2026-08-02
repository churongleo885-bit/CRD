import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Total Revenue</p>
            <h3 className="text-2xl font-bold">₹1,24,500</h3>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +12.5% from last month
            </p>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Total Orders</p>
            <h3 className="text-2xl font-bold">845</h3>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +5.2% from last month
            </p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Total Customers</p>
            <h3 className="text-2xl font-bold">1,204</h3>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +18.1% from last month
            </p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Products</p>
            <h3 className="text-2xl font-bold">156</h3>
            <p className="text-xs text-muted-foreground mt-1">
              12 out of stock
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card rounded-lg border border-border shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
                <tr>
                  <th className="px-4 py-3 rounded-tl-md">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-tr-md text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { id: "MC-10293", customer: "Rahul S.", status: "Processing", amount: "2,499" },
                  { id: "MC-10292", customer: "Priya M.", status: "Shipped", amount: "899" },
                  { id: "MC-10291", customer: "Amit K.", status: "Delivered", amount: "5,150" },
                  { id: "MC-10290", customer: "Sneha P.", status: "Delivered", amount: "1,200" },
                ].map((order, i) => (
                  <tr key={i} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-primary">{order.id}</td>
                    <td className="px-4 py-3">{order.customer}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">₹{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            {[
              { name: "Handwoven Bamboo Basket", sales: 124, revenue: "1,11,476" },
              { name: "Terracotta Planter Set", sales: 98, revenue: "1,46,902" },
              { name: "Cane Lounge Chair", sales: 45, revenue: "3,82,455" },
              { name: "Hand-painted Diya Set", sales: 210, revenue: "62,790" },
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/50 transition-colors border border-transparent hover:border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-secondary rounded flex items-center justify-center font-bold text-muted-foreground">
                    {i+1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                  </div>
                </div>
                <div className="font-bold text-sm">
                  ₹{product.revenue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
