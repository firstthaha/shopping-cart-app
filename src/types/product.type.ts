// สินค้า
export type Product = {
  id: string; // รหัสสินค้า
  name: string; // ชื่อสินค้า
  price: number; // ราคา
  stock: number; // จำนวนสินค้าที่เหลือ
};

// ตะกร้าสินค้า
export type Cart = {
  [productId: string]: number;
};

// รายการสินค้าในตะกร้า
export type CartItem = {
  product: Product; // ข้อมูลสินค้า
  quantity: number; // จำนวนที่ซื้อ
  subtotal: number; // ราคารวมของสินค้านี้
};
