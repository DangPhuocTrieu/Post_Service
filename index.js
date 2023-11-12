import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import productService from './services/Product_Service.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('Connected to MongoDB');
});


// Services
app.use('/api/product-service', productService);

// Start server
app.listen(9000, () => {
    console.log('Product Service API started on PORT 9000');
});

