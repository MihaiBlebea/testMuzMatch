require('dotenv').config()

const Comment = require('./models/Comment')
const jsonFile = require('./comments.json')

const populate = (comments, callback)=> {
    let count = 0
    comments.map((item)=> {
        var comment = new Comment({
            message: item.message,
            author:  item.author
        })

        comment.save().then((result)=> {
            if(count == comments.length - 1)
            {
                if(callback)
                {
                    callback()
                }
            }
            count++
        }).catch((error)=> {
            console.log(error)
        })
    })
}

populate(jsonFile, ()=> {
    process.exit(0)
})
