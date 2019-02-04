import React, { Component } from "react";
import fire from "../src/auth/fire";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../src/context";
import Header from "../src/Header";
import ChangeCategoryItem from "../src/ChangeCategoryItem"
class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(user);
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    function prevent(event) {
      event.preventDefault();
    }
    let id = [];
    let name = [];
    let category = [];
    let price = [];
    let incart = [];
    let info = [];

    function submitRequest() {
      var idd = Math.random();
      var ime = document.getElementById("name").value;
      var kategorija = document.getElementById("category").value;
      var cijena = document.getElementById("price").value;
      var ukosari = false;
      var opis = document.getElementById("info").value;

      id = idd;
      name = ime;
      category = kategorija;
      price = cijena;
      incart = ukosari;
      info = opis;
      document.getElementById("btn").click();

      //window.open("/", "_self");
    }
    if (this.state.user != null) {
      return (
        <div>
          <Header />
          <ProductConsumer>
            {value => (
              <div className="container--additem">
                <h1>Add Item</h1>
                <form onSubmit={prevent} className="add--item--form">
                  <input
                    className="container--add--form"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="name"
                  />
                  <input
                    className="container--add--form"
                    id="category"
                    type="text"
                    name="name"
                    placeholder="category"
                  />
                  <input
                    className="container--add--form"
                    id="price"
                    type="number"
                    name="name"
                    placeholder="price"
                  />
                  <textarea id="info" placeholder="About the product" />
                  <button className="add--button--form" onClick={submitRequest}>
                    Add Item
                  </button>
                  <button
                    id="btn"
                    className="hidden--button"
                    onClick={() =>
                      value.addItem(id, name, category, price, incart, info)
                    }
                  />
                </form>
              </div>
            )}
          </ProductConsumer>

          <h1>Change item category</h1>
          <ProductConsumer>
            {(value) => {
              const values = value;
              return value.allitems.map(items =>{
                return <ChangeCategoryItem key={items.id} items={items}></ChangeCategoryItem>
              });
            }}
          </ProductConsumer>
        </div>
      );
    } else {
      return <h1>You need to be logged in to access this</h1>;
    }
  }
}

export default AdminPanel;
