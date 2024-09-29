import express from 'express';
import connectDB from './config/db.js';
import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser';
import postRouter from './routes/post.js';

const app = express();
const PORT = 5000;

app.use(express.json())
app.use(cookieParser());

app.use('/api/user', userRouter)
app.use('/api/post', postRouter)

connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
})