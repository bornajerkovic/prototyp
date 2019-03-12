export const incremenet = item => {
  return {
    type: "INCREMENT",
    payload: item
  };
};

export const decrement = item => {
  return {
    type: "DECREMENT",
    payload: item
  };
};

export const removeCartItem = item => {
  //console.log("removed " + item.name);
  return {
    type: "REMOVE_CART_ITEM",
    payload: item
  };
};
export const showDetails = item => {
  console.log("selected: " + item.name);
  return {
    type: "ITEM_SELECTED",
    payload: item
  };
};
