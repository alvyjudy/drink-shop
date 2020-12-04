import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import styles from "./ProductsView.css";

export const ProductsView = (props) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    return axios.get("/api/products")
      .then(res=>{
        setLoading(false);
        setProducts(res.data);
      })
      .catch(e=>{console.log('error in ajax request ProductsView')})
  },[])

  return (
    <div>
      {loading && <div>loading</div> }
      {!loading && <div className={styles.ProductsView}>{
        products.map(item=>{
          return (
            <div key={item.id} className={styles.ProductThumbnail}>
              <Link to={"/product/" + item.id} className={styles.Img}></Link>
              <p className={styles.Name}>{item.name}</p>
              <p className={styles.Price}>${item.price}</p>
            </div>
          )
        })
      }</div>}
    </div>
  )
}