const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({

    commentCognitoId:{
        type:String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema);