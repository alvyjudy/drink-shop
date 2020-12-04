import React from "react";
import {Link} from "react-router-dom";

import styles from "./Navigation.css";

export const Navigation = () => {
  return (
    <div className={styles.container}>
      <Link to="/products" className={styles.button}>
        <span className={styles.ButtonText}>Products</span>
      </Link>
      <Link to="/">
        <img className={styles.logo} 
        src="/Logo.svg" 
        alt="Home"/>
      </Link>
      <button className={styles.button}>
        <span className={styles.ButtonText}>My Order</span>
      </button>
    </div>
  )
}

