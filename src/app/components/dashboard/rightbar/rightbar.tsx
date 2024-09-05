import styles from "./rightbar.module.css";
import Image from "next/image";
import { MdDone, MdEdit, MdOutlineCancel } from "react-icons/md";

import React from 'react'

export default function Rghtbar() {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image
                        src="/assets/images/cat-drinking-coffee.gif"
                        alt="User"
                        className={styles.userImage}
                        width={100}
                        height={100}
                    />
                </div>
                <div className={styles.texts}>
                    <span className={styles.notification}>
                        New Order!
                        <h3 className={styles.title}>Order No 19</h3>
                        <span className={styles.subtitle}>Khon Nana</span>
                    </span>
                    <p className={styles.desc}>Menu</p>
                    <span className={styles.descdetail}>Menu Detail</span>
                    <button className={styles.buttondone}>
                        <MdDone /> Done
                    </button>

                    <button className={styles.buttoncancelled}>
                        <MdOutlineCancel /> Cancelled
                    </button>

                    <button className={styles.buttonedit}>
                        <MdEdit /> Edit
                    </button>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image
                        src="/assets/images/cat-drinking-coffee.gif"
                        alt="User"
                        className={styles.userImage}
                        width={100}
                        height={100}
                    />
                </div>
                <div className={styles.texts}>
                    <span className={styles.notification}>
                        New Order!
                        <h3 className={styles.title}>Order No 20</h3>
                        <span className={styles.subtitle}>Khon Nana</span>
                    </span>
                    <p className={styles.desc}>Menu</p>
                    <span className={styles.descdetail}>Menu Detail</span>
                    <button className={styles.buttondone}>
                        <MdDone /> Done
                    </button>

                    <button className={styles.buttoncancelled}>
                        <MdOutlineCancel /> Cancelled
                    </button>

                    <button className={styles.buttonedit}>
                        <MdEdit /> Edit
                    </button>
                </div>
            </div>
        </div>
    );
}