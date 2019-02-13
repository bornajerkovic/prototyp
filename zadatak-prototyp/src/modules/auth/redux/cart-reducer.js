
export default function (state = [], action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            localStorage.setItem("cart", JSON.stringify([...state, action.payload]));
            return [...state, action.payload];

        case 'REMOVE_CART_ITEM':
            const index = state.indexOf(action.payload);
            state.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify([...state]));
            return [...state];

        case 'INCREMENT':
            const oldPrice = action.payload.price / action.payload.num;
            action.payload.num++;
            const finalPrice = oldPrice * action.payload.num;
            action.payload.price = finalPrice;
            console.log(action.payload);
            console.log([...state]);
            localStorage.setItem("cart", JSON.stringify([...state]));
            return [...state];

        case 'DECREMENT':
            const price = action.payload.price / action.payload.num;
            if (action.payload.num !== 1) {
                action.payload.num -= 1;
                const newPrice = price * action.payload.num;
                action.payload.price = newPrice;
                localStorage.setItem("cart", JSON.stringify([...state]));
                return [...state];
            }

    }
    const loadedItems = JSON.parse(localStorage.getItem("cart"));

    if (loadedItems === null || loadedItems === "[]" || loadedItems === "") {

    }
    else {
        if (state.length === loadedItems.length) {

        }
        else {
            loadedItems.forEach(item => {
                state = [...state, item];
                localStorage.setItem("cart", JSON.stringify([...state]));
            });
        }
    }
    return state;
}