import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./Orders.scss";

export const Orders = () => {
  const token = useSelector((store) => store.token);
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (token) {
      axios
        .get("/api/orders/get-orders", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          setOrders(res.data);
        });
    }
  }, [query]);

  useEffect(() => {
    if (token) {
      axios.get("/api/products").then((res) => {
        setProducts(res.data);
      });
    }
  }, []);

  if (!token) {
    return <Redirect to="/auth/sign-up" />;
  } else if (orders.length === 0) {
    return (
      <div className={styles.EmptyOrders}>
        <p>You haven't placed any orders!</p>
      </div>
    );
  } else if (!products) {
    return null;
  } else {
    return (
      <div className={styles.Orders}>
        {orders.map((order, i) => {
          const {
            orderId,
            address,
            phone,
            name,
            paymentReference,
            items,
          } = order;

          const total =
            items &&
            items.reduce((acc, curr) => {
              const { price } = products.filter(
                (item) => item.id === curr.itemCatalogId
              )[0];
              return acc + price * curr.quantity;
            }, 0);

          return (
            <div key={i} className={styles.Order}>
              <p className={styles.orderDetailText}>Order number: {orderId}</p>
              <div className={styles.OrderDetail}>
                <div className={styles.customerDetail}>
                  <p className={styles.orderDetailText}>Name: {name}</p>
                  <p className={styles.orderDetailText}>Address: {address}</p>
                  <p className={styles.orderDetailText}>Phone: {phone}</p>
                </div>
                <div className={styles.orderDetailPrice}>
                  <p className={styles.orderDetailText}>Total: {total}$</p>
                  <p className={styles.orderDetailText}>
                    Hst (13%): {Math.round(total * 0.13 * 100) / 100}$
                  </p>
                  <p className={styles.Subtotal}>
                    Subtotal: {Math.round(total * 1.13 * 100) / 100}$
                  </p>
                </div>
              </div>

              <div className={styles.OrderedItems}>
                {items.map((item, i) => {
                  const {
                    itemId,
                    itemCatalogId,
                    quantity,
                    sugar,
                    ice,
                    tapioca,
                    pudding,
                    grassjelly,
                  } = item;

                  const { name, price } = products.filter(
                    (product) => product.id === item.itemCatalogId
                  )[0];
                  return (
                    <div key={i} className={styles.Item}>
                      <p className={styles.ItemName}>Item: {name}</p>
                      <p className={styles.ItemQuantity}>Qty: {quantity}</p>
                      <p className={styles.ItemPrice}>Price: {price}$</p>
                      <p className={styles.Sugar}>Sugar: {sugar}%</p>
                      <p className={styles.Ice}>Ice: {ice}%</p>
                      <p className={styles.Tapioca}>
                        {tapioca === 1 ? "+ tapioca" : ""}
                      </p>
                      <p className={styles.Pudding}>
                        {pudding === 1 ? "+ pudding" : ""}
                      </p>
                      <p className={styles.Grassjelly}>
                        {grassjelly === 1 ? "+ grassjelly" : ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
