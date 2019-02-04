import React, { Component } from 'react';
import fire from "./auth/fire";
import Header from "../src/Header"
import {Link} from "react-router-dom";
import './App.css';

class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email:'',
            password:''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        fire.auth().sendPasswordResetEmail(this.state.email).then((u) =>{
            console.log("success");
        }).catch((error) =>{
            alert(error);
        });
    }
  render() {
    return (
        <div>
            <Header />
            <form onSubmit={this.handleSubmit} className="form">
                <h3>Reset Password</h3> 
                <input type="text" className="form--textbox" placeholder="E-mail:" id="email" onChange={this.handleChange}></input>
                <button className="login--button">Reset</button>
            </form>
        </div>
    );
  }
}

export default ResetPassword;
