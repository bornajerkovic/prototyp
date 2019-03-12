import React, { Component } from "react";
import fire from "../modules/auth/fire";
import Header from "../components/Header.jsx";
import "../App.css";

class ResetPassword extends Component {
  state = {
    email: undefined,
    password: undefined,
    message: undefined
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    fire
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(u => {
        const msg =
          "SUCCESS: An E-mail has been sent to you with further details";
        this.setState({ message: msg });
        document.getElementById("email").value = "";
      })
      .catch(error => {
        this.setState({ message: error.message });
      });
  };

  render() {
    return (
      <div>
        <Header />
        <p>{this.state.message}</p>
        <form onSubmit={this.handleSubmit} className="form--forgetpassword">
          <h3>Reset Password</h3>
          <input
            type="text"
            className="form--textbox"
            placeholder="E-mail:"
            id="email"
            onChange={this.handleChange}
          />
          <button className="login--button">Reset</button>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
