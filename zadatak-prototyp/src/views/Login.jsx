import React, { Component } from "react";
import fire from "../modules/auth/fire";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";
import "../App.css";

class Login extends Component {
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
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({
          errorMsg: "ERROR :" + error.message
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
          <h3>Login</h3>
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
          <Link to="/register">
            <p className="login--text">Dont have an account ?</p>
          </Link>
          <Link to="/resetpassword">
            <p className="login--text">Forgot password ?</p>
          </Link>
          <button className="login--button">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
