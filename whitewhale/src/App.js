import React from "react";
import './App.css';
import Post from './components/Post'

function App() {
    let [responseData, setResponseData] = React.useState('');
    React.useEffect(() => {
        setResponseData('hello')
        console.log(responseData)
    }, [setResponseData, responseData])
    return (
    <div className="App">
      <Post />
    </div>
    );
}

export default App;
