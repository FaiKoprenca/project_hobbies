const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    text: {
        type: String
    }
})

module.exports = mongoose.model('Comment', commentSchema);