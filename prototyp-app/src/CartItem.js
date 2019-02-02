import React, { Component } from 'react';
import fire from "../src/auth/fire";
import {Link} from "react-router-dom";
import {ProductConsumer} from "../src/context";

class CartItem extends Component{
   render(){
       const {id, name, price, category, inCart} = this.props.items;
     
       return(
           <ProductConsumer>
               {(value) => (<div className="container--item">
                    <div className="container--item-title">
                        <p className="title">{name}</p>
                    </div>

                    <div>
                        <p className="price">{price}</p>
                    </div>

                    
                    <button className="add--button" onClick={() => value.removeItem(id)}>
                        <p>Remove</p>
                    </button>

                    <Link to="/details"><button className="details--button" onClick={() =>value.handleDetail(id)}><p>Details</p></button></Link>
            </div>)}
            
           </ProductConsumer>
       )
   }
}

export default CartItem;