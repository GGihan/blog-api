import styles from "./Button.module.css";

export default function Button({ className, children, ...props }) {
  const combinedClassName = `${styles.baseButton} ${className || ""}`.trim();

  return (
    <button
      className={combinedClassName}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};