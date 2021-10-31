import axios from 'axios'
import {Formik, Field, Form} from "formik";
import React from 'react';
import getCookie from "../utils"


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

console.log('Now the value for NODE_ENV is:', process.env.NODE_ENV);
var apiUrl = process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_SERVER;


const CommentFormRendered = (entry_id) => {
    var csrftoken = getCookie('csrftoken');
    const [renderForm, setRenderForm] = React.useState(true);
    return (
        <div>{renderForm ? <>
            <h4>Add New Comment</h4>
            <Formik
                initialValues={{
                    csrfmiddlewaretoken: csrftoken, entry: entry_id.entry_id,
                    email: "", name: "", response: ""
                }}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    var headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    }
                    axios.post(apiUrl + '/blog/comment/', values, headers)
                        .then(response => {
                            console.log('The response was: ' + response)
                        })
                        .catch(error => {
                            console.error('There was an error!', error);
                        });
		    setRenderForm(false);
                }}
            >
                <Form className="pure-form pure-form-aligned">
                    <div className="pure-control-group">
                        <label>Name:</label>
                        <Field name="name" type="text"/>
                    </div>
                    <div className="pure-control-group">
                        <label>E-mail:</label>
                        <Field name="email" type="email"/>
                    </div>
                    <div className="pure-control-group">
                        <label>Response:</label>
                        <Field name="response" component="textarea" type="text" rows="5" cols="40"/>
                    </div>
                    <div className="pure-control-group">
                        <button type="submit">Submit</button>
                    </div>
                </Form>
            </Formik></>
		: <div>Thank you for your comment!</div>}
        </div>
    )
}


const CommentForm = (entry_id) => {
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)
    return (
        <div>
            { showResults ? <CommentFormRendered entry_id={entry_id.entry_id} /> : <input type="submit" value="Add Comment" onClick={onClick} /> }
        </div>
    )

}


export default CommentForm
