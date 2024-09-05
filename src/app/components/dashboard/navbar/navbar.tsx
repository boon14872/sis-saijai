"use client"
import Styles from "./navbar.module.css";
import { usePathname } from "next/navigation";
import React from 'react'

export default function Navbar() {
    const pathname = usePathname();
    return (
        <div className={Styles.navbar}>
            <div className={Styles.title}>
                {pathname.split('/').pop()}
            </div>
        </div>
    )
}