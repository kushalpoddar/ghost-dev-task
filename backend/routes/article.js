const express = require('express')
const router = express.Router()
const {getAllArticles, getSingleArticle, getSingleArticleCommentsAndUpvotes, addComment} = require('../controller/article')

//Get all articles
router.get('/', async(req, res) => {
    const articles = await getAllArticles()
	return res.send(articles)
})

//Get a single article
router.get('/:id', async(req, res) => {
    const article_id = req.params.id
    const article = await getSingleArticle(article_id)
	return res.send(article)
})

//Get all comments of a single article
router.get('/:id/comment', async(req, res) => {
    const article_id = req.params.id
    const article = await getSingleArticleCommentsAndUpvotes(article_id)
    return res.send(article)
})

//Insert a comment in an article
router.post('/comment', async(req, res) => {
    const article_id = req.body.article_id
    const user_id = req.body.user_id
    const comment = req.body.comment
    const article = await addComment({ article_id, user_id, comment })
	return res.send(article)
})

module.exports = router