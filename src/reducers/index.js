import { combineReducers } from "redux";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
  product: productReducer,
  category: categoryReducer,
});
