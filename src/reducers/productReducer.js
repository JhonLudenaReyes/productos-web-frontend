import {
  CHANGE_STATE,
  LIST_PRODUCTS,
  SAVE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCT,
  RESET_STORE,
  EDIT_PRODUCT,
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  verification: false,
  products: [],
  product: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case SAVE_PRODUCT:
      return {
        ...state,
        verification: !isEmpty(action.payload),
      };
    case CHANGE_STATE:
      return {
        ...CHANGE_STATE,
        verification: action.payload,
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        verification: !isEmpty(action.payload),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        verification: !isEmpty(action.payload),
      };
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case RESET_STORE:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
