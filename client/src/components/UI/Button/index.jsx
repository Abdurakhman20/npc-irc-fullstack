import React from "react";
import styles from "./index.module.scss";

const Button = ({ children, onClick, type = "button" }) => {
  return (
    <button onClick={onClick} className={styles.button} type={type}>
      {children}
    </button>
  );
};

export default Button;
