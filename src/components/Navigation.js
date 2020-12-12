import React from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";

import styles from "./Navigation.css";
import {rmToken} from "../redux/actions";

export const Navigation = () => {
  const token = useSelector(store=>store.token);
  const dispatch = useDispatch();
  return (
    <div>
      <div className={styles.TopBannerContainer}>
        <a className={styles.BlogLink}
          href="https://github.com/alvyjudy/alveoli-bubble-tea-shop-frontend">
          <img className={styles.GithubLogo}
               src="https://cdn.iconscout.com/icon/free/png-512/github-153-675523.png"/>
        </a>
        <a href="https://alvyjudy-58477.medium.com/creating-a-website-for-a-bubble-tea-shop-v1-1-14ff3b397781"
           className={styles.BlogLink}            
        >blog</a>

        { !token &&
          <Link to="/auth/sign-up"
                className={styles.SignUpButton}
          >Sign up</Link>
        }

        { token && 
          <button className={styles.SignUpButton}
            onClick={e=>{
              console.log('token:', token)
              e.preventDefault();
              dispatch(rmToken());
              axios({
                method: "post",
                url:"/api/auth/logout",
                headers: {"Authorization":"Bearer " + token}
              })
            }}
          >Log out</button>
        }

      </div>
      <div className={styles.container}>
        <Link to="/products" className={styles.button}>
          <span className={styles.ButtonText}>Products</span>
        </Link>
        <Link to="/">
          <img className={styles.logo} 
          src="/assets/logo.svg" 
          alt="Home"/>
        </Link>
        <button className={styles.button}>
          <Link to="/cart" className={styles.ButtonText}>My Order</Link>
        </button>
      </div>
    </div>
    
  )
}

