import React, { Component } from 'react';
import allItems from "../store/Items";
import kategorije from "../store/Kategorije";
import cart_items from "../store/Cart";
import ReactDOM from 'react-dom';
import { all } from 'q';

class Home extends Component{
    componentDidMount(){
        var cart_items = [];
        var loadedItems = [];
        loadedItems = JSON.parse(localStorage.getItem("cart"));

        if(loadedItems != undefined){
            var co;
            var cart_container = document.getElementById("cart");
            cart_container.innerHTML = "<div class='container--category--title'><h3>Cart</h3></div>";
            for(co = 0; co<loadedItems.length; co++){
                var item_con = document.createElement("div");
                item_con.className = "container--item";
                item_con.setAttribute("id", loadedItems[co].name);

                item_con.innerHTML = "\
                <h5>"+loadedItems[co].name+"</h5> \
                <p class='item--pricetag'>"+loadedItems[co].price+"</p>";

                var gumb = document.createElement("button");
                gumb.innerHTML = "Remove" + loadedItems[co].name;
                gumb.setAttribute("id", "remove-" + loadedItems[co].name);
                gumb.name = loadedItems[co].name;
                
                var find = loadedItems[co].name;
                gumb.onclick = function(){
                    var children = document.getElementById('cart').getElementsByTagName('*');
                    var t;
                    for(t=0; t<children.length; t++){
                        if(children[t].id == this.name){
                            var remove = {
                                name: '',
                                price: ''
                            };
                            var l;
                            for(l=0; l<allItems.items.length; l++){
                                if(allItems.items[l].name == children[t].id){
                                    remove.name = allItems.items[l].name;
                                    remove.price = allItems.items[l].price;
                                    document.getElementById("cart").removeChild(children[t]);
                                    console.log(loadedItems.find());
                                    //console.log(remove);
                                    //loadedItems.splice(loadedItems.indexOf(remove), 1);
                                    //console.log(loadedItems);
                                    //localStorage.setItem("cart", JSON.stringify(loadedItems));
                                }
                            }
                        }
                    }
                }
                item_con.appendChild(gumb);
                
                cart_container.appendChild(item_con);
            }
        }else{
            var cart_container = document.getElementById("cart");
            cart_container.innerHTML = "<div class='container--category--title'><h3>Cart(Empty)</h3></div>";

        }
        
        
        var i;
       
        for(i = 0; i<kategorije.length; i++){
            var div = document.createElement("div");
            div.className = "container--category";
            div.setAttribute("id", kategorije[i].category.toLowerCase());
            //div.id = kategorije[i].category.toLowerCase();

            div.innerHTML = "<div class='container--category--title'>\
            <h3>"+kategorije[i].category+"</h3>";
            

            var container = document.getElementById("al");
            container.appendChild(div);

            var op = document.createElement("option");
            op.text = kategorije[i].category;

            document.getElementById("select-category").appendChild(op);
        }

        var b;
        for(b = 0; b<allItems.items.length; b++){
            var parentDiv = document.getElementById(allItems.items[b].category);

            var itemDiv = document.createElement("div");
            itemDiv.className = "container--item";

            itemDiv.innerHTML = "<h5>"+allItems.items[b].name+"</h5> \
            <p class='item--pricetag'>"+allItems.items[b].price+"</p>";
            var btn = document.createElement("button");
            btn.className = "add--button";
            btn.innerHTML = "Add to cart";
            btn.id = "button-" + allItems.items[b].name;
            btn.name = allItems.items[b].name;
                   
            itemDiv.appendChild(btn);
            parentDiv.appendChild(itemDiv);
            document.getElementById("button-" + allItems.items[b].name).addEventListener("click", function(){
                var name = this.name;
                var counter;
                for(counter = 0; counter<allItems.items.length; counter++){
                    if(allItems.items[counter].name === name){
                        console.log(allItems.items[counter].name);
                        var saved = {
                            name: allItems.items[counter].name,
                            price: allItems.items[counter].price
                        };
                        cart_items.push(saved);
                        localStorage.setItem("cart", JSON.stringify(cart_items));   
                        var cart_container = document.getElementById("cart");
                        var item_div = document.createElement("container--item");
                        item_div.className = "container--item";
        
                        item_div.innerHTML = "\
                        <h5>"+allItems.items[counter].name+"</h5> \
                        <p class='item--pricetag'>"+allItems.items[counter].price+"</p>";

                        var btn = document.createElement("button");
                        btn.innerHTML = "Remove";
                        btn.id = "remove-" + allItems.items[counter].name;

                        btn.onclick = function(){
                            cart_container.removeChild(item_div);
                            cart_items.splice(cart_items.indexOf(saved), 1);
                            localStorage.setItem("cart", JSON.stringify(cart_items));   
                        }
                        item_div.appendChild(btn);
                        cart_container.appendChild(item_div);
                    }
                }
            });
        }
    }
    render(){
        function displayCategory(type){
            var type = type;
            var i;

            var div = document.createElement("div");
            div.className = "container--category";
            div.id = type.toLowerCase();
            
            div.innerHTML="<div class='container--category--title'>\
            <h3>"+type+"</h3>\
            </div>";

            var container = document.getElementById("al");
            container.appendChild(div);
                        
            for(i = 0; i<allItems.items.length; i++){
                if(allItems.items[i].category == type.toLowerCase()){
                    var find = allItems.items[i].category;
                    var parentDiv = document.getElementById(find.toLowerCase());
                    var itemDiv = document.createElement("div");
                    itemDiv.className = "container--item";

                    itemDiv.innerHTML = "<h5>"+allItems.items[i].name+"</h5> \
                    <p class='item--pricetag'>"+allItems.items[i].price+"</p>";
                    var btn = document.createElement("button");
                    btn.className = "add--button";
                    btn.innerHTML = "Add to cart";
                    btn.id = "button";
                   
                    itemDiv.appendChild(btn);
                    parentDiv.appendChild(itemDiv);

                }
            }           
            
        }
       
        function updateFilter(){
            var value = document.getElementById("select-category").value;
            var parentDiv = document.getElementById("al");
            while(parentDiv.firstChild){
                parentDiv.removeChild(parentDiv.firstChild);
            }
            displayCategory(value);
        }

        function loadmore(){
            alert("loading");
        }

        return(
            <div>
                <div className="container--filter">
                    <select id="select-category" onChange={updateFilter}>
                        <option disabled selected>Select Category</option>
                    </select>
                </div>
                <div id="al">
                
                </div>

                <div id="cart" className="container--category">

                </div>
            </div>
        )
    }
}

export default Home;