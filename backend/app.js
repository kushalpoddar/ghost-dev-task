const express = require('express')
const cors = require('cors')
const history = require('connect-history-api-fallback');
const path = require('path')
const app = express()
const http = require('http').Server(app)
app.use(express.json())

//Using the cors headers to allow only from the request
app.use(cors())

//Route handlers
const article_route = require('./routes/article')

//Routes
app.use('/api/article', article_route)

// 1st call for unredirected requests 
app.use(express.static(path.join(__dirname + '/build')))
// Support history api 
app.use(history());
// 2nd call for redirected requests
app.use(express.static(path.join(__dirname + '/build')))

//Setting up WebServer
const PORT = 6227
const server = http.listen(PORT, async() => {
	console.log(`Running on Port ${PORT}`)
})

const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});

io.on('connection', function(socket){
    console.log('A user connected');
  
    socket.on('notify-upvote-update', function(data){
        socket.broadcast.emit('upvote-updated', data)
    })
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });