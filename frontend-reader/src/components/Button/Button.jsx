import styles from "./Button.module.css";

export default function Button({ className, type = "button", children, ...props }) {
  const combinedClassName = `${styles.baseButton} ${className || ""}`.trim();

  return (
    <button
      className={combinedClassName}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};