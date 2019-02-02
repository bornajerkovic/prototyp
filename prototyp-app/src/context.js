import React, { Component } from 'react';
import {allItems, detailItem} from "./store/Items";

const ProductContext = new React.createContext();

class ProductProvider extends Component{
    state = {
        items: [],
        detailItem: detailItem,
        cart: []
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
    setItems = () => {
        let newItems = [];
        allItems.forEach(item => {
            const singleItem = {...item};
            newItems = [...newItems, singleItem];
        });
        let loadedCart = JSON.parse(localStorage.getItem("cart"));
        this.state.cart = loadedCart;

        if(loadedCart != null){
            loadedCart.forEach(item => {
                const single = {...item};
                const toUp = newItems.find(item => item.name === single.name);
                toUp.inCart = true;
            });
        }
        
        this.setState(() =>{
            return {items:newItems};
        });
    }
    addItem = (id, name, category, price, incart, info) => {
        let currentItems = [...this.state.items];
        console.log(currentItems);
        const itemToAdd = {
            id: 22,
            name: name,
            category: category,
            price: price,
            incart: false,
            info: info
        }

        currentItems.push(itemToAdd);
        this.setState(() =>{
            return {items: currentItems}
        })

        console.log(currentItems);
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
        removedItem.inCart = false;

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
                addItem: this.addItem
            }}>
                
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};