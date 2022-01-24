const express = require('express')
const cors = require('cors')
const history = require('connect-history-api-fallback');
const path = require('path')
const app = express()

app.use(express.json())

//Using the cors headers to allow only from the request
app.use(cors())

//Route handlers
const article_route = require('./routes/article')

//Routes
app.use('/api/article', article_route)

// 1st call for unredirected requests 
app.use(express.static(path.join(__dirname + '/dist')))
// Support history api 
app.use(history());
// 2nd call for redirected requests
app.use(express.static(path.join(__dirname + '/dist')))

//Setting up WebServer
const PORT = 6227
const server = app.listen(PORT, async() => {
	console.log(`Running on Port ${PORT}`)
})

