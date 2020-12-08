import {createStore} from "redux";

import {
  SET_TOKEN,
  RM_TOKEN
} from "./actions";

const reducer = (state={token:""}, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {token: action.token}
    case RM_TOKEN:
      return {token: ""}
    default:
      return state

  }
}

export const store = createStore(reducer);

