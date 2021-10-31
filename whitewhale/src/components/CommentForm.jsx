import axios from 'axios'
import {Formik, Field, Form} from "formik";
import getCookie from "../utils"


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

console.log('Now the value for NODE_ENV is:', process.env.NODE_ENV);
var apiUrl = process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_SERVER;


var csrftoken = getCookie('csrftoken');


const CommentForm = (entry_id) => {
    console.log(entry_id);
    return (
        <div>
            <h4>Add New Comment</h4>
            <Formik
                initialValues={{csrfmiddlewaretoken: csrftoken, entry: entry_id.entry_id,
                    email: "", name: "", response: ""}}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    var headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    }
                    axios.post( apiUrl + '/blog/comment/', values, headers)
                        .then(response => { console.log('The response was: ' + response) })
                        .catch(error => {
                            console.error('There was an error!', error);
                        });
                }}
            >
                <Form>
                    <label>
                        Name:
                        <Field name="name" type="text"/>
                    </label><br/>
                    <label>
                        E-mail:
                        <Field name="email" type="email"/>
                    </label><br/>
                    <label>
                        Response:
                        <Field name="response" type="text"/>
                    </label><br/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}
export default CommentForm
