import React, {useState} from "react";

import styles from "./Home.css";

export const Home = () => {
  return <div className={styles.Home}>
    <Gallery/>
    
  </div>
}

const Gallery = () => {
  const pics = ["home-1.jpg", "home-2.jpg", "home-3.jpg"];
  const [pic, setPic] = useState(pics[0]);
  
  return (
    <div className={styles.PicsContainer}>
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
      <button className={styles.ShopNow}>Shop Now</button>
    </div>
  )
}