import React from 'react';

const Comments = (comments) => {
    if (!comments.comments || comments.length === 0) {
        return <div>No comments available for this Post.</div>
    } else {
        return comments.comments.map(comment => {
            let name = comment.name;
            if (comment.email) {
                name =  <a href={"mailto:" + comment.email}>{comment.name}</a>;
            }
                return (
                    <div key={comment.id}>
                        <p>{comment.response}<br/>
                            By: {name} on {comment.created}
                        </p>
                    </div>)
            }
        )
    }
}
export default Comments
