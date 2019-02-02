import React, { Component } from 'react';
import fire from "../src/auth/fire";
import {Link} from "react-router-dom";
import Product from "../src/Product";
import {ProductConsumer} from "../src/context";

class ProductList extends Component{
   render(){
        return(
            <div>
                <ProductConsumer>
                    {value=>{
                        return value.items.map(items =>{
                            return <Product key={items.id} items={items}/>
                        });
                    }}
                </ProductConsumer>
            </div>
        )
   }
}

export default ProductList;