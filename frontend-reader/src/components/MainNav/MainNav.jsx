import { useAuth } from "@/hooks/useAuth";
import { NavLink } from "react-router";
import Button from "../Button/Button";
import styles from "./MainNav.module.css";
import close from "@/assets/images/close.svg";
import home from "@/assets/images/home.svg";
import register from "@/assets/images/sign-up.svg";
import login from "@/assets/images/log-in.svg";
import logoutIcon from "@/assets/images/log-out.svg";

export default function MainNav({ isOpen, onClose }) {

  const { user, logout } = useAuth();

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
        <li className={styles.menuItem}>
          <NavLink to="/" className={`${styles.linkGroup}`}>
            <img
              className={styles.linkIcon}
              src={home}
              alt=""
              width="30"
              height="30"
              aria-hidden="true"
            />
            <p className={styles.linkText}>Home</p>
          </NavLink>
        </li>
        {!user ? (
          <>
            <li className={styles.menuItem}>
              <NavLink to="/register" className={`${styles.linkGroup}`}>
                <img
                  className={styles.linkIcon}
                  src={register}
                  alt=""
                  width="30"
                  height="30"
                  aria-hidden="true"
                />
                <p className={styles.linkText}>Register</p>
              </NavLink>
            </li>
            <li className={styles.menuItem}>
              <NavLink to="/login" className={`${styles.linkGroup}`}>
                <img
                  className={styles.linkIcon}
                  src={login}
                  alt=""
                  width="30"
                  height="30"
                  aria-hidden="true"
                />
                <p className={styles.linkText}>Login</p>
              </NavLink>
            </li>
          </>
        ) : (
          <li className={styles.menuItem}>
            <Button
              className={styles.logoutButton}
              onClick={() => logout()}
              aria-hidden="true"
            >
              <img
                className={styles.linkIcon}
                src={logoutIcon}
                alt=""
                width="30"
                height="30"
              />
              Logout
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};