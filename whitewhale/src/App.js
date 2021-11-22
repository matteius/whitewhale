import React, {Component} from "react";
import './App.css';


import Blog from "./components/Blog";
import './css/Blog.css';



class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className="blog-masthead">
                    <div className="container">
                        <nav className="blog-nav">
                            <a className="blog-nav-item active" href="#">Home</a>
                            <a className="blog-nav-item" href="#">App2</a>
                            <a className="blog-nav-item" href="#">About</a>
                        </nav>
                    </div>
                </div>
                <Blog />
            </>
        );
    }
}

export default App;
