import blacklistModel from '../models/blacklist.model.js';
import Caption from '../models/caption.schema.js';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
export const authUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
      success: false,
    });
  }

  const isTokenBlacklisted = await blacklistModel.findOne({ token });
  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: 'Unauthorized',
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: 'Unauthorized',
        success: false,
      });
    }
    console.log("decoded", decoded);

    const user = await User.findById(decoded._id).select('-password');

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized',
        success: false,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in authUser:', error);
    return res.status(401).json({
      message: 'Unauthorized',
      success: false,
      error: error.message,
    });
  }
}

export const authCaption = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
      success: false,
    });
  }

  const isTokenBlacklisted = await blacklistModel.findOne({ token });
  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: 'Unauthorized',
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: 'Unauthorized',
        success: false,
      });
    }


    const caption = await Caption.findById(decoded._id).select('-password');

    if (!caption) {
      return res.status(401).json({
        message: 'Unauthorized',
        success: false,
      });
    }

    req.caption = caption;
    next();
  } catch (error) {
    console.error('Error in authCaption:', error);
    return res.status(401).json({
      message: 'Unauthorized',
      success: false,
      error: error.message,
    });
  }
}