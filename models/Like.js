/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const likeSchema = new Schema(
    {
        //TODO Finalize if we are using useState or to show who liked the post 
        state: {
            type: Boolean,
            default: false
        },
        userId: {
             type: Schema.Types.ObjectId,
             ref: 'User'
         },
        date: {
            type: Date,
            default: Date.now()
        },
    },
    {
        timeStamps: true
    }
)

module.exports = mongoose.model('Like', likeSchema);*/