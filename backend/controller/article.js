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
    const query = "SELECT TT.*, users.name, users.profile_image FROM (SELECT T.*, SUM(upvote_weight) as upvote_count FROM (SELECT article_details.*, upvotes.id as upvote_id, (case when(upvotes.id IS NULL) then 0 else 1 end) as upvote_weight FROM article_details LEFT JOIN upvotes on upvotes.comment_id = article_details.id) as T group by id) as TT JOIN users on TT.user_id = users.id and TT.article_id = ? ORDER BY parent ASC, time_stamp DESC"
    return new Promise((resolve, reject) => {
        conn.query(query, [id], (err, data) => {
            if(err){
                console.error(err)
                return reject(err)
            }
            
            // Looping over every data points
            let new_data = {}
            let parent_data = [] // For maintaining the sort position
            for(let row of data){
                if(!row['parent']){
                    row['children'] = []
                    new_data[row['id']] = row
                    parent_data.push(row['id'])
                }else{
                    new_data[row['parent']].children.push(row)
                }
            }
            let lst = []
            for(let id of parent_data){
                lst.push(new_data[id])
            }
            return resolve(lst)
        })
    })
}

const getComment = (id) => {
    const query = "SELECT TT.*, users.name, users.profile_image FROM (SELECT T.*, SUM(upvote_weight) as upvote_count FROM (SELECT article_details.*, upvotes.id as upvote_id, (case when(upvotes.id IS NULL) then 0 else 1 end) as upvote_weight FROM article_details LEFT JOIN upvotes on upvotes.comment_id = article_details.id and article_details.id = ?) as T group by id) as TT JOIN users on TT.user_id = users.id"
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

const addComment = ({ article_id, user_id, comment, parent }) => {
    // Selecting all 
    const query = "INSERT INTO article_details(article_id, user_id, comment, parent) value(?, ?, ?, ?)"
    return new Promise((resolve, reject) => {
        conn.query(query, [article_id, user_id, comment, parent], async(err, data) => {
            if(err){
                console.error(err)
                return reject(err)
            }

            const new_comment = await getComment(data.insertId)
            new_comment.children = []
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