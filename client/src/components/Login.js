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
      <form className={styles.LoginBox}
        onSubmit={e=>{
          e.preventDefault();
          axios.post("/api/auth/signup", {email, password})
            .then(e=>{
              if (e.status === 200) {
                dispatch(setToken(e.data.token));
                history.push(originalLink || "/");
              } else {
                throw Error;
              }
            })
            .catch(e=>{
              console.log(e);
              setErrorMessage("Error")
            })
        }}>

        <p className={styles.LoginTitle}>Login to your account</p>

        <input className={styles.InputEmail}
          required
          type="email"
          placeholder="Email address"
          onChange={e=>{
            e.preventDefault();
            setEmail(e.target.value);
          }}
          value={email}
        />

        <input className={styles.InputPassword}
          required
          type="password"
          placeholder="Password"
          onChange={e=>{
            e.preventDefault();
            setPassword(e.target.value);
          }}
          value={password}
        />

        <button type="submit" className={styles.LoginButton}>
          Login
        </button>

        <p className={styles.ErrorMessage}>{errorMessage}</p>
        <Link to="/auth/sign-up">Sign up for an account!</Link>
      </form>
    </div>
  )
}