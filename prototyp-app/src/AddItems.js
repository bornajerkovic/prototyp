import React, { Component } from 'react';
import fire from "../src/auth/fire";
import {Link} from "react-router-dom";
import {ProductConsumer} from "../src/context";

export default function AddItems({id, name, category, price, incart, info}){
    
    return(
        <ProductConsumer>
            {value => {
                
                const val = value;
               console.log(id, name, category, price, incart, info);
                console.log("nesto");
                
            }}
        </ProductConsumer>
    )
}
