import styles from "./Header.module.css";
import Button from "../Button/Button";
import logo from "@/assets/images/logo.svg";
import menu from "@/assets/images/menu.svg";

export default function Header({ onMenuToggle }) {

  return (
    <header className={`${styles.headerContainer} flex-row`}>
      <a href="/" className="flex-row">
        <img
          className={styles.logo}
          src={logo}
          alt=""
          width="40"
          height="40"
          aria-hidden="true"
        />
        <h1 className={styles.headingOne}>NGRAVE</h1>
      </a>
      <div className={styles.menuButtonWrapper}>
        <Button
          className={styles.menuButton}
          onClick={onMenuToggle}
          aria-label="Open menu"
        >
          <img
            className={styles.menuImage}
            src={menu}
            alt=""
            width="24"
            height="24"
          />
        </Button>
      </div>
    </header>
  );
};