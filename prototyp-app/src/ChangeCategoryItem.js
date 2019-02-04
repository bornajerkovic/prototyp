import React, { Component } from 'react';
import fire from "../src/auth/fire";
import {Link} from "react-router-dom";
import {ProductConsumer} from "../src/context";

class ChangeCategoryItem extends Component{
   render(){
       const {id, name, price, category, inCart} = this.props.items;
       var updateCategory;
       function prevent(event) {
        event.preventDefault();
       }
       function clicked(){
           const newCategory = document.getElementById(id + name).value;
           updateCategory = newCategory;
           document.getElementById(id+name+category).click();
           alert("Category is updated");
       }
       return(
           <ProductConsumer>
               {(value) => (<div className="container--item" id={id}>
                   <form onSubmit={prevent}>
                    <h4 className="inline">{name}</h4>
                    <h4 className="inline">Category : {category}</h4>
                    <input id={id + name} className="inline--textbox" type="text" placeholder="new category"></input>
                    <button className="inline--button" onClick={clicked}>Submit</button>
                    <button className="inline--button" onClick={() => value.remove(id)}>Remove</button>
                    <button id={id+name+category} className="hidden--button" onClick={() => value.changeCategory(id, updateCategory)}></button>
                   </form>
            </div>)}
            
           </ProductConsumer>
       )
   }
}

export default ChangeCategoryItem;