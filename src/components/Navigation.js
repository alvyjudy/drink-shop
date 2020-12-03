import React from "react";
import styles from "./Navigation.css";

export const Navigation = () => {
  return (
    <div className={styles.container}>
      <button className={styles.button}>Products</button>
      <div className={styles.logo}>Home</div>
      <button className={styles.button}>My Order</button>
    </div>
  )
}

