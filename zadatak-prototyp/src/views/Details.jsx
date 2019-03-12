import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";
import { addToCart } from "../modules/cart/redux/actions";

class Details extends Component {
  state = {
    inCart: false
  };
  componentDidMount() {
    this.setState({ inCart: this.props.location.state.product.inCart }, () =>
      this.displayItem()
    );
  }

  addToCart(el) {
    el.inCart = true;
    this.props.addToCart(el);
    this.setState({ inCart: true }, () => this.displayItem());
  }

  displayItem() {
    let { product } = this.props.location.state;
    return (
      <div>
        <Header />
        <div className="container--details">
          <div className="container--item-title">
            <p className="title">{product.name}</p>
          </div>

          <div>
            <p className="price">{product.price / product.num}</p>
            <p>{product.info}</p>
          </div>

          <button
            className="add--button"
            onClick={this.addToCart.bind(this, product)}
            disabled={this.state.inCart ? true : false}
          >
            {this.state.inCart ? <p>Item in Cart</p> : <p>Add to Cart</p>}
          </button>

          <Link to="/">
            <button className="details--button">
              <p>Back</p>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.displayItem()}</div>;
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
)(Details);
