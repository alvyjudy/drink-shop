import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux"

import styles from "./SignUp.css";
import {setToken} from "../redux/actions";

export const SignUp = ({originalLink}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className={styles.AuthContainer}>
      <form className={styles.SignUpBox}
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
        }}
      >
        <p className={styles.SignUpTitle}>Sign up with us</p>
        <input className={styles.InputEmail}
          required
          type="email"
          placeholder="Email address"
          onChange={e=>{
            setEmail(e.target.value);
          }}
          value={email}
        />

        <input className={styles.InputPassword}
          required
          type="password"
          placeholder="Password"
          onChange={e=>{
            setPassword(e.target.value);
          }}
          value={password}
        />

        <button type="submit" className={styles.SignUpButton}>
          Sign up
        </button>

        <p className={styles.ErrorMessage}>{errorMessage}</p>
        <Link to="/auth/login">Have an account? Login instead</Link>
      </form>
    </div>
  )
}