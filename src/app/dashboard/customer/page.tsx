"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./customer.module.css";

type Customer = {
  id: number;
  nickName: string;
  email: string;
};

export default function CustomerDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/customers/${id}`, {
        method: "DELETE",
      });
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      console.error("Failed to delete customer", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Customer Dashboard</h1>
      <Link href="/dashboard/customers/add">
        <button>Add Customer</button>
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nickname</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.nickName}</td>
                <td>{customer.email}</td>
                <td>
                  <Link href={`/dashboard/customers/edit/${customer.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(customer.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}