"use client";

import Styles from "./products.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

type Products = {
  id: number;
  productName: string;
  category: string;
  price: number;
  image?: string; // Optional image path (binary data stored as base64)
};

export default function ProductDashboard() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    category: "coffee", // Default to coffee
    price: 0,
    image: "",
  });
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await handleUpdateProduct();
      } else {
        await handleAddProduct();
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form.");
    }
  };

  const handleAddProduct = async () => {
    try {
      const formData = {
        ...newProduct,
        image: newProduct.image.split(",")[1], // ส่งข้อมูล Base64 โดยตัด prefix ออก
      };
  
      const response = await axios.post("/api/products", formData);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to submit form.");
    }
  };
  
  const handleUpdateProduct = async () => {
    try {
      const formData = {
        ...newProduct,
        image: newProduct.image.split(",")[1], // ส่งข้อมูล Base64 โดยตัด prefix ออก
      };
  
      const response = await axios.patch(`/api/products/${editingId}`, formData);
      setProducts(
        products.map((product) =>
          product.id === editingId ? { ...product, ...response.data } : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update form.");
    }
  };
  

  const handleEdit = (product: Products) => {
    setEditingId(product.id);
    setNewProduct({
      productName: product.productName,
      category: product.category,
      price: product.price,
      image: product.image || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setNewProduct({
      productName: "",
      category: "coffee",
      price: 0,
      image: "",
    });
    setShowForm(false);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.top}>
        <h1 className={Styles.headerTitle}>Product Dashboard</h1>
        <button className={Styles.addBtn} onClick={() => setShowForm(true)}>
          Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <table className={Styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.image ? (
                      <img
                        src={`data:image/jpeg;base64,${product.image}`}
                        alt={product.productName}
                        width="50"
                        height="50"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{product.id}</td>
                  <td>{product.productName}</td>
                  <td>{product.category}</td>
                  <td>{product.price} บาท</td>
                  <td>
                    <button onClick={() => handleEdit(product)}>Edit</button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                    >
                      {deletingId === product.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {showForm && (
        <div className={Styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              value={newProduct.productName}
              onChange={handleChange}
              required
            />
            <label>Category</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              required
            >
              <option value="coffee">Coffee</option>
              <option value="tea">Tea</option>
              <option value="smoothie">Smoothie</option>
              <option value="bakery">Bakery</option>
            </select>
            <label>Price (บาท)</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              required
            />
            <label>Image</label>
            <input
              type="file"
              name="image"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setNewProduct({ ...newProduct, image: reader.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <button type="submit" className={Styles.submitBtn}>
              {editingId ? "Update Product" : "Add Product"}
            </button>
            <button
              type="button"
              className={Styles.cancelBtn}
              onClick={resetForm}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
