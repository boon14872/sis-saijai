import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

import React from 'react'

export default function Card() {
    return (
        <div className={styles.container}>
            <div className={styles.icon}><MdSupervisedUserCircle size={32} /> </div>
            <div className={styles.texts}>
                <span className={styles.title}>Promotion</span>
                <span className={styles.number}>นิสิต ลด 5 ฿</span>
                <span className={styles.detail}>
                    <span className={styles.positive}>ตั้งแต่!</span> 20-01-2023 ถึง 20-02-2024
                </span>
            </div>
        </div>
    );
};