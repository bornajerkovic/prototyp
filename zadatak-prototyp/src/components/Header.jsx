import React, { Component } from "react";
import fire from "../modules/auth/fire";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire
      .auth()
      .onAuthStateChanged(user => this.setState({ user: user || null }));
  }
  logout() {
    fire.auth().signOut();
  }

  render() {
    return this.state.user ? (
      <div className="container--header">
        <div className="container--buttons">
          <Link to="/">
            <button className="header--button">Home</button>
          </Link>

          <Link to="/listing">
            <button className="header--button">Listing</button>
          </Link>

          <Link to="/faq">
            <button className="header--button">FAQ</button>
          </Link>

          <Link to="/cart">
            <button className="header--button">Cart</button>
          </Link>

          <Link to="/adminpanel">
            <button className="header--button">Admin Panel</button>
          </Link>
          <button className="header--button" onClick={this.logout}>
            Logout
          </button>
        </div>
      </div>
    ) : (
      <div className="container--header">
        <div className="container--buttons">
          <Link to="/">
            <button id="home" className={"header--button"}>
              Home
            </button>
          </Link>

          <Link to="/listing">
            <button className="header--button">Listing</button>
          </Link>

          <Link to="/faq">
            <button className="header--button">FAQ</button>
          </Link>

          <Link to="/cart" items={this.props.cart}>
            <button className="header--button">Cart</button>
          </Link>

          <Link to="/login">
            <button className="header--button">Login</button>
          </Link>

          <Link to="/register">
            <button className="header--button">Register</button>
          </Link>
        </div>
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

export default connect(mapStateToProps)(Header);
