import { Link } from "react-router";
import styles from "./Unauthorized.module.css";

export default function Unauthorized() {

  return (
    <div className={`${styles.unauthorizedContainer} flex-column`}>
      <p className={styles.errorMessage}>Unauthorized user!</p>
      <p className={styles.errorMessage}>Log in as an author!</p>
        <Link to="/login" className={styles.loginLink}>
          Login
        </Link>
    </div>
  );
};