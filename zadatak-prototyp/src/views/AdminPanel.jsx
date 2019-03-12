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
} from "../modules/admin/redux/";

class AdminPanel extends Component {
  state = {
    message: undefined,
    user: {},

    newItemName: undefined,
    newItemCat: undefined,
    newItemPrice: undefined,
    newItemInfo: undefined,

    selectItem: undefined,
    changedCat: undefined,

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
    const { message } = this.state;
    return <p>{message}</p>;
  }

  addNewItem = () => {
    const { newItemName, newItemCat, newItemPrice, newItemInfo } = this.state;
    let newItem = {
      id: Math.random(),
      name: newItemName,
      category: newItemCat,
      price: parseInt(newItemPrice),
      num: 1,
      inCart: false,
      info: newItemInfo
    };

    if (newItemName && newItemInfo && newItemPrice) {
      this.refs.name.value = "";
      this.refs.price.value = "";
      this.refs.info.value = "";

      if (newItem.category === undefined) {
        newItem.category = "laptops";
      }

      this.props.addItem(newItem);
      this.setState({ message: "Item added successfully" });
    } else {
      this.setState({ message: "Invalid input" });
    }
  };

  displayCategories() {
    return JSON.parse(localStorage.getItem("categories")).map(item => (
      <option key={item} value={item}>
        {item}
      </option>
    ));
  }

  displayItems() {
    return this.props.items.map(item => (
      <option key={item.id} value={item.name}>
        {item.name}
      </option>
    ));
  }

  updateCategory = () => {
    const name = this.state.selectItem;
    let newCategory = this.state.changedCat;

    let item = this.props.items.find(item => item.name === name);

    if (!item) {
      item = this.props.items[0];
    }
    if (!newCategory) {
      newCategory = "laptops";
    }

    const replaceObject = {
      item: item,
      newCategory: newCategory
    };

    this.props.changeCategory(replaceObject);
    this.setState({ message: "Item category updated" });
  };

  addNewCategory = () => {
    let newCat = this.state.addCat;
    this.props.addCategory(newCat);
    this.refs.newcategory.value = "";
    this.setState({ message: "Category successfully added" });
  };

  removeItem = () => {
    let itemName = this.state.removeItem;
    this.props.removeItem(itemName);
    this.setState({ message: "Item removed Successfully !" });
  };

  updateInput(e) {
    const newVal = e.target.value;
    this.setState({ [e.target.id]: e.target.value });
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
            id="newItemName"
            ref="name"
            type="text"
            placeholder="Item Name"
            className="form--textbox"
            onChange={this.updateInput.bind(this)}
          />

          <select
            id="newItemCat"
            className="select--default"
            onChange={this.updateInput.bind(this)}
          >
            {this.displayCategories()}
          </select>
          <input
            id="newItemPrice"
            ref="price"
            type="number"
            className="form--textbox"
            placeholder="Item Price"
            onChange={this.updateInput.bind(this)}
          />
          <textarea
            id="newItemInfo"
            ref="info"
            onChange={this.updateInput.bind(this)}
            placeholder="Item Info"
          />
          <button onClick={this.addNewItem}>Add</button>
        </div>

        <div className="container--change--category">
          <h2>Change Category</h2>
          <select
            id="selectItem"
            className="inline--select"
            placeholder="Select Item"
            onChange={this.updateInput.bind(this)}
            value="laptops"
          >
            {this.displayItems()}
          </select>

          <select
            id="changedCat"
            className="inline--select"
            onChange={this.updateInput.bind(this)}
          >
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
    cart: state.cart
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
