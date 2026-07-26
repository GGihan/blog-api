export default function Button({ className, type = "button", children, ...props }) {
  const combinedClassName = `${className || ""}`.trim();

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