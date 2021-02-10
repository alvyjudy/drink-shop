import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import styles from "./SignUp.scss";
import { setToken } from "../redux/actions";

export const SignUp = ({ originalLink }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signupPage, setSignupPage] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className={styles.AuthContainer}>
      <form
        className={styles.SignUpBox}
        onSubmit={(e) => {
          e.preventDefault();
          if (signupPage) {
            axios
              .post("/api/auth/signup", { email, password })
              .then((e) => {
                if (e.status === 200) {
                  dispatch(setToken(e.data.token));
                  history.push(originalLink || "/");
                } else {
                  throw Error;
                }
              })
              .catch((e) => {
                console.log(e);
                setErrorMessage("Error");
              });
          }
        }}
      >
        <div className={styles.tab}>
          <button
            type="button"
            className={
              signupPage ? styles["tabTitle--active"] : styles.tabTitle
            }
            onClick={() => {
              setSignupPage(true);
            }}
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={() => {
              setSignupPage(false);
            }}
            className={
              signupPage ? styles.tabTitle : styles["tabTitle--active"]
            }
          >
            Log in
          </button>
        </div>
        <input
          className={styles.inputField}
          required
          type="email"
          placeholder="Email address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <input
          className={styles.inputField}
          required
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <button type="submit" className={styles.signUpButton}>
          {signupPage ? "Sign up" : "Log in"}
        </button>
        {signupPage && (
          <button
            type="button"
            className={styles.demoButton}
            onClick={() => {
              setEmail(`testUser${Date.now()}@mail.com`);
              setPassword(`1234`);
            }}
          >
            demo
          </button>
        )}
        <p className={styles.ErrorMessage}>{errorMessage}</p>
      </form>
    </div>
  );
};
