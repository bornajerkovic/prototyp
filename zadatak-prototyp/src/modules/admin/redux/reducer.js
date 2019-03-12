import ALL_ITEMS from "../../../res/item-list.js";

function setCategories() {
  if (!JSON.parse(localStorage.getItem("categories"))) {
    let categories = [];
    ALL_ITEMS.map(item => {
      categories = [...categories, item.category];
    });

    categories = Array.from(new Set(categories));
    localStorage.setItem("categories", JSON.stringify(categories));
  }
}

export default function(state = ALL_ITEMS, action) {
  switch (action.type) {
    case "REMOVE_ITEM":
      state = state.filter(item => item.name !== action.payload);
      return state;

    case "ADD_ITEM":
      if (!state.find(item => item.id === action.payload.id)) {
        state = [...state, action.payload];
        return state;
      }

    case "CHANGE_CATEGORY":
      const itemToFind = state.find(item => item === action.payload.item);
      itemToFind.category = action.payload.newCategory;
      return state;

    case "ADD_CATEGORY":
      if (
        !JSON.parse(localStorage.getItem("categories")).find(
          item => item === action.payload
        )
      ) {
        let newCategories = [
          ...JSON.parse(localStorage.getItem("categories")),
          action.payload
        ];
        localStorage.setItem("categories", JSON.stringify(newCategories));
      }

    default:
      setCategories();
      return state;
  }
}
