import React, { Component } from 'react';
import fire from "../src/auth/fire";
import {Link} from "react-router-dom";
import Product from "../src/Product";
import {ProductConsumer} from "../src/context";
import CategoryItem from "../src/CategoryItem"

class ProductList extends Component{
   render(){
        return(
            <div>
                <div className="container--sidebar">
                    <h3>Categories</h3>
                    <ProductConsumer>
                        {value => {
                            
                            return value.categories.map(categories =>{
                                return <CategoryItem key={categories.id} categories={categories}></CategoryItem>
                                //console.log("nesto");
                            });
                        }
                        
                        }
                    </ProductConsumer>
                </div>

                <div className="container--display--products">
                    <ProductConsumer>
                        {value=>{
                            return value.items.map(items =>{
                                return <Product key={items.id} items={items}/>
                            });
                        }}
                    </ProductConsumer>
                </div>
                
            </div>
        )
   }
}

export default ProductList;