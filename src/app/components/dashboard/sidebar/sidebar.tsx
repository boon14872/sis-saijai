import Styles from "./sidebar.module.css";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import {
  MdDashboard,
  MdInventory,
  MdLogout,
  MdProductionQuantityLimits,
  MdEmojiPeople,
  MdBorderAll
} from "react-icons/md";

const menuItems = [
  {
    title: 'Page',
    list: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <MdDashboard />
      },
      {
        title: 'Customer',
        path: '/dashboard/customer',
        icon: <MdEmojiPeople />
      },
      {
        title: 'Employee',
        path: '/dashboard/employees',
        icon: <MdEmojiPeople />
      },
      {
        title: 'Product',
        path: '/dashboard/products',
        icon: <MdProductionQuantityLimits />
      },
      {
        title: 'Inventory',
        path: '/dashboard/inventory',
        icon: <MdInventory />
      },
    ],
  },
  {
    title: 'POS',
    list: [
      {
        title: 'Orders',//รายการสินค้า
        path: '/dashboard/orders',
        icon: <MdBorderAll />
      },
      {
        title: 'Payments',//การชำระเงิน
        path: '/dashboard/payment',
        icon: <MdProductionQuantityLimits />
      },
    ],
  },
  {
    title: 'Promotion',
    list: [
      {
        title: 'Promotion',
        path: '/dashboard/promotions',
        icon: <MdInventory />
      },
    ],
  },
  {
    title: 'Settings',
    list: [
      {
        title: 'Logout',
        path: '/login',
        icon: <MdLogout />
      },
    ],
  },
];



import React from 'react'

export default function Sidebar() {
  return (
    <div className={Styles.sidebar}>
      <div className={Styles.user}>
        <Image
          src="/images/cat-drinking-coffee.gif"
          alt="User Avatar"
          width={50}
          height={50}
        />
        <div className={Styles.userDetail}>
          <span className={Styles.username}>Owner</span>
          <span className={Styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={Styles.list}>
        {menuItems.map((sublist) => (
          <li key={sublist.title}>
            <span className={Styles.sublist}>
              {sublist.title} {/* Fixed to use item.title */}
            </span>
            <ul>
              {sublist.list.map((item) => (
                <MenuLink item={item} key={item.title} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};