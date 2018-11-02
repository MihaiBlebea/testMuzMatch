const connect = require('./../connect')

const CommentSchema = connect.Schema({
    message: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})

CommentSchema.methods.toJSON = function() {
    var commentObject = this.toObject()
    return {
        _id:     commentObject._id,
        message: commentObject.message,
        author:  commentObject.author
    }
}

const Comment = connect.model('Comment', CommentSchema)

module.exports = Comment
