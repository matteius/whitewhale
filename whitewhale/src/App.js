import React, {Component} from "react";
import {Link, Route, Routes} from "react-router-dom";

import './App.css';
import Blog from "./components/Blog";
import './css/Blog.css';
import About from "./components/About";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTN8kwuUOn7G4QbKLB0cRDijR_zCeik1Q",
  authDomain: "whitewhale-mobi.firebaseapp.com",
  projectId: "whitewhale-mobi",
  storageBucket: "whitewhale-mobi.appspot.com",
  messagingSenderId: "952669408642",
  appId: "1:952669408642:web:1f041b2a00c0247e41139b",
  measurementId: "G-ZM8S8NHD8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

class App extends Component {
    constructor(props) {
        super(props);
        logEvent(analytics, 'page_view');
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
