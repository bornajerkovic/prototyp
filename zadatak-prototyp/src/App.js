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
            <Route path="/details/:id" component={Details} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/listing" component={Listing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/adminpanel" component={AdminPanel} />
            <Route exact path="/resetpassword" component={ResetPassword} />
            <Route exact path="/faq" component={FAQ} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
