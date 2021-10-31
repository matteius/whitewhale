import React from 'react';

const Comments = (comments) => {
    if (!comments.comments || comments.length === 0) {
        return <div>No comments available for this Post.</div>
    } else {
        return comments.comments.map(comment => {
                return (
                    <div key={comment.id}>
                        <p>{comment.response}<br/>
                            By:  <a href={"mailto:" + comment.email}>{comment.name}</a> on {comment.created}
                        </p>
                    </div>)
            }
        )
    }
}
export default Comments
