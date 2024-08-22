import express from 'express';
import connectDB from './config/db.js';
import { registerUser } from './controller/userController.js';

const app = express();
const PORT = 5000;

app.use(express.json())

app.post('/api/register-user', registerUser);

connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
})