import React, { Component } from 'react';
import {allItems, detailItem} from "./store/Items";

const ProductContext = new React.createContext();

class ProductProvider extends Component{
    state = {
        items: [],
        detailItem: detailItem,
        cart: [],
        addedItems: [],
        categories: [],
        allitems: []
    }
    componentDidMount(){
        this.setItems();
    }
    loadCart = () => {
        let loadedCart = JSON.parse(localStorage.getItem("cart"));
        this.state.cart = loadedCart;
        let updatedProducts = [];
        
        loadedCart.forEach(item => {
            const single = {...item};
            updatedProducts = [...updatedProducts, single];
        });
    }
    removeDupicated = (arr) => {
        let unique = {};
        arr.forEach(function(i) {
            if(!unique[i]) {
            unique[i] = true;
            }
        });
        return Object.keys(unique);
    }
    setItems = () => {
        let newItems = [];
        allItems.forEach(item => {
            const singleItem = {...item};
            newItems = [...newItems, singleItem];
        });
        

        let loadedCart = JSON.parse(localStorage.getItem("cart"));
        this.state.addedItems = JSON.parse(localStorage.getItem("addedItems"));

        
        let addedItemsLocal = JSON.parse(localStorage.getItem("addedItems"));
        if(addedItemsLocal != null){
            newItems = [...newItems, addedItemsLocal];
        }
        else{
            console.log("no added items in local storage");
        }

        let categoriesDisplay = [];
        let cleanCategories = [];

        newItems.forEach(item => {
            categoriesDisplay = [...categoriesDisplay, item.category];
        });

        cleanCategories = this.removeDupicated(categoriesDisplay);

        let finalCategories = [];
        cleanCategories.forEach(item => {
            const finalCategoryItem = {
                id: Math.random(),
                name: item
            }
            finalCategories = [...finalCategories, finalCategoryItem];
        });
        this.state.categories = finalCategories;
        this.state.allitems = newItems;
        this.setState(() =>{
            return {items:newItems};
        });
        //console.log([...this.state.categories]);
        

        if(loadedCart != null){
            loadedCart.forEach(item => {
                if(item !== undefined){
                    const single = {...item};
                    const toUp = newItems.find(item => item.name === single.name);
                    if(toUp != undefined){
                        toUp.inCart = true;
                    }
                }
            });
            this.state.cart = loadedCart;
        }

    }
    filterItems = (category) => {
        this.setItems();
        let tempItems = [...this.state.allitems];
        let filteredItems = [];

        tempItems.forEach(item => {
            const filter={...item};
            if(filter.category === category){
                filteredItems = [...filteredItems, filter];
            }
        });

        this.setState(() => {
            return {items: filteredItems};
        })
       

    }
    addItem = (id, name, category, price, incart, info) => {
        let currentItems = [...this.state.items];

        const itemToAdd = {
            id: id,
            name: name,
            category: category,
            price: price,
            incart: false,
            info: info
        }
        
        let savedItems = JSON.parse(localStorage.getItem("addedItems"));
        let nesto = [];
        if(savedItems != null || savedItems != undefined){
            savedItems = itemToAdd;
        }
        
        localStorage.setItem("addedItems", JSON.stringify(savedItems));
        currentItems = [...currentItems, savedItems];

        this.setState(() =>{
            return {items: currentItems}
        })
        const categoryUpdate = {
            id: Math.random(),
            name: itemToAdd.category
        }
           
        let allCategories = [...this.state.categories];
        allCategories = [...allCategories, categoryUpdate];

        this.state.categories = allCategories;

        

        console.log([...this.state.items]);
    }
    getItem = id => {
        const it = this.state.items.find(item => item.id === id);
        return it;
    }
    removeItem = id => {
        let tempCart = [...this.state.cart];
        let tempItems = [...this.state.items];

        tempCart = tempCart.filter(item => item.id !== id);

        const removedItem = tempItems.find(item => item.id === id);
        if(removedItem != undefined){
            removedItem.inCart = false;
        }
        else{
            
        }
        localStorage.setItem("cart", JSON.stringify(tempCart));
        this.setState(() => {
            return{items: tempItems, cart:tempCart}
        });

        
    }
    handleDetail = (id) => {
        const hg = this.getItem(id);
        this.setState(() => {
            return {detailItem:hg}
        });
    }
    addToCart = id => {
        let tempProduct = [...this.state.items];
        const index = tempProduct.indexOf(this.getItem(id));
        const product = tempProduct[index];
        product.inCart = true;
        this.setState(() =>{
            return{items: tempProduct, cart:[...this.state.cart, product]}
        }, ()=>localStorage.setItem("cart", JSON.stringify([...this.state.cart])));
    }
    render(){
        return(
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                removeItem: this.removeItem,
                addItem: this.addItem,
                filterItems: this.filterItems
            }}>
                
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};