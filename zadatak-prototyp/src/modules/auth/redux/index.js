import { combineReducers } from "redux";
import itemList from "./item-list-reducer";
import detailItem from "./item-details-reducer";
import cartItems from "./cart-reducer";

const allReducers = combineReducers({
    items: itemList,
    allItems: itemList,
    cart: cartItems,
    details: detailItem
});

export default allReducers;