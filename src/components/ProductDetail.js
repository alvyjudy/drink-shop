import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

import styles from "./ProductDetail.css";

export const ProductDetail = () => {
  const {id} = useParams();
  
  const [product, setProduct] = useState();

  useEffect(()=>{
    return axios.get("/api/products")
      .then(res=>{
        
        const product = res.data.filter(item=>{
          return item.id.toString() === id
        })[0]
  
        setProduct(product)
      })
  }, [])

  return ( product ? 
    <div className={styles.ProductDetail}>
      <ImageViewer id={product.id} mainPic={product.mainPic} sidePics={product.sidePics}/>
      <Purchase name={product.name} price={product.price}/>
    </div> : <div>loading</div>
  )
  
}

const ImageViewer = ({mainPic, sidePics}) => {
  const [picture, setPicture] = useState();
  return (
    <div className={styles.ImageViewer}>
      <div className={styles.DisplayPicContainer}>
        <img src={"/assets/" + (picture || mainPic)} 
          className={styles.DisplayPic}
        />
      </div>

      <div className={styles.SidePics}>

        <div className={styles.NavThumbContainer}
          onClick={e=>{
            e.preventDefault();
            setPicture(mainPic);
          }}
        >
          <img src={"/assets/" + mainPic} className={styles.NavThumbnail}/>
        </div>

        {sidePics && sidePics.map((item, i)=>{
          return (
            <div key={i} 
              className={styles.NavThumbContainer}
              onClick={e=>{
                e.preventDefault();
                setPicture(item)
              }}>
              <img src={"/assets/" + item}
                className={styles.NavThumbnail}
              />
            </div>
          )
        })}
      </div>
      
    </div>
  )
}

const Purchase = ({name, price}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.Purchase}>
      <p className={styles.Name}>{name}</p>
      <p className={styles.Price}>$ {price}</p>
      
      <div className={styles.AdjustQuantity}>
        <p className={styles.Quantity}>Quantity</p>
        <input className={styles.InputNum}
          value={quantity}
          onChange={e=>{
            e.preventDefault();
            setQuantity(e.target.value);
          }}
        />
        <button className={styles.PlusBut}
          onClick={(e)=>{
            e.preventDefault();
            setQuantity(quantity + 1)
          }}
        >+</button>
        <button className={styles.MinusBut}
          onClick={e=>{
            e.preventDefault();
            setQuantity(quantity === 1 ? 1 : quantity - 1 );
          }}
        >-</button>
      </div>

      <button className={styles.AddToCart}>Add to cart</button>
      <button className={styles.BuyItNow}>Buy it now</button>
      
    </div>
  )
}
