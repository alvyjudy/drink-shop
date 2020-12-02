import React, {useEffect, useState} from "react";
import axios from "axios";

export const ProductsView = (props) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    return axios.get("/api/products")
      .then(res=>{
        setLoading(false);
        setProducts(res.data);
      })
      .catch(e=>{console.log('error')})
  },[])

  return (
    <div>
      {loading && <div>loading</div> }
      {!loading && <div>{
        products.map(item=>{
          return (
            <div key={item.id}>
              <p>name: {item.name}</p>
              <p>id: {item.id}</p>
              <p>price: {item.price}$</p>
            </div>
          )
        })
      }</div>}
    </div>
  )
}