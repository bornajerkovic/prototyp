import React, { Component } from 'react';
import fire from "../src/auth/fire";
import {Link} from "react-router-dom";
import Product from "../src/Product";
import {ProductConsumer} from "../src/context";
import CategoryItem from "../src/CategoryItem"
import Header from "../src/Header";

class Listing extends Component{
   render(){
        return(
            <div>
                <Header></Header>
                <h1>All Items</h1>
                <div>
                    <ProductConsumer>
                        {value=>{
                            return value.allitems.map(items =>{
                                return <Product key={items.id} items={items}/>
                            });
                        }}
                    </ProductConsumer>
                </div>
                
            </div>
        )
   }
}

export default Listing;