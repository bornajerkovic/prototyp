export const addToCart = (user) => {
    return {
        type: 'ADD_TO_CART',
        payload: user
    }
}

export const addItem = (item) => {
    console.log("adding");
    return {
        type: 'ADD_ITEM',
        payload: item
    }
}
export const removeItem = (user) => {
    return {
        type: 'REMOVE_ITEM',
        payload: user
    }
}
export const showDetails = (item) => {
    console.log("selected: " + item.name);
    return {
        type: 'ITEM_SELECTED',
        payload: item
    }
}
export const priceFilter = (value) => {
    return {
        type: 'FILTER_PRICE',
        payload: value
    }
}

export const incremenet = (item) => {
    return {
        type: 'INCREMENT',
        payload: item
    }
}

export const decrement = (item) => {
    return {
        type: 'DECREMENT',
        payload: item
    }
}

export const filterCategory = (name) => {
    console.log(name);
    return {
        type: 'CATEGORY_FILTER',
        payload: name
    }
}

export const removeCartItem = (item) => {
    //console.log("removed " + item.name);
    return {
        type: 'REMOVE_CART_ITEM',
        payload: item
    }
}

export const changeCategory = (item) => {
    return {
        type: 'CHANGE_CATEGORY',
        payload: item
    }
}

export const addCategory = (category) => {
    return {
        type: 'ADD_CATEGORY',
        payload: category
    }
}