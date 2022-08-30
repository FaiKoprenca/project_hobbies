const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const likeSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }

})

module.exports = mongoose.model('Like', likeSchema);