import Post from '../models/Post.js';
import cloudinary from '../config/cloudinary.js';

const createPost = async (req, res) => {
    try {
        const currentUser = req.user._id
        const { title, content } = req.body
        // console.log("current user: ", currentUser)

        let result;

        if(req.file) {
            let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString('base64')}`

            result = await cloudinary.uploader.upload(encodedImage, {
                resource_type: 'image',
                transformation: [{ width: 500, height: 500, crop: 'limit'}],
                encoding: 'base64'
            })
        }

        const post = new Post({
            title: title,          
            content: content,
            image: result?.url || null,
            author: currentUser
        })

        await post.save()

        res.status(201).send(post)
        
    } catch (err) {
        console.log(`Error occured at creating post ${err}`)
        res.status(400).send(err.message)
    }
}


export default createPost
