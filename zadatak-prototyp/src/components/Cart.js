import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Header from "./Header";
import { showDetails, removeCartItem, incremenet, decrement } from "../modules/auth/redux/actions";
import "../index.css";

class Cart extends Component {

    showCartItems() {
        const cartItems = this.props.cart;
        const all = JSON.parse(localStorage.getItem("all"));

        let cartArray = [];
        cartArray = cartItems;

        let cleanCart = [];

        cartArray.forEach(item => {
            let to = all.find(pro => pro.id === item.id);
            if (to !== undefined) {
                cleanCart = [...cleanCart, item];
            }
        });

        localStorage.setItem("cart", JSON.stringify(cleanCart));

        if (cleanCart !== null) {
            return cleanCart.map(item => {
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
                            onClick={() => this.props.removeCartItem(item)}
                        >
                            <p>Remove</p>
                        </button>

                        <button
                            className="num--button"
                            onClick={() => this.props.incremenet(item)}
                        >
                            +
                        </button>

                        <p>{item.num}</p>

                        <button
                            className="num--button"
                            onClick={() => this.props.decrement(item)}
                        >
                            -
                        </button>

                        <Link to="/details">
                            <button
                                className="details--button"
                                onClick={() => this.props.showDetails(item)}
                            >
                                <p>Details</p>
                            </button></Link>
                    </div>
                )
            });
        }

    }

    emptyCart() {
        let array = [...this.props.cart];
        if (array === undefined || array.length === 0) {
            return (
                <h1>The Cart is currently empty</h1>
            )
        }
    }
    render() {
        let total = 0;
        if (this.props.cart != null) {
            this.props.cart.forEach(element => {
                if (element.num === 0) {
                    element.num = 1;
                }
                total += element.price;
            });
        }
        return (
            <div>
                <Header />
                {this.emptyCart()}
                {this.showCartItems()}
                <p className="total">Total: {total}</p>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        cart: state.cart,
        details: state.details
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ removeCartItem: removeCartItem, showDetails: showDetails, incremenet: incremenet, decrement: decrement }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Cart);