"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './customer.module.css';

type Customer = {
  id: number;
  nickName: string;
};

export default function CustomerDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [nickName, setNickName] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/api/customers');
      setCustomers(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to load customers.");
      setLoading(false);
    }
  };

  // Add a new customer
  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nickName.trim() === "") return;

    try {
      const response = await axios.post("/api/customers", { nickName });

      if (response.status !== 201) {
        throw new Error("Failed to add customer");
      }

      const newCustomer = response.data;
      setCustomers([...customers, newCustomer]);
      setNickName("");
      setShowForm(false);
    } catch (error) {
      console.error("Error adding customer:", error);
      setError("Failed to add customer.");
    }
  };

  // Delete a customer
  const handleDeleteCustomer = async (id: number) => {
    try {
      await axios.delete(`/api/customers/${id}`);
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      console.error("Error deleting customer:", error);
      setError("Failed to delete customer.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.headerTitle}>Customer Dashboard</h1>
        <button className={styles.addBtn} onClick={() => setShowForm(true)}>Add Customer</button>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nickname</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.nickName}</td>
                  <td>
                    <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {showForm && (
        <div className={styles.formContainer}>
          <form onSubmit={handleAddCustomer}>
            <label htmlFor="nickName">Nickname</label>
            <input
              type="text"
              id="nickName"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              required
            />
            <button type="submit" className={styles.submitBtn}>Add</button>
            <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
