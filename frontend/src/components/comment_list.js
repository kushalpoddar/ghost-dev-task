import React from "react";
import Comment from './comment'

const CommentList = ({comments}) => {
    
    return (
        comments.map(comment => {
            return <Comment single_comment={comment} key={comment.id} show_reply={false} /> 
        })
    )
}

export default CommentList