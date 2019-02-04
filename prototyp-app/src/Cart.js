import React, { Component } from 'react';
import fire from "../src/auth/fire";
import {Link} from "react-router-dom";
import Product from "../src/Product";
import CartItem from "../src/CartItem";
import Header from "../src/Header"
import {ProductConsumer} from "../src/context";

class Cart extends Component{
   render(){
        
        return(
            <div>
                <Header />
                <div className="cart--container"> 
                <div className="container--display--products">
                    <ProductConsumer>
                            {value=>{
                                const {cart} = value;
                                if(cart != undefined){
                                    return value.cart.map(items =>{
                                        return <CartItem key={items.id} items={items}/>
                                    });
                                }
                                else{
                                    return(
                                        <h1>Cart is empty</h1>
                                    )
                                }
                            }}
                        </ProductConsumer>
                </div>
                   
                </div>
            </div>
            
        )
   }
}

export default Cart;