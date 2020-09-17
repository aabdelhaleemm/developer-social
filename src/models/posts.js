const mongoose = require('mongoose');
const { schema } = require('./users');

const postsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    text: {
        type: String,
        required: true
    },
    likes: [mongoose.Schema.Types.ObjectId],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            defult: Date.now
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

const posts = mongoose.model('posts', postsSchema)
module.exports = posts