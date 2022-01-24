const { query } = require('../conn')
const conn = require('../conn')

const getAllArticles = () => {
    const query = "SELECT * FROM articles where stat=1"
    return new Promise((resolve, reject) => {
        conn.query(query, (err, data) => {
            if(err){
                console.error(err)
                return reject(err)
            }
            return resolve(data)
        })
    })
}

const getSingleArticle = (id) => {
    const query = "SELECT * FROM articles where id = ? and stat=1"
    return new Promise((resolve, reject) => {
        conn.query(query, [id], (err, data) => {
            if(err){
                console.error(err)
                return reject(err)
            }
            return resolve(data.length ? data[0] : null)
        })
    })
}

const getSingleArticleCommentsAndUpvotes = (id) => {
    // Selecting all 
    const query = "SELECT * FROM (SELECT T.*, count(*) as upvote_count FROM (SELECT article_details.*, upvotes.id as upvote_id FROM article_details LEFT JOIN upvotes on upvotes.comment_id = article_details.id) as T group by id) as TT JOIN users on TT.user_id = users.id and TT.article_id = ?"
    return new Promise((resolve, reject) => {
        conn.query(query, [id], (err, data) => {
            if(err){
                console.error(err)
                return reject(err)
            }
            return resolve(data)
        })
    })
}

const getComment = (id) => {
    const query = "SELECT * FROM article_details WHERE id = ?"
    return new Promise((resolve, reject) => {
        conn.query(query, [id], (err, data) => {
            if(err){
                console.error(err)
                return reject(err)
            }
            return resolve(data.length ? data[0] : null)
        })
    })
}

const addComment = ({ article_id, user_id, comment }) => {
    // Selecting all 
    const query = "INSERT INTO article_details(article_id, user_id, comment) value(?, ?, ?)"
    return new Promise((resolve, reject) => {
        conn.query(query, [article_id, user_id, comment], async(err, data) => {
            if(err){
                console.error(err)
                return reject(err)
            }

            const new_comment = await getComment(data.insertId)
            return resolve(new_comment)
        })
    })
}

const getCommentUpvote = (id) => {
    const query = "SELECT * FROM upvotes WHERE id = ?"
    return new Promise((resolve, reject) => {
        conn.query(query, [id], (err, data) => {
            if(err){
                console.error(err)
                return reject(err)
            }
            return resolve(data.length ? data[0] : null)
        })
    })
}

const addCommentUpvote = ({ comment_id, user_id }) => {
    // Selecting all 
    const query = "INSERT INTO upvotes(comment_id, user_id) value(?, ?)"
    return new Promise((resolve, reject) => {
        conn.query(query, [comment_id, user_id], async(err, data) => {
            if(err){
                console.error(err)
                return reject(err)
            }

            const new_upvote = await getCommentUpvote(data.insertId)
            return resolve(new_upvote)
        })
    })
}

module.exports = {
    getAllArticles,
    getSingleArticle,
    getSingleArticleCommentsAndUpvotes,
    addComment,
    addCommentUpvote
}