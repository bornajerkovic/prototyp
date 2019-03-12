import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header.jsx";
import { bindActionCreators } from "redux";
import fire from "../modules/auth/fire";
import { Redirect } from "react-router-dom";
import {
  addItem,
  changeCategory,
  addCategory,
  removeItem
} from "../modules/admin/redux/actions";

class AdminPanel extends Component {
  state = {
    name: undefined,
    cat: undefined,
    price: undefined,
    info: undefined,
    message: undefined,
    user: {},

    oldCategory: undefined,
    newCategory: undefined,
    addCat: undefined,
    removeItem: undefined
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire
      .auth()
      .onAuthStateChanged(user => this.setState({ user: user || null }));
  }

  showMessage() {
    return this.state.message ? (
      <p>
        <strong>{this.state.message}</strong>
      </p>
    ) : null;
  }

  addNewItem = () => {
    console.log(this.state);

    let newItem = {
      id: Math.random(),
      name: this.state.name,
      category: this.state.cat,
      price: parseInt(this.state.price),
      num: 1,
      inCart: false,
      info: this.state.info
    };

    if (this.state.name && this.state.price && this.state.info) {
      this.refs.name.value = "";
      this.refs.price.value = "";
      this.refs.info.value = "";

      this.props.addItem(newItem);
      this.setState({ message: "Item added successfully" }, this.showMessage());
    }

    this.setState({ message: "Invalid input" }, this.showMessage());
  };
  removeDupicated(arr) {
    let unique = {};
    arr.forEach(function(i) {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }

  displayCategories() {
    let allCategories = JSON.parse(localStorage.getItem("all"));
    let newNesto = [];
    allCategories.forEach(item => {
      newNesto = [...newNesto, item.category];
    });

    const cleanAllCategories = Array.from(new Set(newNesto));
    console.log(cleanAllCategories);
    return cleanAllCategories.map(item => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
  }

  displayItems() {
    const it = JSON.parse(localStorage.getItem("all"));
    return it.map(item => {
      return (
        <option key={item.id} value={item.name}>
          {item.name}
        </option>
      );
    });
  }
  updateCategory = () => {
    const name = document.getElementById("select-items").value;
    const newCategory = document.getElementById("select--category").value;

    const replaceObject = {
      name: name,
      newCategory: newCategory
    };

    let all_items = JSON.parse(localStorage.getItem("all"));

    const findItem = all_items.find(item => item.name === name);

    //ZARJESIT
    if (findItem.category === newCategory) {
      this.setState(
        { message: "Item is aready in that category" },
        this.showMessage()
      );
    }

    this.props.changeCategory(replaceObject);
    this.setState(
      { message: "Item is aready in that category" },
      this.showMessage()
    );
    //----------------
  };

  addNewCategory = () => {
    //let newCat = document.getElementById("input-category").value;

    //document.getElementById("category-message").innerHTML =
    //"<strong>Category Added Sucessfully</strong>";
    //document.getElementById("input-category").value = "";

    let newCat = this.state.addCat;
    this.props.addCategory(newCat);
    this.refs.newcategory.value = "";
  };

  show(g) {
    if (g === 0) {
    } else {
      return <h3>Item removed</h3>;
    }
  }

  removeItem = () => {
    //let itemName = document.getElementById("select-remove").value;
    //document.getElementById("remove-message").innerHTML =
    //"<strong>Item Removed Successfully</strong>";
    let itemName = this.state.removeItem;
    this.props.removeItem(itemName);
    this.show(5);
  };
  updateInput(e) {
    const newVal = e.target.value;
    this.setState({ [e.target.id]: newVal });
  }
  render() {
    return this.state.user ? (
      <div>
        <Header />
        {this.showMessage()}
        <div className="container--add--item">
          <p id="add-message" />
          <h2>Add Item</h2>
          <input
            id="name"
            ref="name"
            type="text"
            placeholder="Item Name"
            className="form--textbox"
            onChange={this.updateInput.bind(this)}
          />

          <select
            id="cat"
            className="select--default"
            onChange={this.updateInput.bind(this)}
          >
            {this.displayCategories()}
          </select>
          <input
            id="price"
            ref="price"
            type="number"
            className="form--textbox"
            placeholder="Item Price"
            onChange={this.updateInput.bind(this)}
          />
          <textarea
            id="info"
            ref="info"
            onChange={this.updateInput.bind(this)}
            placeholder="Item Info"
          />
          <button onClick={this.addNewItem}>Add</button>
        </div>

        <p id="change-message" />

        <div className="container--change--category">
          <h2>Change Category</h2>
          <select
            id="select-items"
            className="inline--select"
            placeholder="Select Item"
          >
            {this.displayItems()}
          </select>

          <select id="select--category" className="inline--select">
            {this.displayCategories()}
          </select>

          <button className="update--button" onClick={this.updateCategory}>
            Update
          </button>
        </div>

        <p id="category-message" />

        <div className="container--change--category">
          <h2>Add Category</h2>
          <input
            type="text"
            ref="newcategory"
            id="addCat"
            className="input-category"
            placeholder="New Category"
            onChange={this.updateInput.bind(this)}
          />
          <button className="update--button" onClick={this.addNewCategory}>
            Add
          </button>
        </div>

        <p id="remove-message" />

        {this.show(0)}
        <div className="container--change--category">
          <h2>Remove Item</h2>
          <select
            id="removeItem"
            className="inline--select"
            placeholder="Select Item"
            onChange={this.updateInput.bind(this)}
          >
            {this.displayItems()}
          </select>
          <button className="update--button" onClick={this.removeItem}>
            Remove
          </button>
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    allItems: state.allItems,
    cart: state.cart,
    details: state.details
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addItem: addItem,
      changeCategory: changeCategory,
      addCategory: addCategory,
      removeItem: removeItem
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(AdminPanel);
