import React from 'react';


const CommentForm = () => {
    return (
        <div>
            <h4>Add New Comment</h4>
            <Formik
                initialValues={{name: "", email: "", response: ""}}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                <label>
                    Name:
                    <input type="text" name="name"/>
                </label>
                <label>
                    E-mail:
                    <input type="text" name="email"/>
                </label>
                <label>
                    Response:
                    <input type="text" name="response"/>
                </label>
                <button type="submit">Submit</button>
            </Formik>
        </div>
    )
}
export default CommentForm
