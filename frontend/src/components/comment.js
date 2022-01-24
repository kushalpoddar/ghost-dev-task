import React, {useEffect, useState} from "react";
import axios from 'axios'
import CommentList from './comment_list'
import NewComment from './new_comment'
import {BASE_URL} from "../assets/js/config.js"
import "../assets/css/style.css"
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const Comment = ({single_comment, show_reply, socket}) => {
    const [comment, setComment] = useState(single_comment)
    const [isReplying, setIsReplying] = useState(false)

    useEffect(() => {
        if(socket){
        socket.on('upvote-updated', function(data){
            if(data.comment_id === comment.id){
                setComment({ ...comment, upvote_count : data.upvote_count })
            }
        })
        }
    }, [socket, comment])
    
    const timeDifference = (time_stamp) => {
        return dayjs(time_stamp).fromNow()
    }

    const addCommentUpvote = (comment_id) => {
        axios.post(`${BASE_URL}article/comment/upvote`, { comment_id }).then(res => {
            const upvote_count = comment.upvote_count + 1
            setComment({...comment, upvote_count})
            socket.emit('notify-upvote-update', {comment_id, upvote_count})
        })
    }

    const addComment = (data) => {
        setComment({...comment, children : [data, ...comment.children] })
    }

    const replyComment = () => {
        setIsReplying(!isReplying)
    }
    return (
        <div key={comment.id} className="comment-group">
            <div className="avatar">
                <img alt={comment.name} src={comment.profile_image} />
            </div>
            <div className="comment">
                <p><b>{comment.name}</b> {timeDifference(comment.time_stamp)}</p>
                <p>{comment.comment}</p>
                <div className="w100">
                    <button onClick={() => addCommentUpvote(comment.id)} className="button is-white pl-0">
                        <i className="mdi mdi-triangle"></i>&nbsp;&nbsp;&nbsp;Upvote ({comment.upvote_count})
                    </button>
                    {show_reply ? <button onClick={replyComment} className="button is-white">Reply</button> : null}
                    
                </div>
                { isReplying ? <NewComment addComment={addComment} parent={comment.id} /> : null}
                { (comment.children && comment.children.length) ? 
                <CommentList comments={comment.children} socket={socket} /> : null }
                
            </div>     
        </div>
    )
}

export default Comment