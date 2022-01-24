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

module.exports = {
    getAllArticles,
    getSingleArticle
}