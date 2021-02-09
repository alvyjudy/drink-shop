import React, {useState} from "react";

import styles from "./ImgLoading.scss";

export const ImgLoading = ({src, alt, fill}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <React.Fragment>
      <div className={loaded ? styles.HideSpinner : styles.ShowSpinner } />
      <img className={
        !loaded ? styles.HideImg : fill === "X" ? styles.ShowImgFillX : styles.ShowImgFillY
      }
        src={src}
        alt={alt}
        onLoad={()=>{setLoaded(true)}}
      />
    </React.Fragment>
  )
}