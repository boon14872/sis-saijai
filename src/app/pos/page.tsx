'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

type MenuItem = {
  id: number;
  name: string;
  price: number;
};

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orderItems, setOrderItems] = useState<{ id: number; quantity: number }[]>([]);

  useEffect(() => {
    axios.get('/api/menu').then((response) => {
      setMenuItems(response.data);
    });
  }, []);

  const handleAddToOrder = (id: number) => {
    setOrderItems([...orderItems, { id, quantity: 1 }]);
  };

  const handleSubmitOrder = () => {
    axios.post('/api/order', { items: orderItems }).then((response) => {
      alert(`ยอดรวม: ${response.data.order.total} บาท`);
    });
  };

  return (
    <div>
      <h1>เมนู</h1>
      <ul>
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price} บาท
              <button onClick={() => handleAddToOrder(item.id)}>เพิ่มในรายการ</button>
            </li>
          ))
        ) : (
          <li>ไม่มีเมนู</li>
        )}
      </ul>
      <button onClick={handleSubmitOrder}>ส่งคำสั่งซื้อ</button>
    </div>
  );
}
