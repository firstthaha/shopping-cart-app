"use client";
import { useMemo } from "react";
import { useShop } from "../stores/ShopContext";
import { formatMoney } from "../utilities/currency.util";

export default function CartPage() {
  const { products, cart, updateQty, removeFromCart, clearCart, checkOut } =
    useShop();

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .filter(([_, qty]) => qty > 0)
      .map(([idStr, qty]) => {
        const product = products.find((p) => p.id === idStr)!;
        return {
          product,
          isFully: qty == product.stock,
          quantity: qty,
          subtotal: product.price * Number(qty),
        };
      });
  }, [cart, products]);

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.subtotal, 0),
    [cartItems],
  );

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-3 text-base font-semibold text-zinc-900">
        รายการสินค้าในตะกร้า
      </div>
      {cartItems.length === 0 ? (
        <div className="text-sm text-zinc-500">ไม่พบสินค้าในตะกร้า</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <div className="flex gap-3 pb-2">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="min-w-\[240px\] rounded-lg border border-zinc-200 bg-white p-3 shadow-sm"
                >
                  <div className="mb-2">
                    <div className="text-sm font-medium text-zinc-900">
                      {item.product.name}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {formatMoney(item.product.price)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center rounded border border-zinc-300">
                      <button
                        className="px-2 py-1 text-sm"
                        onClick={() =>
                          updateQty(item.product.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        className="px-2 py-1 text-sm"
                        disabled={item.isFully}
                        hidden={item.isFully}
                        onClick={() =>
                          updateQty(item.product.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="pt-2 text-md font-bold text-zinc-900">
                    {formatMoney(item.subtotal)}
                  </div>

                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors text-white  bg-red-500 hover:bg-red-700"
                    >
                      นำออก
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-3">
            <span className="text-sm text-zinc-600">ยอดรวม</span>
            <span className="text-sm font-semibold text-zinc-900">
              {formatMoney(total)}
            </span>
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={clearCart}
              className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
            >
              ล้างรายการทั้งหมด
            </button>
            <button
              onClick={checkOut}
              disabled={cartItems.length === 0}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                cartItems.length === 0
                  ? "bg-zinc-200 text-zinc-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-800"
              }`}
            >
              ชำระเงิน
            </button>
          </div>
        </>
      )}
    </div>
  );
}
