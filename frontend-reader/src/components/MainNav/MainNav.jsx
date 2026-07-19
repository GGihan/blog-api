import Button from "../Button/Button";
import styles from "./MainNav.module.css";
import close from "@/assets/images/close.svg";

export default function MainNav({ isOpen, onClose }) {

  return (
    <nav className={`main-nav ${styles.navContainer} ${isOpen ? styles.navOpen : ''}`}>
      <div className={styles.closeButtonWrapper}>
        <Button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close menu"
        >
          <img
            className={styles.closeImage}
            src={close}
            alt=""
            width="24"
            height="24"
          />
        </Button>
      </div>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>Home

        </li>
        <li className={styles.menuItem}>Login

        </li>
        <li className={styles.menuItem}>Register
          
        </li>
      </ul>
    </nav>
  );
};