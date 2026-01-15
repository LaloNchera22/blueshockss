import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Plus, PackageSearch, Eye, ShoppingCart, TrendingUp } from "lucide-react"
import Link from "next/link"
import ProductCard from "./product-card"
import { ProLock } from "@/components/ui/pro-lock"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect("/login")

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="p-8 md:p-12 w-full max-w-7xl mx-auto space-y-10">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/60 pb-6">
          <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                  Mis Productos
              </h1>
              <p className="text-slate-500 font-medium">
                  Administra el inventario de tu tienda.
              </p>
          </div>

          {products && products.length > 0 && (
              <Link
                  href="/dashboard/new"
                  className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                  <Plus size={20} />
                  Nuevo Producto
              </Link>
          )}
      </div>

      {/* ANALYTICS SECTION */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Business Analytics</h2>
        <ProLock isPro={false}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <Eye size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Views</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-slate-900">12,345</span>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full flex items-center">
                    +12% <TrendingUp size={10} className="ml-1" />
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                <ShoppingCart size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Sales</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-slate-900">142</span>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full flex items-center">
                    +5% <TrendingUp size={10} className="ml-1" />
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Revenue</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-slate-900">$4,230</span>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full flex items-center">
                    +8% <TrendingUp size={10} className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ProLock>
      </div>

      {/* GRID DE PRODUCTOS */}
      {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
              ))}
          </div>
      ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white border border-dashed border-slate-300 rounded-3xl animate-in fade-in zoom-in-95 duration-500 max-w-2xl mx-auto mt-10">
              <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <PackageSearch size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                  Tu catálogo está vacío
              </h3>
              <p className="text-slate-500 max-w-md mb-10 text-lg leading-relaxed">
                  Agrega tu primer producto para comenzar a recibir pedidos.
              </p>
              <Link
                  href="/dashboard/new"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:scale-105 active:scale-95"
              >
                  <Plus size={24} />
                  Crear mi primer producto
              </Link>
          </div>
      )}
    </div>
  )
}
