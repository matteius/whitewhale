import {Formik, Field, Form} from "formik";


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
                <Form>
                    <label>
                        Name:
                        <Field name="name" type="text"/>
                    </label>
                    <label>
                        E-mail:
                        <Field name="email" type="text"/>
                    </label>
                    <label>
                        Response:
                        <Field name="response" type="text"/>
                    </label>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}
export default CommentForm
