import axios from 'axios'
import {Formik, Field, Form} from "formik";

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

console.log('Now the value for NODE_ENV is:', process.env.NODE_ENV);
var apiUrl = process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_SERVER;


const CommentForm = (entry_id) => {
    return (
        <div>
            <h4>Add New Comment</h4>
            <Formik
                initialValues={{name: "", email: "", response: ""}}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    alert(JSON.stringify(values, null, 2));
                    axios.post( apiUrl + '/blog/comment/', values)
                        .then(response => { console.log('The response was: ' + response) })
                        .catch(error => {
                            console.error('There was an error!', error);
                        });
                }}
            >
                <Form>
                    <input type="hidden" value={entry_id} name="entry" />
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
