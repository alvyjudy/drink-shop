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



