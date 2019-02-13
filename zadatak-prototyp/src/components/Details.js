import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { Link } from "react-router-dom";

class Details extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <div className="container--details">

                    <div className="container--item-title">
                        <p className="title">{this.props.details.name}</p>
                    </div>

                    <div>
                        <p className="price">{this.props.details.price / this.props.details.num}</p>
                        <p>{this.props.details.info}</p>
                    </div>

                    <button
                        className="add--button"
                        disabled={this.props.details.inCart ? true : false}
                    >
                        {this.props.details.inCart ? <p>Item is in Cart</p> : <p>Add to Cart</p>}
                    </button>
                    <Link to="/"><button
                        className="details--button"
                    >
                        <p>Back</p>
                    </button></Link>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
        items: state.items,
        details: state.details
    }
}



export default connect(mapStateToProps)(Details);