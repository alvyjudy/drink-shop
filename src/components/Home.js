import React, {useState} from "react";
import {Link} from "react-router-dom";

import styles from "./Home.css";

export const Home = () => {
  return <div className={styles.Home}>
    <Gallery/>
    <SubscribeBox/>
  </div>
}

const Gallery = () => {
  const pics = ["home-1.jpg", "home-2.jpg", "home-3.jpg"];
  const [pic, setPic] = useState(pics[0]);
  
  return (
    <div className={styles.PicsContainer}>
      <p className={styles.PicTitle}>Best bubble tea in town</p>
      
      <Link to="/products" className={styles.ShopNow}>
        <p className={styles.ShopNowText}>Shop now</p>
      </Link>


      <div className={styles.PicOverlay}>
        <img src={"/assets/" + pic} className={styles.Pic}/>
      </div>
      
      <div className={styles.Slider}>
        {
          pics.map((item,i)=>{
            return (
              <button
                key={i}
                className={styles.SlideButton}
                onClick={e=>{
                  e.preventDefault();
                  setPic(item)
                }}
              ></button>
          )})
        }
      </div>

      
    </div>
  )
}

const SubscribeBox = () => {
  const [email, setEmail] = useState("");

  return (
    <div className={styles.SubscribeBoxContainer}>
      <div className={styles.SubscribeBoxTitleContainer}>
        <div className={styles.SubscribeBoxTitle}>
          Get involved!
        </div>
        <div className={styles.SubscribeBoxSubTitle}>
          Sign up to receive exclusive deals and offers
        </div>
      </div>

      <div className={styles.SubscribeBoxInputContainer}>
        <input className={styles.SubscribeInputBox}
          value={email}
          placeholder="Email address"
          onChange={e=>{
            e.preventDefault();
            setEmail(e.target.value);
          }}
        />
        <button className={styles.SubscribeButton}>Subscribe</button>

      </div>
    </div>
  )
}