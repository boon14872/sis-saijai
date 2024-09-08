"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./products.module.css"; // ปรับเส้นทาง CSS ให้ตรงตามโครงสร้างไฟล์

type Product = {
  id: number;
  productName: string;
  category: string;
  price: number;
  toppings: { Topping: { toppingName: string } }[];
};

export default function ProductDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load products.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.headerTitle}>Product Dashboard</h1>
        <button className={styles.addBtn}>Add Topping</button>
        <button className={styles.addBtn}>Add Product</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Toppings</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>
                  {product.toppings
                    .map((topping) => topping.Topping.toppingName)
                    .join(", ")}
                </td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
