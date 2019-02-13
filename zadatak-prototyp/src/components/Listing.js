import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Header from "./Header";
import { showDetails, addToCart, filterCategory } from "../modules/auth/redux/actions";

class Listing extends Component {
    state = {
        values: []
    }
    removeDupicated(arr) {
        let unique = {};
        arr.forEach(function (i) {
            if (!unique[i]) {
                unique[i] = true;
            }
        });
        return Object.keys(unique);
    }

    options() {
        let allCategories = JSON.parse(localStorage.getItem("categories"));
        console.log(allCategories);
        return allCategories.map(item => {
            const uniqueKey = Math.random();
            return (
                <option key={uniqueKey} value={item}>{item}</option>
            )
        });
    }

    displayItems() {
        const cart = this.props.cart;
        if (cart !== null) {
            cart.forEach(item => {
                const index = item;
                const u = this.props.items.find(item => item.id === index.id);
                if (u !== undefined) {
                    u.inCart = true;
                }
            });
        }
        const it = JSON.parse(localStorage.getItem("all"));
        it.forEach(product => {
            if (product.inCart === true) {
                const find = this.props.cart.find(item => item.id === product.id);
                if (find === undefined) {
                    product.inCart = false;
                }
            }
        });
        return this.props.items.map(item => {
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
                        {item.inCart ? (<p>Item in Cart</p>) : (<p>Add to Cart</p>)}
                    </button>

                    <Link to="/details" params={this.props.details}><button
                        className="details--button"
                        onClick={() => this.props.showDetails(item)}
                    >
                        <p>Details</p>
                    </button></Link>
                </div>
            )
        });
    }

    filter(e) {
        this.props.filterCategory(e.target.value);
    }

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
                    <select id="categoryFilter" defaultValue="" onChange={e => { this.filter(e) }}>
                        <option selected value="all">All Items</option>
                        {this.options()}
                    </select>
                </div>

                {this.displayItems()}
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        items: state.items,
        allItems: state.allItems,
        cart: state.cart,
        details: state.details
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ showDetails: showDetails, addToCart: addToCart, filterCategory: filterCategory }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Listing);