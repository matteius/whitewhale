import React from "react";
import './App.css';
import Post from './components/Post'

function App() {
    let [responseData, setResponseData] = React.useState('');
    axios({
        "method": "GET",
        "url": "/blog/posts/",
        "headers": {
            "content-type": "application/json"
        }
    })
        .then((response) => {
            setResponseData(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    return (
    <div className="App">
      <Post />
    </div>
    );
}

export default App;
