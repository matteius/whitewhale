import React from "react";
import axios from 'axios'
import './App.css';

console.log('NODE_ENV value:', process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

console.log('Now the value for NODE_ENV is:', process.env.NODE_ENV);
var apiUrl = process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_SERVER;


function App() {
    let [responseData, setResponseData] = React.useState(null);
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
            console.log(response.data);
            setResponseData(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    React.useEffect(() => {
        fetchData()
    }, [fetchData])


    const renderTable = () => {
      if (responseData) {
        return responseData.map(entry => {
          return (
            <tr key={entry.slug}>
              <td>{entry.title}</td>
              <td>{entry.publish_date}</td>
              <td>{entry.slug}</td>
            </tr>
          )
        })
      } else {
        return <div>Loading ...</div>
      }
    }

    return (
        <div className="App">
            <button type='button' onClick={fetchData}>Click for Data</button>
	    <table><tbody>
	     { renderTable() }
            </tbody></table>
        </div>
    );
}

export default App;
