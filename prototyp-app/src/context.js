import React, { Component } from 'react';
import {allItems, detailItem} from "./store/Items";

const ProductContext = new React.createContext();

class ProductProvider extends Component{
    state = {
        items: [],
        detailItem: detailItem
    }
    componentDidMount(){
        this.setItems();
        console.log(this.state.detailItem);
    }
    setItems = () => {
        let newItems = [];
        allItems.forEach(item => {
            const singleItem = {...item};
            newItems = [...newItems, singleItem];
        });

        this.setState(() =>{
            return {items:newItems};
        });
    }
    getItem = id => {
        //const it = this.state.items.find(item => item.id === id);
        //return it;

        var x;
        for(x=0; x<this.state.items.length; x++){
            if(this.state.items[x].id === id){
                //console.log(this.state.items[x]);
            }
        }
    }
    handleDetail = id => {
        const hg = this.getItem(id);
        
        //this.setState(() => {
            //return {detailItem:item}
        //});
        //console.log(item.name);
    }
    addToCart = id => {
        console.log("id is" + id);
    }
    render(){
        return(
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart
            }}>
                
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};