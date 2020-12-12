import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

import styles from "./Login.css";

export const Login = ({originalLink}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  return (
    <div className={styles.AuthContainer}>
      <div className={styles.LoginBox}>
        <p className={styles.LoginTitle}>Login to your account</p>
        <input className={styles.InputEmail}
          placeholder="Email address"
          onChange={e=>{
            e.preventDefault();
            setEmail(e.target.value);
          }}
          value={email}
        />

        <input className={styles.InputPassword}
          placeholder="Password "
          onChange={e=>{
            e.preventDefault();
            setPassword(e.target.value);
          }}
          value={password}
        />

        <button className={styles.LoginButton}
          onClick={e=>{
            e.preventDefault();
            axios.post("/api/auth/login", {email, password})
              .then(e=>{
                if (e.status === 200) {
                  localStorage.setItem("alvyBbt", e.data.token)
                  history.push(originalLink || "/");
                } else {
                  throw Error;
                }
              })
              .catch(e=>{
                console.log(e);
                setErrorMessage("Error")
              })
          }}>Login</button>

        <p className={styles.ErrorMessage}>{errorMessage}</p>
        <Link to="/auth/sign-up">Sign up for an account!</Link>
      </div>
    </div>
  )
}