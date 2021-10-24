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
    const fetchData = React.useCallback(() => {
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
    }, [])

    React.useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className="App">
            <button type='button' onClick={fetchData}>Click for Data</button>
            <pre>
        <code>
          {responseData && JSON.stringify(responseData, null, 4)}
        </code>
      </pre>
            <Post/>
        </div>
    );
}

export default App;
