import React, { Component } from 'react';
import fire from "../src/auth/fire";
import {Link} from "react-router-dom";
import {ProductConsumer} from "../src/context";

class Details extends Component{
    
   render(){
       return(
          <ProductConsumer>
              {
                  (value) => {
                      const {id, name, price, category, info, inCart} = value.detailItem;
                      return(
                        <div>
                            <h1 className="detail--title">{name}</h1>
                            <div>
                                <p className="price">{price}</p>
                                <p className="detail--title"><strong>About Product</strong></p>
                                <p className="info">{info}</p>

                                <div className="container--back--buttons">
                                    <Link to="/"><button><p>Back to Home</p></button></Link>
                                    <button disabled={inCart?true:false} onClick={() => value.addToCart(id)}>
                                        {inCart?(<p>Item aready in Cart</p>):(<p>Add Item to Cart</p>)}
                                    </button>
                                </div>
                            </div>
                        </div>
                      )
                  }
              }
          </ProductConsumer>
       )
   }
}

export default Details;