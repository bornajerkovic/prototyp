import React, { Component } from 'react';
import fire from "../modules/auth/fire";
import Header from "./Header"
import { Link } from "react-router-dom";
import '../App.css';

class Login extends Component {

    state = {
        email: '',
        password: '',
        errorMsg: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            window.open("/", "_self");
        }).catch((error) => {
            this.setState({
                errorMsg: error.message
            });
        });
    }

    showError() {
        if (this.state.errorMsg !== "") {
            return (
                <p>ERROR: {this.state.errorMsg}</p>
            )
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container--error">
                    {this.showError()}
                </div>

                <form onSubmit={this.handleSubmit} className="form">
                    <h3>Login</h3>
                    <input type="text" className="form--textbox" placeholder="E-mail:" id="email" onChange={this.handleChange}></input>
                    <input type="password" placeholder="Password:" id="password" onChange={this.handleChange}></input>
                    <Link to="/register"><p className="login--text">Dont have an account ?</p></Link>
                    <Link to="/resetpassword"><p className="login--text">Forgot password ?</p></Link>
                    <button className="login--button">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
