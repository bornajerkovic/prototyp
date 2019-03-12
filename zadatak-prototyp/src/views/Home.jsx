import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import { showDetails, addToCart } from "../modules/auth/redux/actions";

class Home extends Component {
  componentDidMount() {
    this.setCategories();
    this.checkInCart();
  }

  checkInCart() {
    const it = JSON.parse(localStorage.getItem("all"));
    const loaded = JSON.parse(localStorage.getItem("cart"));
    if (loaded !== null) {
      loaded.forEach(element => {
        if (element !== undefined) {
          const toUpdate = it.find(item => item.id === element.id);
          if (toUpdate !== undefined) {
            toUpdate.inCart = true;
          }
        }
      });
      this.displayItems();
    }
  }
  removeDupicated(arr) {
    let unique = {};
    arr.forEach(function(i) {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }

  setCategories() {
    let loadedItems = JSON.parse(localStorage.getItem("all"));
    let categoryLocal = JSON.parse(localStorage.getItem("categories"));
    if (categoryLocal === null) {
      let categories = [];
      loadedItems.forEach(item => {
        categories = [...categories, item.category];
      });

      let cleanCategories = this.removeDupicated(categories);
      localStorage.setItem("categories", JSON.stringify(cleanCategories));
    }
  }

  displayItems() {
    const cart = this.props.cart;
    const it = JSON.parse(localStorage.getItem("all"));
    if (cart !== null) {
      cart.forEach(item => {
        const index = item;
        const u = it.find(item => item.id === index.id);
        if (u !== undefined) {
          u.inCart = true;
        }
      });
    }
    it.forEach(product => {
      if (product.inCart === true) {
        const find = this.props.cart.find(item => item.id === product.id);
        if (find === undefined) {
          product.inCart = false;
        }
      }
    });
    return it.map(item => {
      if (item.id % 2 === 0) {
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
      }
    });
  }
  render() {
    return (
      <div>
        <Header {...this.state} />
        <h1>Featured Items</h1>
        {this.displayItems()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
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
)(Home);
