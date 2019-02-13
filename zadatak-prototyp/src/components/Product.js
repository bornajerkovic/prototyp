import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  selectUser,
  addToCart,
  removeCartItem,
  removeItem
} from "../modules/auth/redux/actions";

class Product extends Component {
  render() {
    const thisItem = this.props.item;
    console.log(thisItem);
    return (
      <div className="container--item">
        <div className="container--item-title">
          <p className="title">{this.props.item.name}</p>
        </div>

        <div>
          <p className="price">{this.props.item.price}</p>
        </div>

        <button
          className="add--button"
        >
          <p>Add to Cart</p>
        </button>

        <Link to="/details" params={this.props.details}><button
          className="details--button"
          onClick={() => this.props.showDetails(this.props.item)}
        >
          <p>Details</p>
        </button></Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    details: state.details
  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ removeItem: removeItem }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Product);