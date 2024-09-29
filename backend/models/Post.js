import mongoose from 'mongoose';

const {Schema} = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        validate: [value => value.lenght <=  500, 'Content must be up to 500 characters long']
    },
    image: {
        type: String,
        default: null
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Post = mongoose.model('Post', postSchema)

export default Post