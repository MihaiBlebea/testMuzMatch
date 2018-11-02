require('dotenv').config()
const express    = require('express')
const app        = express()
const http       = require('http').Server(app)
const path       = require('path')
const io         = require('socket.io')(http)
const cors       = require('cors')
const bodyParser = require('body-parser')

const Comment = require('./database/models/Comment')

const port = 3000


app.use('/dist', express.static(__dirname + '/dist'))
app.use('/public', express.static(__dirname + '/public'))
app.use(cors())
app.use(bodyParser.json())


app.get('/', (request, response)=> {
    return response.sendFile(path.join(__dirname + '/public/index.html'))
})

app.post('/message', (request, response)=> {
    var comment = new Comment({
        message: request.body.message,
        author:  'Mihai Blebea'
    })

    comment.save().then((comment)=> {
        response.status(200).json(comment)
    }).catch((error)=> {
        response.status(400).json(error)
    })
})

io.on('connection', (socket)=> {
    console.log('a user connected')

    // Get all comments
    Comment.find({}).then((comments)=> {

        setInterval(()=> {
            socket.emit('send-message', JSON.stringify( comments[0] ))
        }, 5000)

    }).catch((error)=> {
        console.log(error)
    })

    // setTimeout(()=> {
    //     socket.emit('test', 700)
    // }, 5000)

    socket.on('disconnect', ()=> {
        console.log('user disconnected')
    })
})


http.listen(port, ()=> {
    console.log(`Example app listening on port ${port}!`)
})
