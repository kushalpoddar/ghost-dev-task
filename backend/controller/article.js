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
    const query = "SELECT article_details.*, users.name, profile_image FROM article_details JOIN users on article_details.user_id = users.id and article_id = ?"
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

const addComment = ({ article_id, user_id, comment }) => {
    // Selecting all 
    const query = "INSERT INTO article_details(article_id, user_id, comment) value(?, ?, ?)"
    return new Promise((resolve, reject) => {
        conn.query(query, [article_id, user_id, comment], (err, data) => {
            if(err){
                console.error(err)
                return reject(err)
            }
            return resolve(data)
        })
    })
}

module.exports = {
    getAllArticles,
    getSingleArticle,
    getSingleArticleCommentsAndUpvotes,
    addComment
}