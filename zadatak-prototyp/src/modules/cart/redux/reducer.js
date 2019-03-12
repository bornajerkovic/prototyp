export default function(state = [], action) {
  switch (action.type) {
    case "ADD_TO_CART":
      localStorage.setItem("cart", JSON.stringify([...state, action.payload]));
      return [...state, action.payload];

    case "REMOVE_CART_ITEM":
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify([...state]));
      return [...state];

    case "INCREMENT":
      localStorage.setItem("cart", JSON.stringify([...state]));
      return [...state];

    case "DECREMENT":
      localStorage.setItem("cart", JSON.stringify([...state]));
      return [...state];

    default:
      const loadedItems = JSON.parse(localStorage.getItem("cart"));
      if (loadedItems) {
        if (state.length !== loadedItems.length) {
          loadedItems.forEach(item => {
            state = [...state, item];
            localStorage.setItem("cart", JSON.stringify([...state]));
            return state;
          });
        }
      }
      return state;
  }
}
