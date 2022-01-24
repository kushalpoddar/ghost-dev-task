import React, {useState, useEffect} from "react";
import Comment from '../../components/comment'
import NewComment from '../../components/new_comment'
import axios from 'axios'
import {BASE_URL, SOCKET_URL} from "../../assets/js/config.js"
import "../../assets/css/style.css"
import io from 'socket.io-client';

const HomePage = () => {
  const [comments, setComments] = useState([])
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}article/1/comment`).then(res => {
      setComments(res.data)
    })
    const newSocket = io(SOCKET_URL);
    
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

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
                return <Comment socket={socket} key={comment.id} single_comment={comment} show_reply={true} /> 
                }) 
              }
            </div>

            
        </div>
    </div>
  );
};

export default HomePage;
