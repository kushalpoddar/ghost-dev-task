const express = require('express')
const router = express.Router()
const {getAllArticles, getSingleArticle} = require('../controller/article')

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

module.exports = router