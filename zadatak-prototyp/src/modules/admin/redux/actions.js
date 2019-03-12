export const addItem = item => {
  console.log("adding");
  return {
    type: "ADD_ITEM",
    payload: item
  };
};
export const removeItem = user => {
  return {
    type: "REMOVE_ITEM",
    payload: user
  };
};
export const changeCategory = item => {
  return {
    type: "CHANGE_CATEGORY",
    payload: item
  };
};

export const addCategory = category => {
  return {
    type: "ADD_CATEGORY",
    payload: category
  };
};
