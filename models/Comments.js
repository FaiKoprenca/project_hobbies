const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    
    //TODO Cognito ID
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    /*postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },*/
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema);