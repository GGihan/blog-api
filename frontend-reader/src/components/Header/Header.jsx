import styles from "./Header.module.css";
import Button from "../Button/Button";
import logo from "@/assets/images/logo.svg";
import menu from "@/assets/images/menu.svg";

export default function Header() {

  return (
    <header className={`${styles.headerContainer} flex-row`}>
      <a href="/" className="flex-row">
        <img
          src={logo}
          alt=""
          width="40"
          height="40"
          aria-hidden="true"
          className={styles.logo}
        />
        <h1 className={styles.headingOne}>NGRAVE</h1>
      </a>
      <Button className={styles.menuButton} aria-label="Open menu">
        <img src={menu} alt="" className={styles.menuImage} />
      </Button>
    </header>
  );
};