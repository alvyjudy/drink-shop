import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";

import styles from "./Navigation.css";

export const Navigation = () => {
  const token = useSelector(store=>store.token);
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
              e.preventDefault();
              axios({
                method: "post",
                url:"/api/auth/log-out",
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
          <span className={styles.ButtonText}>My Order</span>
        </button>
      </div>
    </div>
    
  )
}

