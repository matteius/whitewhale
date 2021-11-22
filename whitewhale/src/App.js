import React, {Component} from "react";
import { Routes, Route, Link } from "react-router-dom";

import './App.css';
import Blog from "./components/Blog";
import './css/Blog.css';


function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}


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
                            <Link className="blog-nav-item" to="/">Blog</Link>
                            <Link className="blog-nav-item" to="/app2">App2</Link>
                            <Link className="blog-nav-item" to="/about">About</Link>
                        </nav>
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={<Blog />}/>
                    <Route path="/app2" element={<Blog />}/>
                    <Route path="/about" element={<About />}/>
                </Routes>
            </>
        );
    }
}

export default App;
