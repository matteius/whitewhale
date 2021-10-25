import React from "react";
import axios from 'axios'
import './App.css';
import './Blog.css';

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


    const renderBlogEntries = () => {
        if (!responseData) {
            return <div>Loading ...</div>
        } else if (responseData.length === 0) {
            return <div>No Blog Posts have been Published.</div>
        } else {
            return responseData.map(entry => {
                return (
                    <div>
                        <section class="post">
                            <header class="post-header">
                                <h2 class="post-title">{entry.title}</h2>

                                <p class="post-meta">
                                    By <a href="#" class="post-author">Matt Davis</a> under <a
                                    class="post-category post-category-design" href="#">CSS</a> <a
                                    class="post-category post-category-pure" href="#">Pure</a>
                                </p>
                            </header>

                            <div class="post-description">
                                <p>
                                    {entry.body}
                                </p>
                            </div>
                        </section>
                    </div>

                )
            })
        }
    }

    return (
        <div className="pure-g">
            <div className="pure-u-5-24"><button type='button' onClick={fetchData}>Click for Data</button></div>
            <div className="pure-u-14-24">{renderBlogEntries()}</div>
            <div className="pure-u-5-24"><p>Right Side</p></div>
        </div>
    );
}

export default App;
