import React from 'react';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        alert('A new comment was submitted: ' + this.state);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h4>Add New Comment</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        E-mail:
                        <input type="text" name="email" value={this.state.name} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Response:
                        <input type="text" name="response" value={this.state.name} onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default CommentForm
