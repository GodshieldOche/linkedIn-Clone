const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true,
        trim: true,
    },
    photoUrl: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    userImg: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);