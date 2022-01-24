import React, {useState, useEffect} from "react";
import Comment from '../../components/comment'
import NewComment from '../../components/new_comment'
import axios from 'axios'
import {BASE_URL} from "../../assets/js/config.js"
import "../../assets/css/style.css"

const HomePage = () => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    axios.get(`${BASE_URL}article/1/comment`).then(res => {
      setComments(res.data)
    })
  }, [])

  const addComment = (data) => {
    setComments([data, ...comments])
  }

  return (
    <div className="page-wrapper">
        <div className="container">
            <div className="row top-part">
                <h2>Discussion</h2>
                <NewComment addComment={addComment} parent={null} />
                
            </div>
            <div className="row bottom-part">
              
              { comments.map(comment => {
                return <Comment key={comment.id} single_comment={comment} show_reply={true} /> 
                }) 
              }
            </div>

            
        </div>
    </div>
  );
};

export default HomePage;
