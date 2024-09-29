import express from 'express'
import createPost from '../controller/postController.js'
import authentication from '../middleware/authentication.js'
import upload from '../middleware/upload.js'

const postRouter = express.Router()

postRouter.post('/create-post', authentication, upload.single('image'), createPost) 

export default postRouter