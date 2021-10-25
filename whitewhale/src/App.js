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
        if (!responseData) {
            return <div>Loading ...</div>
        }
        else if (responseData.length === 0) {
            return <div>No Blog Posts have been Published.</div>
        }
        else {
            return responseData.map(entry => {
                return (
                    <table key={entry.slug}>
                        <tbody>
                        <tr>
                            <td>{entry.title}</td>
                        </tr>
                        <tr>
                            <td>{entry.publish_date}</td>
                        </tr>
                        <tr>
                            <td>{entry.slug}</td>
                        </tr>

                        </tbody>
                    </table>
                )
            })
        }
    }

    return (
        <div className="App">
            <button type='button' onClick={fetchData}>Click for Data</button>

            {renderTable()}

        </div>
    );
}

export default App;
