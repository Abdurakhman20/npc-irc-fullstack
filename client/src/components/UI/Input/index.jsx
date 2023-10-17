import React from "react";
import styles from "./index.module.scss";

const Input = ({
  type = "text",
  placeholder = "Placeholder...",
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.input}
    />
  );
};

export default Input;
