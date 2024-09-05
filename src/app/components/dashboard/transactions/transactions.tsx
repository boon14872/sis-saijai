import styles from "./transactions.module.css";
import Image from "next/image";
import React from 'react'

export default function Transactions() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Employee Status</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Order</td>
                        <td>Status</td>
                        <td>Date</td>
                        <td>Time</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Image
                                src="../assets/images/cat-smal.jpg"
                                alt=""
                                width={50}
                                height={50}
                                className={styles.userImage}
                            />
                            OHM
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.pending}`}>Pending</span>
                        </td>
                        <td>11/6/2024</td>
                        <td> 15:00 </td>
                        <td>2144 ฿</td>
                    </tr>

                    <tr>
                        <td>
                            <Image
                                src="../assets/images/cat-smal.jpg"
                                alt=""
                                width={50}
                                height={50}
                                className={styles.userImage}
                            />
                            OHM
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.done}`}>Done</span>
                        </td>
                        <td>11/6/2024</td>
                        <td> 15:01 </td>
                        <td>2144 ฿</td>
                    </tr>
                    <tr>
                        <td>
                            <Image
                                src="../assets/images/cat-smal.jpg"
                                alt=""
                                width={50}
                                height={50}
                                className={styles.userImage}
                            />
                            OHM
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.cancelled}`}>Cancelled</span>
                        </td>
                        <td>11/6/2024</td>
                        <td> 15:05 </td>
                        <td>2144 ฿</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};