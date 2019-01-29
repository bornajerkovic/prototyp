import React, { Component } from 'react';
import fire from "../src/auth/fire";

class Header extends Component{
    componentDidMount(){
        if(this.state == null){
            console.log("not logged in");
        }
        else{
            console.log("logged in");
        }

        
    }
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
            console.log("nije lgoiran");
            return(
                <div className="container--header">
                    <div className="container--buttons">
                        <button className="header--button">Home</button>
                        <button className="header--button">Listing</button>
                        <button className="header--button">FAQ</button>
                        <button className="header--button" onClick={login}>Login</button>
                        <button className="header--button" onClick={register}>Register</button>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="container--header">
                    <div className="container--buttons">
                        <button className="header--button">Home</button>
                        <button className="header--button">Listing</button>
                        <button className="header--button">FAQ</button>
                        <button className="header--button">Admin Panel</button>
                        <button className="header--button" onClick={logout}>Logout</button>
                    </div>
                </div>
            )
        }
    }
}

export default Header;