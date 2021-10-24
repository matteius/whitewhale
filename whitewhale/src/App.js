import React from "react";
import axios from 'axios'
import './App.css';
import Post from './components/Post'

console.log('No value for FOO yet:', process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log('Now the value for FOO is:', process.env.NODE_ENV);
var apiUrl = process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_SERVER;
console.log(apiUrl);


function App() {
    let [responseData, setResponseData] = React.useState('');
    axios({
        "method": "GET",
        "url": apiUrl + '/blog/posts/',
        "headers": {
	    "Accept": "application/json",
            "Content-Type": "application/json"
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
      <pre>
        <code>
          {responseData && JSON.stringify(responseData, null, 4)}
        </code>
      </pre>
      <Post />
    </div>
    );
}

export default App;
