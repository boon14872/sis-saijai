import styles from "./footer.module.css";

import React from 'react'

export default function Footer() {
  return (
    <div className={styles.container}>
      <p className={styles.logo}>Sai Jai</p>
      <p className={styles.text}>© 2024 Pos Sai Jai. All rights reserved.</p>
    </div>
  );
};