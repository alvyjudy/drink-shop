import React, {useState, useEffect} from "react";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";

import styles from "./Cart.css";

export const Cart = () => {
  const dispatch = useDispatch();
  const token = useSelector(store=>store.token);
  const [items, setItems] = useState();
  const [products, setProducts] = useState();

  
  useEffect(()=>{
    axios.get("/api/products")
      .then(res=>{
        setProducts(res.data)
      })
  }, [])

  useEffect(()=>{
    if (token) {
      axios.get("/api/cart/get-items", {
        headers:{"Authorization":"Bearer "+token}
      }).then(res=>{
        if (res.status === 200) {
          setItems(res.data)
        } else {throw Error}
      }).catch(e=>{
        console.log(e)
      })
    }
  }, [])

  if (!token) {
    return <p>Log in or sign up to add items</p>
  } else if (!products || !items) {
    return <div>Loading</div> 
  } else {
    return (
      <div className={styles.Cart}>
        {items.map((item, i)=>{
          const product = products.filter(each=>{
            return each.id === item[0]
          })[0]
          return (
            <div key={i} className={styles.CartItem}>
              <img src={"/assets/"+product.thumbnail} 
                className={styles.CartItemPic}/>
              <p className={styles.ProductName}>{product.name}</p>
              <p className={styles.ProductPrice}>{product.price}</p>

              <p className={styles.ProductQuantity}>{item.quantity}</p>
              <button className={styles.AddButton}>+</button>
              <button className={styles.MinusButton}>-</button>
       
            </div> 
          )})} 
      </div>
    )
  }

  
}

