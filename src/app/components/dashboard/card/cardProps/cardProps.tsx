import { MdSupervisedUserCircle, MdShoppingCart, MdLocalOffer } from "react-icons/md";
import styles from "../card.module.css";

interface CardProps {
  title: string;
  number: string;
  detail: string;
  iconType: "customer" | "product" | "promotion";  // ระบุประเภทของไอคอน
}

export default function Card({ title, number, detail, iconType }: CardProps) {
  const renderIcon = () => {
    switch (iconType) {
      case "customer":
        return <MdSupervisedUserCircle size={32} />;
      case "product":
        return <MdShoppingCart size={32} />;
      case "promotion":
        return <MdLocalOffer size={32} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon}>{renderIcon()}</div>
      <div className={styles.texts}>
        <span className={styles.title}>{title}</span>
        <span className={styles.number}>{number}</span>
        <span className={styles.detail}>{detail}</span>
      </div>
    </div>
  );
};
