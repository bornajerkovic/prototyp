import React, { Component } from "react";

class NotFound extends Component {
    componentDidMount() {
        setTimeout(() => {
            window.open("/", "_self")
        }, 2000);
    }
    render() {
        return (
            <div>
                <h1>Page not found</h1>
                <p>Redirecting to Home Page</p>
            </div>
        )
    }
}

export default NotFound;