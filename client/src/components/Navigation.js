import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import styles from "./Navigation.scss";
import { rmToken } from "../redux/actions";

export const Navigation = () => {
  const token = useSelector((store) => store.token);
  const dispatch = useDispatch();
  return (
    <div className={styles.navigation}>
      <div className={styles.primaryNavigation}>
        <Link to="/">
          <img className={styles.logo} src="/assets/logo.svg" alt="Home" />
        </Link>

        <Link to="/products" className={styles.button}>
          <span className={styles.ButtonText}>Products</span>
        </Link>

        <Link to="/cart" className={styles.button}>
          <span className={styles.ButtonText}>Cart</span>
        </Link>

        <Link to="/orders" className={styles.button}>
          <span className={styles.ButtonText}>Orders</span>
        </Link>
      </div>
      <div className={styles.secondaryNavigation}>
        <a
          className={styles.BlogLink}
          href="https://github.com/alvyjudy/drink-shop"
        >
          <img
            className={styles.GithubLogo}
            src="https://cdn.iconscout.com/icon/free/png-512/github-153-675523.png"
          />
        </a>

        {!token && (
          <Link to="/auth/sign-up" className={styles.SignUpButton}>
            Sign up
          </Link>
        )}

        {token && (
          <button
            className={styles.SignUpButton}
            onClick={(e) => {
              e.preventDefault();
              dispatch(rmToken());
              axios({
                method: "post",
                url: "/api/auth/logout",
                headers: { Authorization: "Bearer " + token },
              });
            }}
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
};
