import React from "react";
import axios from 'axios'
import {Remarkable} from 'remarkable';
import './App.css';
import './Blog.css';

var md = new Remarkable();


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
                    <div key={entry.slug}>
                        <section className="post">
                            <header className="post-header">
                                <h2 className="post-title">{entry.title}</h2>

                                <p className="post-meta">
                                    By <a href={"mailto:" + entry.author.user.email}
                                          className="post-author">{entry.author.user.first_name} {entry.author.user.last_name}</a>
                                    <a className="post-category post-category-pure"
                                       href={entry.author.website}>Website</a>
                                </p>
                            </header>

                            <div className="post-description">
                                <div dangerouslySetInnerHTML={{__html: md.render(entry.body)}}/>
                            </div>
                        </section>
                    </div>

                )
            })
        }
    }

    return (
        <div className="pure-g">
            <div className="pure-u-6-24">
                <button type='button' onClick={fetchData}>Click for Data</button>
            </div>
            <div className="pure-u-12-24">{renderBlogEntries()}</div>
            <div className="pure-u-6-24"><p>Right Side</p></div>
        </div>
    );
}

export default App;
