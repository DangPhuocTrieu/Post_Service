import express from "express";
import Product from "../models/Product.js";
import { verifyPermission } from '../middleware/verifyPermission.js';

const router = express.Router();

// Lấy tất cả sản phẩm
router.get('/getAll', verifyPermission, async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ 
            success: true, 
            message: 'Lấy tất cả sản phẩm thành công', 
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
})

// Lấy sản phẩm theo id
router.get('/get/:id', verifyPermission, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({ 
            success: true,
            message: 'Lấy sản phẩm thành công',
            data: product 
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        })
    }
})

// Thêm sản phẩm
router.post('/create', verifyPermission, async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(200).json({
            success: true,
            message: 'Thêm sản phẩm thành công',
            product: savedProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

// Sửa sản phẩm theo id
router.put('/edit/:id', verifyPermission, async (req, res) => {
    const id = req.params.id;

    try {
        await Product.findOneAndUpdate({ _id: id }, { ...req.body });
        res.status(200).json({
            success: true,
            message: 'Sửa sản phẩm thành công'
         });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

// Xóa sản phẩm
router.delete('/delete/:id', verifyPermission, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Xóa sản phẩm thành công'
         });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

export default router