import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header"
import { bindActionCreators } from "redux";
import fire from "../modules/auth/fire";
import { addItem, changeCategory, addCategory, removeItem } from "../modules/auth/redux/actions";


class AdminPanel extends Component {

    state = {
        name: '',
        category: "",
        price: '',
        info: '',
        user: {}
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState(user);
            }
            else {
                this.setState({ user: null });
            }
        });

    }

    addNewItem = () => {
        console.log("nsto");
        let name = document.getElementById("name");
        let cat = document.getElementById("cat");
        let price = document.getElementById("price");
        let info = document.getElementById("info");

        let newItem = {
            id: Math.random(),
            name: name.value,
            category: cat.value,
            price: price.value,
            num: 1,
            inCart: false,
            info: info.value
        }
        if (name.value !== "") {
            if (price.value !== 0) {
                if (info.value !== "") {
                    document.getElementById("add-message").innerHTML = "Item Added Successfully";
                    name.value = "";
                    price.value = "";
                    info.value = "";
                    this.props.addItem(newItem);
                }
            }
        }
    }
    removeDupicated(arr) {
        let unique = {};
        arr.forEach(function (i) {
            if (!unique[i]) {
                unique[i] = true;
            }
        });
        return Object.keys(unique);
    }

    displayCategories() {
        const allCategories = JSON.parse(localStorage.getItem("categories"));
        console.log(allCategories);
        return allCategories.map(item => {
            const uniqueKey = Math.random();
            return (
                <option key={uniqueKey} value={item}>{item}</option>
            )
        });
    }

    displayItems() {
        const it = JSON.parse(localStorage.getItem("all"));
        return it.map(item => {
            const uniqueKey = Math.random();
            return (
                <option key={uniqueKey} value={item.name}>{item.name}</option>
            )
        });
    }
    updateCategory = () => {
        const name = document.getElementById("select-items").value;
        const newCategory = document.getElementById("select--category").value;

        const replaceObject = {
            name: name,
            newCategory: newCategory
        }

        let all_items = JSON.parse(localStorage.getItem("all"));

        const findItem = all_items.find(item => item.name === name);

        if (findItem.category === newCategory) {
            document.getElementById("change-message").innerHTML = "<strong>Item is already in that category</strong>";
        }
        else {
            document.getElementById("change-message").innerHTML = "<strong>Item category updated</strong>";
            this.props.changeCategory(replaceObject);
        }
    }

    addNewCategory = () => {
        let newCat = document.getElementById("input-category").value;

        document.getElementById("category-message").innerHTML = "<strong>Category Added Sucessfully</strong>";
        document.getElementById("input-category").value = "";
        this.props.addCategory(newCat);
    }

    removeItem = () => {
        let itemName = document.getElementById("select-remove").value;
        document.getElementById("remove-message").innerHTML = "<strong>Item Removed Successfully</strong>";
        this.props.removeItem(itemName);
    }
    render() {
        console.log(this.state.name + " " + this.state.category);
        if (this.state.user !== null) {
            return (
                <div>
                    <Header />

                    <div className="container--add--item">
                        <p id="add-message"></p>
                        <h2>Add Item</h2>
                        <input id="name" type="text" placeholder="Item Name" className="form--textbox"></input>

                        <select id="cat" className="select--default" >
                            {this.displayCategories()}
                        </select>
                        <input id="price" type="number" className="form--textbox" placeholder="Item Price"></input>
                        <textarea id="info" placeholder="Item Info"></textarea>
                        <button onClick={this.addNewItem}>Add</button>
                    </div>

                    <p id="change-message"></p>

                    <div className="container--change--category">
                        <h2>Change Category</h2>
                        <select id="select-items" className="inline--select" placeholder="Select Item">
                            {this.displayItems()}
                        </select>

                        <select id="select--category" className="inline--select">
                            {this.displayCategories()}
                        </select>

                        <button className="update--button" onClick={this.updateCategory}>Update</button>
                    </div>

                    <p id="category-message"></p>

                    <div className="container--change--category">
                        <h2>Add Category</h2>
                        <input type="text" id="input-category" className="input-category" placeholder="New Category"></input>
                        <button className="update--button" onClick={this.addNewCategory}>Add</button>
                    </div>

                    <p id="remove-message"></p>

                    <div className="container--change--category">
                        <h2>Remove Item</h2>
                        <select id="select-remove" className="inline--select" placeholder="Select Item">
                            {this.displayItems()}
                        </select>
                        <button className="update--button" onClick={this.removeItem}>Remove</button>
                    </div>
                </div >
            )
        }
        else {
            window.open("/", "_self");
        }
    }
}

function mapStateToProps(state) {
    return {
        items: state.items,
        allItems: state.allItems,
        cart: state.cart,
        details: state.details
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ addItem: addItem, changeCategory: changeCategory, addCategory: addCategory, removeItem: removeItem }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AdminPanel);