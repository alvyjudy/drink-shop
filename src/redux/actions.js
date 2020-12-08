import axios from "axios";

export const SET_TOKEN = "SET_TOKEN";
export const RM_TOKEN = "RM_TOKEN";
export const ADD_MINUS_ITEM = "ADD_MINUS_ITEM";

export const setToken = (token) => {
  return {type: SET_TOKEN, token}
}

export const rmToken = (token) => {
  return {type: RM_TOKEN, token}
}

// export const loadItems = (token) => (dispatch) => {
//   axios.get("/api/cart/get-items", {
//     headers:{"Authorization":"Bearer "+token}
//   }).then(res=>{
//     dispatch({type: ADD_MINUS_ITEM, cartItems:res.data})
//   })
  
// }

// export const addMinusItem = (id, quantity, token) => (dispatch) => {
//   axios.post("/api/cart/add-minus-item",[id, quantity], {
//     headers:{
//       "Content-Type":"application/json",
//       "Authorization":"Bearer " + token
//     }
//   }).then(res=>{
//     if (res.status === 200) {
//       dispatch({type:ADD_MINUS_ITEM, cartItems:res.data})
//     } else {throw Error("Error")}
//   }).catch(e=>{
//     console.log(e)
//   })


