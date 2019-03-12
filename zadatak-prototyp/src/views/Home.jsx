import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import { addToCart } from "../modules/cart/redux/actions";

class Home extends Component {
  checkStatus() {
    this.props.items.forEach(element => {
      if (this.props.cart) {
        let product = this.props.cart.find(item => item.id === element.id);
        product ? (element.inCart = true) : (element.inCart = false);
      }
    });
  }

  addToCart(el) {
    el.inCart = true;
    this.props.addToCart(el);
  }

  displayItems() {
    return this.props.items.map(item => {
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
              onClick={this.addToCart.bind(this, item)}
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
          </div>
        );
      }
    });
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Featured Items</h1>
        {this.checkStatus()}
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
)(Home);
