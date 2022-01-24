import React from "react";
import Comment from './comment'

const CommentList = ({comments, socket}) => {
    
    return (
        comments.map(comment => {
            return <Comment single_comment={comment} key={comment.id} show_reply={false} socket={socket} /> 
        })
    )
}

export default CommentList