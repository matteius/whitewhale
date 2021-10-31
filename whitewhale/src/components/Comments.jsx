import React from 'react';

const Comments = (comments) => {
    if (!comments.comments || comments.length === 0) {
        return <div>No comments available for this Post.</div>
    } else {
        return (<div><h4>Approved Comments</h4>
            {comments.comments.map(comment => {
                    let date = new Date(comment.created);
                    let name = comment.name;
                    if (comment.email) {
                        name = <a href={"mailto:" + comment.email}>{comment.name}</a>;
                    }
                    return <div key={comment.id} className="comment">
                        <div className="row">{comment.response}</div>
                        <div className="row">By: {name} on {date.toLocaleString()}</div>
                    </div>
                }
            )}
        </div>)
    }
}
export default Comments

