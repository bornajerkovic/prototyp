import React, { Component } from 'react';
import fire from "../src/auth/fire";
import Home from "./context";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import ProductList from "../src/ProductList";
import Details from "../src/Details";
import Cart from "../src/Cart";
import AdminPanel from "../src/AdminPanel";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:{},
    }
  }

  componentDidMount(){  
    this.authListener();
  }

  authListener(){
    fire.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState(user);
      }
      else{
        this.setState({user:null});
      }
    });

  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' render={props =>
            <div>
              <Header/>
              <ProductList/>
            </div>
          } />
          <Route path="/login" render={props => <Login></Login>}/>
          <Route path="/register" render={props => <Register></Register>}/>
          <Route path="/details" render={props => <Details></Details>}/>
          <Route path="/cart" render={props => <Cart></Cart>}/>
          <Route path="/adminpanel" render={props => <AdminPanel></AdminPanel>}/>
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
