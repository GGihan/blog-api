import styles from "./Header.module.css";
import logo from "@/assets/images/logo.svg";

export default function Header() {

  return (
    <header className={`${styles.headerContainer} flex-row`}>
      <a href="/" className="flex-row">
        <img src={logo} alt="" role="presentation" className={styles.logo}></img>
        <h1 className={styles.headingOne}>NGRAVE</h1>
      </a>
    </header>
  );
};