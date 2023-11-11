import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { verifyPermission } from "../middleware/verifyPermission.js";

const router = express.Router();

// Lấy tất cả bài viết
router.get('/', verifyPermission, async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ 
            success: true, 
            message: 'Lấy tất cả bài viết thành công', 
            data: posts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
})

// Lấy bài viết theo id
router.get('/:id', verifyPermission, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('User', ['Username', 'Email']);
        res.status(200).json({ 
            success: true,
            message: 'Lấy bài viết thành công',
            data: post 
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        })
    }
})

// Thêm bài viết
router.post('/create/:id', verifyPermission, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const newPost = new Post({
            ...req.body,
            User: user._id
        });

        const savedPost = await newPost.save();
        await user.updateOne({ $push: { Posts: savedPost._id } })
        console.log(newPost);

        res.status(200).json({
            success: true,
            message: 'Thêm bài viết thành công',
            product: savedPost
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

export default router