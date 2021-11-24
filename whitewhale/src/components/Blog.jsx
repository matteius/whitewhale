import React from 'react';
import axios from 'axios'
import {Remarkable} from 'remarkable';

import CommentForm from "./CommentForm";
import Comments from "./Comments";
import '../css/Blog.css';


console.log('NODE_ENV value:', process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

console.log('Now the value for NODE_ENV is:', process.env.NODE_ENV);
var apiUrl = process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_SERVER;

const md = new Remarkable();


const Blog = (props) => {
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
                let publish_date = new Date(entry.publish_date);
                return (
                    <div key={entry.slug}>
                        <section className="blog-post">
                            <header className="blog-post-header">
                                <h2 className="blog-post-title">{entry.title}</h2>

                                <p className="blog-post-meta">
                                    By <a href={"mailto:" + entry.author.user.email}
                                          className="blog-post-author">{entry.author.user.first_name} {entry.author.user.last_name}</a>
                                    &nbsp;on {publish_date.toLocaleString()}
                                </p>
                            </header>

                            <div className="blog-post-description">
                                <div dangerouslySetInnerHTML={{__html: md.render(entry.body)}}/>
                            </div>
                            <div className="blog-post-comments"></div>
                            <CommentForm entry_id={entry.id}/>
                            <Comments comments={entry.comments}/>
                        </section>
                    </div>

                )
            })
        }
    };

    return (
        <>
            <div className="container">
                <div className="blog-header">
                    <h1 className="blog-title">Whitewhale.mobi Blog</h1>
                    <p className="lead blog-description">Blog that is mostly about development of an open source blog.</p>
                </div>
                <div className="row">
                    <div className="col-sm-9 blog-main">
                        <div>{renderBlogEntries()}</div>
                        <button type='button' onClick={fetchData}>Click for Data</button>
                        <nav>
                            <ul className="pager">
                                <li><a href="#">Previous</a></li>
                                <li><a href="#">Next</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-sm-2 col-sm-offset-1 blog-sidebar">
                        <div className="sidebar-module sidebar-module-inset">
                            <h4>About</h4>
                            <p>Perhaps bio goes here.</p>
                        </div>
                        <div className="sidebar-module">
                            <h4>Archives</h4>
                            <ol className="list-unstyled">
                                <li><a href="#">November 2021</a></li>
                                <li><a href="#">October 2021</a></li>
                            </ol>
                        </div>
                        <div className="sidebar-module">
                            <h4>Elsewhere</h4>
                            <ol className="list-unstyled">
                                <li><a href="#">GitHub</a></li>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">Facebook</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blog;
