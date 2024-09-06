// CustomerDashboard.tsx

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
    axios
      .get('/api/customers')
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
        setError("Failed to load customers.");
        setLoading(false);
      });
  }, []);

  // ฟังก์ชันสำหรับเพิ่มลูกค้าใหม่
  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickName.trim() === '') return;

    axios
      .post('/api/customers', { nickName })
      .then((response) => {
        console.log("Customer added:", response.data);
        setCustomers([...customers, response.data]);  // เพิ่มลูกค้าใหม่ในตาราง
        setNickName('');
        setShowForm(false);  // ปิดฟอร์มเมื่อบันทึกสำเร็จ
        setError(null);  // ลบข้อความผิดพลาดถ้ามี
      })
      .catch((err) => {
        console.error("Error adding customer:", err);
        setError("Failed to add customer.");
      });
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
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.nickName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ฟอร์มสำหรับเพิ่มลูกค้า */}
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
