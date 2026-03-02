"use client";

import { useShop } from "../stores/ShopContext";
import { formatMoney } from "../utilities/currency.util";

export default function ProductPage() {
  const { products, cart, addToCart } = useShop();

  if (!products.length) {
    return <div className="text-sm text-zinc-500">ไม่พบรายการสินค้า</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {products.map((p) => {
        const inCart = cart[p.id] || 0;
        const available = p.stock - inCart;
        const canAdd = available > 0;

        return (
          <div
            key={p.id}
            className="group rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-zinc-300"
          >
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium text-zinc-900 text-lg whitespace-nowrap overflow-hidden">
                  {p.name}
                </div>

                <div className="text-xs text-zinc-500">
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700">
                    {formatMoney(p.price)}
                  </span>
                  <span className="ml-2">• จำนวนคงเหลือ : {p.stock}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-zinc-500">
                จำนวนที่มี : {available}
              </span>

              <button
                onClick={() => addToCart(p.id)}
                disabled={!canAdd}
                className={`inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors
                  ${
                    canAdd
                      ? "bg-blue-500 text-white hover:bg-blue-700"
                      : "bg-zinc-200 text-zinc-300 cursor-not-allowed"
                  }`}
              >
                เพิ่มสินค้า
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
