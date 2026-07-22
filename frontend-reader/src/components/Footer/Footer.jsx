import styles from "./Footer.module.css";
import github from "@/assets/images/github.svg";
import linkedin from "@/assets/images/linkedin.svg";
import xcom from "@/assets/images/xcom.svg";

export default function Footer() {

  return (
    <footer>
      <nav className={styles.socials} aria-label="Social media links">
        <ul className={`${styles.socialsList} flex-row`}>
          <li className={styles.socialsItem}>
            <a
              className={styles.socialsLink}
              href="https://github.com/GGihan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
            >
              <img
                className={styles.socialsIcon}
                src={github}
                alt=""
                width="30"
                height="30"
                role="presentation"
              />
            </a>
          </li>
          <li className={styles.socialsItem}>
            <a
              className={styles.socialsLink}
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="linkedin homepage (opens in a new tab)"
            >
              <img
                className={styles.socialsIcon}
                src={linkedin}
                alt=""
                width="30"
                height="30"
                role="presentation"
              />
            </a>
          </li>
          <li className={styles.socialsItem}>
            <a
              className={styles.socialsLink}
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Xcom homepage (opens in a new tab)"
            >
              <img
                className={styles.socialsIcon}
                src={xcom}
                alt=""
                width="30"
                height="30"
                role="presentation"
              />
            </a>
          </li>
        </ul>
      </nav>
      <p>@GGihan</p>
    </footer>
  );
};