"use client";

import { useEffect } from "react";
import ProductPage from "../components/ProductPage";
import CartPage from "../components/CartPage";
import { useShop } from "../stores/ShopContext";

export default function Home() {
  const { products, loadProducts } = useShop();

  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, [products, loadProducts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50 font-sans p-4 rounded-2xl">
      <section>
        <h2 className="mb-3 text-base font-semibold text-zinc-900">
          รายการสินค้า
        </h2>
        <ProductPage />
      </section>
      <section>
        <h2 className="mb-3 text-base font-semibold text-zinc-900">
          ตะกร้าสินค้า
        </h2>
        <CartPage />
      </section>
    </div>
  );
}
