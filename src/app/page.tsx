import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import "./globals.css";


export const metadata = {
  title: "Home | Pos Sai Jai",
  description: "Welcome to Pos Sai Jai Hom Bar",
};
export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.glowingBorder}>
        <div className={`${styles.imageContainer}`}>
          <Image
            src="/images/cat-drinking-coffee.gif"
            alt=""
            width={100}
            height={100}
            priority
          />
        </div>
        <div className={styles.container}>
          <h1 className={styles.title}>Pos Sai Jai</h1>
        </div>

        <div className={styles.container}>
          <h2 className={styles.subtitle}>Hom Bar</h2>
        </div>

        <div className={`${styles.container} ${styles.buttons}`}>
          <Link href="/pos" passHref legacyBehavior>
            <a className={styles.button}>POS</a>
          </Link>
          <Link href="/dashboard" passHref legacyBehavior>
            <a className={styles.button}>Dashboard</a>
          </Link>
          <Link href="/login" passHref legacyBehavior>
            <a className={styles.button}>Login</a>
          </Link>
        </div>
      </div>
    </main>
  );
}