import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import {
  removeCartItem,
  incremenet,
  decrement
} from "../modules/cart/redux/actions";
import "../index.css";

class Cart extends Component {
  state = {
    total: 0
  };
  componentDidMount() {
    this.setTotal();
  }
  setTotal() {
    let checkout_total = 0;
    this.setState({ total: checkout_total });
    this.props.cart.forEach(element => {
      checkout_total += element.price;
    });
    this.setState({ total: checkout_total });
  }
  increment(el) {
    this.props.incremenet(el);
    this.showCartItems();
    this.setTotal();
  }

  decrement(el) {
    this.props.decrement(el);
    this.showCartItems();
    this.setTotal();
  }
  remove(el) {
    this.props.removeCartItem(el);
    this.setTotal();
  }

  showCartItems() {
    if (this.props.cart) {
      return this.props.cart.map(item => (
        <div className="container--item" key={item.id}>
          <div className="container--item-title">
            <p className="title">{item.name}</p>
          </div>

          <div>
            <p className="price">{item.price}</p>
          </div>

          <button
            className="add--button"
            onClick={this.remove.bind(this, item)}
          >
            <p>Remove</p>
          </button>

          <button
            className="num--button"
            onClick={this.increment.bind(this, item)}
          >
            +
          </button>

          <p>{item.num}</p>

          <button
            className="num--button"
            onClick={this.decrement.bind(this, item)}
          >
            -
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
      ));
    }
  }

  emptyCart() {
    if (
      [...this.props.cart] === undefined ||
      [...this.props.cart].length === 0
    ) {
      return <h1>The Cart is currently empty</h1>;
    }
  }
  render() {
    return (
      <div>
        <Header />
        {this.emptyCart()}
        {this.showCartItems()}
        <p className="total">Total: {this.state.total}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    details: state.details
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      removeCartItem: removeCartItem,
      incremenet: incremenet,
      decrement: decrement
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Cart);
