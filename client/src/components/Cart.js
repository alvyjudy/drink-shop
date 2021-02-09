import React, {useState, useEffect} from "react";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {Link, useHistory, Redirect} from "react-router-dom";

import styles from "./Cart.scss";



export const Cart = () => {
  const history = useHistory();
  const token = useSelector(store=>store.token);
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState();
  const [query, setQuery] = useState(true);

  const modifyItem = ({itemId, quantity, sugar, ice, tapioca, pudding, grassjelly}) => {
    return axios.put("/api/cart/modify-item", {
      itemId,
      quantity,
      sugar,
      ice,
      tapioca,
      pudding,
      grassjelly,
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+token
      }
    }).then(e=>{
      if (e.status === 200) {
        setQuery(!query)
      }
    }).catch(e=>{console.log(e)})
  }
  
  useEffect(()=>{
    if (token) {
      axios.get("/api/products")
      .then(res=>{
        setProducts(res.data)
      })
    }

  }, [])

  useEffect(()=>{
    if (token) {
      axios.get("/api/cart/get-items", {
        headers:{"Authorization":"Bearer "+token}
      }).then(res=>{
        if (res.status === 200) {
          setItems(res.data) //[{itemId, itemCatalogId, quantity, sugar, ice, tapioca, pudding, grassjelly}, ...] .
        } else {throw Error}
      }).catch(e=>{
        console.log(e)
      })
    }
  }, [query])

  const total = items.length !== 0 && items.reduce((acc, curr)=>{
    const {price} = products.filter(item=> item.id === curr.itemCatalogId)[0]
    return acc + price*curr.quantity
  }, 0)

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();


  if (!token) {
    return <Redirect to="/auth/sign-up"/>
  } else if (items.length === 0) {
    return (
      <div className={styles.EmptyCart}>
        <p className={styles.EmptyCartText}>Your cart is empty!</p>
      </div>
    )
  } else {
    return (
      <div className={styles.Cart}>
        {items.map((item, i)=>{
          const {itemId,
            itemCatalogId,
            quantity,
            sugar,
            ice,
            tapioca,
            pudding,
            grassjelly} = item;

        
          const {thumbnail, name, price} = products.filter(each=>{
            return each.id === itemCatalogId
          })[0]

          return (
            <div key={i} className={styles.CartItem}>
              <img src={"/assets/"+thumbnail} 
                className={styles.CartItemPic}/>
              <p className={styles.ProductName}>{name}</p>
              <p className={styles.ProductPrice}>${price}</p>

              <div className={styles.ProductQuantityContainer}>
                <p className={styles.ProductQuantity}>Qty: {quantity}</p>
                <button className={styles.AddButton}
                  onClick={e=>{
                    e.preventDefault();
                    modifyItem({
                      itemId,
                      quantity: quantity + 1,
                      sugar,
                      ice,
                      tapioca,
                      pudding,
                      grassjelly,
                    })
                  }}
                >+</button>
                <button className={styles.MinusButton}
                  onClick={e=>{
                    e.preventDefault();
                    modifyItem({
                      itemId,
                      quantity: Math.max(1, quantity - 1),
                      sugar,
                      ice,
                      tapioca,
                      pudding,
                      grassjelly,
                    })
                  }}
                >-</button>
              </div>

              <button className={styles.RemoveButton}
                onClick={e=>{
                  e.preventDefault();
                  axios.delete("/api/cart/remove-item", {
                    headers:{
                      "Content-Type":"application/json",
                      "Authorization":"Bearer "+token
                    },
                    data: {itemId}
                  }).then(e=>{
                    if (e.status === 200) {
                      setQuery(!query)
                    } else {throw Error("error")}
                  }).catch(e=>{console.log(e)})
                }}
              >delete</button>

              <div className={styles.Options}>
                <div className={styles.Option}>
                  <p className={styles.OptionName}>Sugar</p>
                  <div className={styles.Amount}>{sugar}%</div>
                  <button className={styles.Add}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar: Math.min(sugar + 20, 100),
                        ice,
                        tapioca,
                        pudding,
                        grassjelly,
                      })
                    }}
                  >+</button>
                  <button className={styles.Minus}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar: Math.max(sugar - 20, 0),
                        ice,
                        tapioca,
                        pudding,
                        grassjelly,
                      })
                    }}
                  >-</button>
                </div>
                

                <div className={styles.Option}>
                  <p className={styles.OptionName}>Ice</p>
                  <div className={styles.Amount}>{ice}%</div>
                  <button className={styles.Add}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice: Math.min(ice + 20, 100),
                        tapioca,
                        pudding,
                        grassjelly,
                      })
                    }}
                  >+</button>
                  <button className={styles.Minus}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice: Math.max(ice - 20, 0),
                        tapioca,
                        pudding,
                        grassjelly,
                      })
                    }}
                  >-</button>
                </div>

                <div className={styles.Option}>
                  <p className={styles.OptionName}>Tapioca</p>
                  <div className={styles.Amount}>{tapioca}</div>
                  <button className={styles.Add}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice,
                        tapioca: Math.min(tapioca + 1, 1),
                        pudding,
                        grassjelly,
                      })
                    }}
                  >+</button>
                  <button className={styles.Minus}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice,
                        tapioca: Math.max(tapioca - 1, 0),
                        pudding,
                        grassjelly,
                      })
                    }}
                  >-</button>
                </div>

                <div className={styles.Option}>
                  <p className={styles.OptionName}>Pudding</p>
                  <div className={styles.Amount}>{pudding}</div>
                  <button className={styles.Add}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice,
                        tapioca,
                        pudding: Math.min(pudding + 1, 1),
                        grassjelly,
                      })
                    }}
                  >+</button>
                  <button className={styles.Minus}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice,
                        tapioca,
                        pudding: Math.max(pudding - 1, 0),
                        grassjelly,
                      })
                    }}
                  >-</button>
                </div>

                <div className={styles.Option}>
                  <p className={styles.OptionName}>Grassjelly</p>
                  <div className={styles.Amount}>{grassjelly}</div>
                  <button className={styles.Add}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice,
                        tapioca,
                        pudding,
                        grassjelly: Math.min(grassjelly + 1, 1),
                      })
                    }}
                  >+</button>
                  <button className={styles.Minus}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice,
                        tapioca,
                        pudding,
                        grassjelly: Math.max(grassjelly - 1, 0),
                      })
                    }}
                  >-</button>
                </div>
              </div>

       
            </div> 
          )})} 

          <form className={styles.CheckOutBox}
            onSubmit={e=>{
              e.preventDefault();
              axios.post("/api/orders/place-order", {
                address,
                phone,
                name
              }, {
                headers: {
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+token
                }
              }).then(res=>{
                history.push("/orders");
              }).catch(e=>{
                console.log("Error in checkout button", e);
              })
            }}
          >

            <input className={styles.OrderName} 
              required
              placeholder="Name"
              onChange={e=>{
                e.preventDefault();
                setName(e.target.value);
              }}
            />

            <input className={styles.OrderAddress}
              required
              placeholder="Address"
              onChange={e=>{
                e.preventDefault();
                setAddress(e.target.value);
            }}/>

            <input className={styles.OrderPhone}
              required
              type="text"
              placeholder="Phone number"
              onChange={e=>{
                e.preventDefault();
                setPhone(e.target.value);
              }}
            />
            <p className={styles.Total}>Total: {total}$</p>   
            <p className={styles.Hst}>HST(13%) {Math.round(total * 0.13 * 100)/100}$</p>
            <p className={styles.Subtotal}>Subtotal: {Math.round(total * 1.13*100)/100}$</p>
            <button className={styles.CheckOutButton}
            >Place your order</button>
          </form>
          
      </div>
    )
  }

  
}

