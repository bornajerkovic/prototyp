import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, Route } from "react-router-dom";
import Header from "../components/Header.jsx";
import Details from "./Details.jsx";
import { addToCart } from "../modules/cart/redux/actions";

class Listing extends Component {
  state = {
    activeFilter: "all",
    allItems: this.props.items,
    items: this.props.items,
    price: 0,
    msg: undefined
  };

  displayCategoryOptions() {
    return JSON.parse(localStorage.getItem("categories")).map(item => (
      <option key={item} value={item}>
        {item}
      </option>
    ));
  }

  displayItems() {
    this.state.items.forEach(element => {
      if (this.props.cart) {
        let product = this.props.cart.find(item => item.id === element.id);
        product ? (element.inCart = true) : (element.inCart = false);
      }
    });

    return this.state.items.map(item => (
      <div className="container--item" key={item.id}>
        <div className="container--item-title">
          <p className="title">{item.name}</p>
        </div>

        <div>
          <p className="price">{item.price}</p>
        </div>

        <button
          className="add--button"
          onClick={this.props.addToCart.bind(this, item)}
          disabled={item.inCart ? true : false}
        >
          {item.inCart ? <p>Item in Cart</p> : <p>Add to Cart</p>}
        </button>

        <Link
          to={{
            pathname: `/details/${item.id}`,
            state: {
              product: item
            }
          }}
        >
          <button className="details--button">
            <p>Details</p>
          </button>
        </Link>
        <Route path={`details/:id`} component={Details} />
      </div>
    ));
  }

  categoryFilter(e) {
    if (e.target.value === "all") {
      this.setState({ items: this.props.items, activeFilter: "all" }, () =>
        this.displayItems()
      );
    } else {
      let filter = this.state.allItems.filter(
        item => item.category === e.target.value
      );
      this.setState({ items: filter, activeFilter: e.target.value }, () =>
        this.displayItems()
      );
    }
  }

  showPriceRange() {
    return (
      <p>
        Price from <mark>0</mark> to <mark>{this.state.price}</mark>HRK
      </p>
    );
  }

  priceFilter = e => {
    if (this.state.activeFilter === "all") {
      this.setState(
        {
          items: this.state.allItems.filter(item => item.price < e.target.value)
        },
        () => this.displayItems()
      );
    } else {
      this.setState(
        {
          items: this.state.allItems.filter(
            item =>
              item.category === this.state.activeFilter &&
              item.price < e.target.value
          )
        },
        () => this.displayItems()
      );
    }
    this.setState({ price: e.target.value }, () => this.showPriceRange());
  };

  render() {
    return (
      <div>
        <Header />
        <div>
          <select id="categoryFilter" onChange={this.categoryFilter.bind(this)}>
            <option value="all">All Items</option>
            {this.displayCategoryOptions()}
          </select>
          <input
            type="range"
            min="0"
            step="100"
            max="10000"
            name="priceFilter"
            onChange={this.priceFilter}
          />
          {this.showPriceRange()}
        </div>

        {this.displayItems()}
      </div>
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
  return bindActionCreators({ addToCart: addToCart }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Listing);
