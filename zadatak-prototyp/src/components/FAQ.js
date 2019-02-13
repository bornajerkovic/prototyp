import React, { Component } from "react";
import Header from "./Header";

class FAQ extends Component {
    render() {
        return (
            <div>
                <Header />
                <div class="container--question">
                    <div className="container--question--header">
                        <h2>How long does it take to deliver the product ?</h2>
                    </div>

                    <div className="container--answer">
                        <p>The deliveries usually take 3-5 working days !</p>
                    </div>
                </div>

                <div class="container--question">
                    <div className="container--question--header">
                        <h2>How can I manage items ?</h2>
                    </div>

                    <div className="container--answer">
                        <p>Admin Panel allows item management</p>
                    </div>
                </div>

                <div class="container--question">
                    <div className="container--question--header">
                        <h2>Where is my Cart saved ?</h2>
                    </div>

                    <div className="container--answer">
                        <p>All items from your Cart are saved to local storage</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default FAQ;