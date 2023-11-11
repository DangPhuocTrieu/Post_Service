import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import postRoute from './routes/Post.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('Connected to MongoDB');
});

const app = express();
app.use(express.json());


// Routes
app.use('/api/post', postRoute);

// Start server
app.listen(9000, () => {
    console.log('Product API started on PORT 9000');
});

