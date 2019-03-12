import { combineReducers } from "redux";
import adminReducer from "./admin/redux/reducer.js";
import cartReducer from "./cart/redux/reducer.js";

const allReducers = combineReducers({
  items: adminReducer,
  cart: cartReducer
});

export default allReducers;
