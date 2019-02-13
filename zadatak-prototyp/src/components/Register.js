import React, { Component } from 'react';
import fire from "../modules/auth/fire";
import Header from "./Header";
import { Link } from "react-router-dom";
import '../App.css';

class Register extends Component {
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
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            this.setState({
                errorMsg: 'E-mail has been sent to you for further details'
            })
            setTimeout(() => {
                window.open("/", "_self");
            }, 1500);
            //window.open("/", "_self");
        }).catch((error) => {
            this.setState({
                errorMsg: error.message
            });
        });
    }

    showError() {
        if (this.state.errorMsg !== "") {
            return (
                <p>MESSAGE: {this.state.errorMsg}</p>
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
                    <h3>Register</h3>
                    <input type="text" className="form--textbox" placeholder="E-mail:" id="email" onChange={this.handleChange}></input>
                    <input type="password" placeholder="Password:" id="password" onChange={this.handleChange}></input>
                    <Link to="/login"><p className="login--text">Already have an account ?</p></Link>
                    <Link to="/resetpassword"><p className="login--text">Forgot password ?</p></Link>
                    <button className="login--button">Register</button>
                </form>
            </div>

        )
    }
}

export default Register;
