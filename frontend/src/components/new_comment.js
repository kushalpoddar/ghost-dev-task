import React, {useState} from "react";
import axios from 'axios'
import {BASE_URL} from "../assets/js/config.js"
import "../assets/css/style.css"
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const Comment = ({addComment, parent}) => {
    const [new_comment, setNewCommentValue] = useState([])
    const commentNow = () => {
        axios.post(`${BASE_URL}article/comment`, { article_id : 1, comment : new_comment, parent }).then(res => {
          const data = res.data
          addComment(data)
        //   setComments([data, ...comments])
        })
    }
    return (
        <div className="new-comment-group">
            <div className="avatar">
                <img alt="my-avatar" src="https://www.whatsappimages.in/wp-content/uploads/2021/04/Sad-Whatsapp-Dp-Profile-Photo-HD-Download.jpg" />
            </div>
            <div id="new-comment">
                <input value={new_comment} onChange={(e) => setNewCommentValue(e.target.value)} placeholder="What are your thoughts?" className="input" id="new-comment-input" />
            </div>

            <button onClick={() => commentNow()} id="new-comment-button" className="button is-primary">Comment</button>
        </div>
        
    )
}

export default Comment