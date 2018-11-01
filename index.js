require('dotenv').config()
const express = require('express')
const app     = express()
const http    = require('http').Server(app)
const path    = require('path')
const io      = require('socket.io')(http)

const Comment = require('./database/models/Comment')

const port = 3000


app.use('/dist', express.static(__dirname + '/dist'))


app.get('/', (request, response)=> {
    return response.sendFile(path.join(__dirname + '/public/index.html'));
})

io.on('connection', (socket)=> {
    console.log('a user connected')

    setTimeout(()=> {
        socket.emit('test', 700)
    }, 5000)

    socket.on('disconnect', ()=> {
        console.log('user disconnected')
    })
})


http.listen(port, ()=> {
    console.log(`Example app listening on port ${port}!`)
})
