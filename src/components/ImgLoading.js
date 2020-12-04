import React, {useState} from "react";

import styles from "./ImgLoading.css";

export const ImgLoading = ({src, alt}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={loaded ? styles.Container : styles.ContainerLoading}>
      <div className={loaded ? styles.HideSpinner : styles.ShowSpinner } />
      <img className={loaded ? styles.ShowImg : styles.HideImg}
        src={src}
        alt={alt}
        onLoad={()=>{setLoaded(true)}}
      />
    </div>
  )
}