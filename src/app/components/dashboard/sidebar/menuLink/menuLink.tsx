"use client"
import Link from "next/link";
import Styles from "./menuLink.module.css";
import React from 'react'
import { usePathname } from "next/navigation";

type MenuItem = {
    title: string;
    path: string;
    icon: JSX.Element;
  };

export default function MenuLink({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  
  return (
    <Link href={item.path} className={`${Styles.container} ${pathname === item.path ? Styles.active : ''}`} >
      {item.icon}
      {item.title}
    </Link>
  );
}