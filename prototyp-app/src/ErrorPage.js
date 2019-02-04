import React, { Component } from 'react';
import Header from "../src/Header";
import './App.css';

class ErrorPage extends Component {
  render() {
    return (
        <div>
            <Header />
            <h1>Wrong URL</h1>
        </div>
    );
  }
}

export default ErrorPage;
