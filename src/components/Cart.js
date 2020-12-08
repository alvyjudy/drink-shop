import React, {useState, useEffect} from "react";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";

import styles from "./Cart.css";
import {loadItems} from "../redux/actions";

export const Cart = () => {
  const dispatch = useDispatch();
  const token = useSelector(store=>store.token);
  const items = useSelector(store=>store.cartItems);
  const [products, setProducts] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

 
  useEffect(()=>{
    axios.get("/api/products")
      .then(res=>{
        setProducts(res.data)
      })
  }, [])

  useEffect(()=>{
    axios.get("/api/cart/get-items", {
      headers:{"Authorization":"Bearer "+token}
    }).then(res=>{
     
      if (res.status === 200) {
        
        setLoggedIn(true);
        dispatch(loadItems(res.data));
      }
    }).catch(e=>{
      console.log("User not logged in.", e)
      
    })
  })

  if (!loggedIn) {
    return <p>Log in or sign up to add items</p>
  } else if (!products || !items) {
    return <div>Loading</div> 
  } else {
    
    return (
      <div className={styles.Cart}>
        {items.map((item, i)=>{
          return (
            <div className={styles.CartItem}>
              <img src={"/assets/"+products[item[0]].thumbnail} 
                className={styles.CartItemPic}/>
              <p className={styles.ProductName}>{products[item[0]].name}</p>
              <p className={styles.ProductPrice}>{products[item[0]].price}</p>

              <p className={styles.ProductQuantity}>{item.quantity}</p>
              <button className={styles.AddButton}>+</button>
              <button className={styles.MinusButton}>-</button>
       
            </div> 
          )})} 
      </div>
    )
  }

  
}

