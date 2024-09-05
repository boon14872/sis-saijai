// src/app/pos/page.tsx
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './pos.module.css';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    axios.get('/api/products').then((response) => {
      setProducts(response.data);
    }).catch((error) => {
      console.error("Error fetching products:", error);
    });
  }, []);

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    alert(`ยอดรวมทั้งหมด: ${calculateTotal()} บาท`);
    setCart([]); // ล้างตะกร้าหลังการชำระเงิน
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>ระบบขายหน้าร้าน</h1>
      </div>

      {/* แสดงสินค้าที่มี */}
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price} บาท</p>
            <button className={styles.button} onClick={() => handleAddToCart(product)}>เพิ่มลงตะกร้า</button>
          </div>
        ))}
      </div>

      {/* แสดงตะกร้าสินค้า */}
      <div className={styles.cartContainer}>
        <h2>ตะกร้าสินค้า</h2>
        {cart.length === 0 ? (
          <p>ตะกร้าว่างเปล่า</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <h3>{item.name}</h3>
              <p>{item.price} บาท x {item.quantity}</p>
            </div>
          ))
        )}
        <div className={styles.cartTotal}>
          ยอดรวม: {calculateTotal()} บาท
        </div>
        <button className={styles.checkoutButton} onClick={handleCheckout}>
          ชำระเงิน
        </button>
      </div>
    </div>
  );
}
