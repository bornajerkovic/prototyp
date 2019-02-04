import React, { Component } from 'react';
import fire from "../src/auth/fire";
import {Link} from "react-router-dom";
import {ProductConsumer} from "../src/context";
import Header from "../src/Header"

class Product extends Component{
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

                    
                    <button className="add--button" disabled={inCart ? true: false} onClick={() => value.addToCart(id)}>
                        {inCart?(<p>Item in Cart</p>):(<p>Add to Cart</p>)}
                    </button>

                    <Link to="/details"><button className="details--button" onClick={() =>value.handleDetail(id)}><p>Details</p></button></Link>
            </div>)}
            
           </ProductConsumer>
       )
   }
}

export default Product;