const connect = require('./../connect')

const CommentSchema = connect.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false
    }
})

CommentSchema.methods.toJSON = function() {
    var commentObject = this.toObject()
    return {
        _id:        commentObject._id,
        title:      commentObject.title,
        content:    commentObject.content,
        isApproved: commentObject.isApproved,
    }
}

const Comment = connect.model('Comment', CommentSchema)

module.exports = Comment
