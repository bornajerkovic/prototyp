import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  AdminPanel,
  Cart,
  Details,
  FAQ,
  Home,
  Listing,
  Login,
  NotFound,
  Register,
  ResetPassword
} from "./views";

import "./App.css";

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
