export const SET_TOKEN = "SET_TOKEN";
export const RM_TOKEN = "RM_TOKEN";

export const setToken = (token) => {
  return {type: SET_TOKEN, token}
}

export const rmToken = (token) => {
  return {type: RM_TOKEN, token}
}