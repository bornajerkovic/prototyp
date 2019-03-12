export const incremenet = item => {
  const oldPrice = item.price / item.num;
  item.num++;
  const finalPrice = oldPrice * item.num;
  item.price = finalPrice;
  return {
    type: "INCREMENT",
    payload: item
  };
};

export const decrement = item => {
  const price = item.price / item.num;
  if (item.num !== 1) {
    item.num -= 1;
    const newPrice = price * item.num;
    item.price = newPrice;
    return {
      type: "DECREMENT",
      payload: item
    };
  } else {
    return {
      type: "NONE",
      payload: item
    };
  }
};

export const removeCartItem = item => {
  //console.log("removed " + item.name);
  return {
    type: "REMOVE_CART_ITEM",
    payload: item
  };
};

export const addToCart = item => {
  return {
    type: "ADD_TO_CART",
    payload: item
  };
};
