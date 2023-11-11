import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description : {
        type: String,
        required: true
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Post = mongoose.model('Post', postSchema); 

export default Post