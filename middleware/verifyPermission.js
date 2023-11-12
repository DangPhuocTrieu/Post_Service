import jwt from 'jsonwebtoken';
import Token from '../models/Token.js';

export const verifyPermission = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Không tìm thấy token"
        });
    }

    const tokenDatabase = await Token.findOne({ Token: token });
    if (!tokenDatabase) {
        return res.status(403).json({
            success: false,
            message: 'Token không hợp lệ'
        });
    }

    try {
        const data = jwt.verify(token, process.env.TOKEN_KEY);
        if (data.IsAdmin) {
            next();
        } else {
            res.status(403).json({ 
                success: false,
                message: 'Bạn không phải phải là admin'
            });
        }

    } catch (error) {
        res.status(403).json({
            success: false,
            message: 'Lỗi server'
        });
    }
}