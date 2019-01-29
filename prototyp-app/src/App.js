import React, { Component } from 'react';
import fire from "../src/auth/fire";
import Home from "./views/Home";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
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
              <Header {...this.props}/>
              <Home {...this.props} />
            </div>
          } />
          <Route path="/login" render={props => <Login></Login>}/>
          <Route path="/register" render={props => <Register></Register>}/>
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
