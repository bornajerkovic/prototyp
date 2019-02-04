import React, { Component } from 'react';
import fire from "./auth/fire";
import './App.css';

class Register extends Component {
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
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{
            window.open("/", "_self");
        }).catch((error) =>{
            alert(error);
        });
    }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
          <h3>Register</h3> 
          <input type="text" placeholder="E-mail:" id="email" onChange={this.handleChange}></input>
          <input type="password" placeholder="Password:" id="password" onChange={this.handleChange}></input>
          <p className="login--text">Already have an account ?</p>
          <p className="login--text">Forgot password ?</p>
          <button className="login--button">Register</button>
      </form>
    );
  }
}

export default Register;
