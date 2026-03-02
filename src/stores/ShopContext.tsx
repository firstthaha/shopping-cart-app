"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { getProducts, updateProduct } from "../services/product.service";

// ====== TYPE ======
type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

type Cart = {
  [productId: string]: number;
};

type ProductApiItem = {
  product: {
    id: string;
    name: string;
    price: number;
  };
  total: number;
};

type ShopContextType = {
  products: Product[];
  cart: Cart;
  loadProducts: () => Promise<void>;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  checkOut: () => void;
};

// ====== CONTEXT ======
const ShopContext = createContext<ShopContextType | null>(null);

// ====== HOOK ======
export const useShop = () => {
  const ctx = useContext(ShopContext);

  if (!ctx) {
    throw new Error("useShop must be used within ShopProvider");
  }

  return ctx;
};

// ====== PROVIDER ======
export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart>({});

  // โหลดสินค้า
  const loadProducts = useCallback(async () => {
    const res = await getProducts();

    if (!res.success) return;

    const list = res.data.map((item: ProductApiItem) => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      stock: item.total,
    }));

    setProducts(list);
  }, []);

  // เพิ่มสินค้า
  const addToCart = useCallback(
    (id: string) => {
      const currentQty = cart[id] || 0;
      setCart({
        ...cart,
        [id]: currentQty + 1,
      });
    },
    [cart],
  );

  // ลบสินค้าออกจากตะกร้า
  const removeFromCart = useCallback(
    (id: string) => {
      const newCart = { ...cart };
      delete newCart[id];
      setCart(newCart);
    },
    [cart],
  );

  // เปลี่ยนจำนวน
  const updateQty = useCallback(
    (id: string, qty: number) => {
      setCart({
        ...cart,
        [id]: qty,
      });
    },
    [cart],
  );

  // ล้างตะกร้า
  const clearCart = useCallback(() => {
    setCart({});
  }, []);

  // checkout
  const checkOut = useCallback(async () => {
    const updatedProducts = products.map((p) => {
      const qty = cart[p.id] || 0;
      if (qty > 0) {
        updateProduct(p.id, qty);
      }
      return {
        ...p,
        stock: p.stock - qty,
      };
    });

    setProducts(updatedProducts);
    setCart({});
  }, [products, cart]);

  const contextValue = useMemo(() => {
    return {
      products,
      cart,
      loadProducts,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      checkOut,
    };
  }, [
    products,
    cart,
    loadProducts,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    checkOut,
  ]);

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
