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

// ข้อมูลสินค้า
export type ProductApiItem = {
  product: {
    id: string;
    name: string;
    price: number;
  };
  total: number;
};
