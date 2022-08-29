const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    date: {
        type: Date,
        default: Date.now
      }

},
{
    timeStamps: true
})

module.exports = mongoose.model('Post', PostSchema);