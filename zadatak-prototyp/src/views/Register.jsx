import React, { Component } from "react";
import fire from "../modules/auth/fire";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";
import "../App.css";

class Register extends Component {
  state = {
    email: undefined,
    password: undefined,
    errorMsg: undefined
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        this.setState({
          errorMsg: "E-mail has been sent to you for further details"
        });
        setTimeout(() => {
          this.props.history.push("/");
        }, 1500);
      })
      .catch(error => {
        this.setState({
          errorMsg: "MESSAGE: " + error.message
        });
      });
  };

  render() {
    return (
      <div>
        <Header />

        <div className="container--error">
          <p>{this.state.errorMsg}</p>
        </div>

        <form onSubmit={this.handleSubmit} className="form">
          <h3>Register</h3>
          <input
            type="text"
            className="form--textbox"
            placeholder="E-mail:"
            id="email"
            onChange={this.handleChange}
          />
          <input
            type="password"
            placeholder="Password:"
            id="password"
            onChange={this.handleChange}
          />
          <Link to="/login">
            <p className="login--text">Already have an account ?</p>
          </Link>
          <Link to="/resetpassword">
            <p className="login--text">Forgot password ?</p>
          </Link>
          <button className="login--button">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
