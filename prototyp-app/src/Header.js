import React, { Component } from 'react';
import fire from "../src/auth/fire";
import {Link} from "react-router-dom";

class Header extends Component{
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
    
    render(){
        function login(){
            window.open("/login", "_self");
        }
        function register(){
            window.open("/register", "_self");
        }
        function logout(){
            fire.auth().signOut();
        }
        if(this.state.user == null){
            return(
                <div className="container--header">
                    <div className="container--buttons">
                        <Link to="/">
                            <button className="header--button">Home</button>
                        </Link>
                        <button className="header--button">Listing</button>
                        <button className="header--button">FAQ</button>
                        <Link to="/cart">
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
            )
        }
        else{
            return(
                <div className="container--header">
                    <div className="container--buttons">
                        <Link to="/">
                            <button className="header--button">Home</button>
                        </Link>
                        <button className="header--button">Listing</button>
                        <button className="header--button">FAQ</button>
                        <Link to="/cart">
                            <button className="header--button">Cart</button>
                        </Link>
                        <Link to="/adminpanel">
                            <button className="header--button">Admin Panel</button>
                        </Link>
                        <button className="header--button" onClick={logout}>Logout</button>
                    </div>
                </div>
            )
        }
    }
}

export default Header;