const express = require('express')
const router = express.Router()
const {getAllArticles, getSingleArticle, getSingleArticleCommentsAndUpvotes, addComment, addCommentUpvote} = require('../controller/article')

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

//Upvote a comment
router.post('/comment/upvote', async(req, res) => {
    const comment_id = req.body.comment_id
    const user_id = 1 // We will hardcode user = 1
    const upvote_new = await addCommentUpvote({ comment_id, user_id })
	return res.send(upvote_new)
})

//Insert a comment in an article
router.post('/comment', async(req, res) => {
    const article_id = req.body.article_id
    const user_id = 1 // We will hardcode user = 1
    const comment = req.body.comment
    const parent = req.body.parent
    const comment_new = await addComment({ article_id, user_id, comment, parent })
	return res.send(comment_new)
})

module.exports = router