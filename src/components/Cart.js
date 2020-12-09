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
          const [id, count] = item;
          const product = products.filter(each=>{
            return each.id === item[0]
          })[0]
          return (
            <div key={i} className={styles.CartItem}>
              <img src={"/assets/"+product.thumbnail} 
                className={styles.CartItemPic}/>
              <p className={styles.ProductName}>{product.name}</p>
              <p className={styles.ProductPrice}>${product.price}</p>

              <div className={styles.ProductQuantityContainer}>
                <p className={styles.ProductQuantity}>Qty: {count}</p>
                <button className={styles.AddButton}
                  onClick={e=>{
                    e.preventDefault();
                    axios.post("/api/cart/add-minus-item", [id, 1],{
                      headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+token
                      }
                    }).then(e=>{
                      if (e.status === 200) {
                        const newItems = new Map(items);
                        const oldvalue = newItems.get(id);
                        newItems.set(id, oldvalue + 1)
                        setItems(Array.from(newItems));
                      } else {throw Error("error")}                      
                    }).catch(e=>{console.log(e)})
                  }}
                >+</button>
                <button className={styles.MinusButton}
                  onClick={e=>{
                    e.preventDefault();
                    axios.post("/api/cart/add-minus-item", [id, -1],{
                      headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+token
                      }
                    }).then(e=>{
                      if (e.status === 200) {
                        const newItems = new Map(items);
                        const oldvalue = newItems.get(id);
                        newItems.set(id, Math.max(1, oldvalue - 1));
                        setItems(Array.from(newItems));
                      } else {throw Error("error")}                      
                    }).catch(e=>{console.log(e)})
                  }}
                >-</button>
              </div>

              <button className={styles.RemoveButton}
                onClick={e=>{
                  e.preventDefault();
                  axios.post("/api/cart/remove-item", [id], {
                    headers:{
                      "Content-Type":"application/json",
                      "Authorization":"Bearer "+token
                    }
                  }).then(e=>{
                    if (e.status === 200) {
                      const newItems = new Map(items);
                      newItems.delete(id);
                      setItems(Array.from(newItems));
                    } else {throw Error("error")}
                  }).catch(e=>{console.log(e)})
                }}
              >delete</button>
       
            </div> 
          )})} 
      </div>
    )
  }

  
}

