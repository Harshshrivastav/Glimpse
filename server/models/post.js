const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default:"no photo"
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }   
});

mongoose.model("Post",postSchema);