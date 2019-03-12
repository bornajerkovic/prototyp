import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import { showDetails, addToCart } from "../modules/auth/redux/actions";

class Listing extends Component {
  state = {
    values: [],
    items: JSON.parse(localStorage.getItem("all")),
    categories: JSON.parse(localStorage.getItem("categories")),
    activeFilter: "all",
    msg: undefined
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

  options() {
    return this.state.categories.map(item => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
  }

  displayItems() {
    const cart = this.props.cart;
    if (cart !== null) {
      cart.forEach(item => {
        const index = item;
        const u = this.state.items.find(item => item.id === index.id);
        if (u !== undefined) {
          u.inCart = true;
        }
      });
    }
    const it = JSON.parse(localStorage.getItem("all"));
    it.forEach(product => {
      if (product.inCart === true) {
        const find = this.state.cart.find(item => item.id === product.id);
        if (find === undefined) {
          product.inCart = false;
        }
      }
    });

    return this.state.items.map(item => {
      return (
        <div className="container--item" key={item.id}>
          <div className="container--item-title">
            <p className="title">{item.name}</p>
          </div>

          <div>
            <p className="price">{item.price}</p>
          </div>

          <button
            className="add--button"
            onClick={() => this.props.addToCart(item)}
            disabled={item.inCart ? true : false}
          >
            {item.inCart ? <p>Item in Cart</p> : <p>Add to Cart</p>}
          </button>

          <Link to="/details" params={this.props.details}>
            <button
              className="details--button"
              onClick={() => this.props.showDetails(item)}
            >
              <p>Details</p>
            </button>
          </Link>
        </div>
      );
    });
  }

  categoryFilter(e) {
    let loaded = JSON.parse(localStorage.getItem("all"));
    if (e.target.value === "all") {
      this.setState({ items: loaded, activeFilter: "all" }, () =>
        this.displayItems()
      );
    } else {
      let filter = loaded.filter(item => item.category === e.target.value);
      this.setState({ items: filter, activeFilter: e.target.value }, () =>
        this.displayItems()
      );
    }
  }

  priceFilter = e => {
    let newItems = JSON.parse(localStorage.getItem("all"));
    let filters = this.state.activeFilter;

    if (filters === "all") {
      newItems = newItems.filter(item => item.price < e.target.value);
      this.setState({ items: newItems }, () => this.displayItems());
    } else {
      newItems = newItems.filter(item => item.price < e.target.value);
      newItems = newItems.filter(item => item.category === filters);
      this.setState({ items: newItems }, () => this.displayItems());
    }

    console.log(JSON.parse(localStorage.getItem("all")));
    document.getElementById("currentValue").innerHTML =
      "Current: " + e.target.value;
  };

  render() {
    const loaded = JSON.parse(localStorage.getItem("all"));
    if (loaded != null) {
      loaded.forEach(element => {
        const toUpdate = loaded.find(item => item.id === element.id);
        toUpdate.inCart = true;
      });
      this.displayItems();
    }

    return (
      <div>
        <Header />

        <div>
          <select
            id="categoryFilter"
            onChange={e => {
              this.categoryFilter(e);
            }}
          >
            <option value="all">All Items</option>
            {this.options()}
          </select>
          <input
            type="range"
            min="0"
            step="100"
            max="10000"
            name="priceFilter"
            onChange={this.priceFilter}
          />
          <p id="currentValue">Current: 0</p>
        </div>

        {this.displayItems()}
      </div>
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
    { showDetails: showDetails, addToCart: addToCart },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Listing);
