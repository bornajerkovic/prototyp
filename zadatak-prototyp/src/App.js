import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home"
import Details from "./components/Details";
import Cart from "./components/Cart"
import Listing from "./components/Listing"
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import AdminPanel from "./components/AdminPanel";
import FAQ from "./components/FAQ";
import ResetPassword from "./components/ResetPassword";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/details" component={Details} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/listing" component={Listing} />
            <Route path="/register" component={Register} />
            <Route path="/adminpanel" component={AdminPanel} />
            <Route path="/resetpassword" component={ResetPassword} />
            <Route path="/faq" component={FAQ} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
