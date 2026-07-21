import styles from "./ErrorPage.module.css";
import arrowLeft from "@/assets/images/arrow-left.svg";
import { Link } from "react-router";

export default function ErrorPage() {
  
  return (
    <div className={`${styles.errorPage} flex-column`}>
      <h1 className={styles.errorMessage}>Oh no, this page doesn't exist!</h1>
      <Link to="/" className={`${styles.link} flex-row`}>
        <img
          className={styles.returnImage}
          src={arrowLeft}
          alt=""
          width='30'
          height='30'
        />
        Return
      </Link>
    </div>
  );
};