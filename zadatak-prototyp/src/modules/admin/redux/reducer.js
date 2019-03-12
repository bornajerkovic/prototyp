export default function(state = [], action) {
  switch (action.type) {
    case "REMOVE_ITEM":
      let loadItems = JSON.parse(localStorage.getItem("all"));
      ALL_ITEMS = loadItems;
      ALL_ITEMS = ALL_ITEMS.filter(item => item.name !== action.payload);
      localStorage.setItem("all", JSON.stringify(ALL_ITEMS));
      return ALL_ITEMS;

    case "ADD_ITEM":
      if (ALL_ITEMS.find(item => item.id === action.payload.id)) {
      } else {
        ALL_ITEMS = [...ALL_ITEMS, action.payload];
        localStorage.setItem("all", JSON.stringify(ALL_ITEMS));
        return ALL_ITEMS;
      }

    case "CHANGE_CATEGORY":
      const itemToFind = ALL_ITEMS.find(
        item => item.name === action.payload.name
      );
      itemToFind.category = action.payload.newCategory;
      localStorage.setItem("all", JSON.stringify(ALL_ITEMS));
      return ALL_ITEMS;

    case "ADD_CATEGORY":
      const newCategory = action.payload;
      const allCategories = JSON.parse(localStorage.getItem("categories"));
      if (!allCategories.find(item => item === newCategory)) {
        let cleanItem = [];
        cleanItem = allCategories;
        cleanItem = [...cleanItem, newCategory];
        localStorage.setItem("categories", JSON.stringify(cleanItem));
      }
    default:
      return ALL_ITEMS;
  }
}
