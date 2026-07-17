import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma.js';

// Read header token 
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. Please log in.' 
    });
  }
  // Verify the token
  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Attach payload (user information) to request user property
    req.user = decodedPayload;
    
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Session expired or invalid token. Please log in.' 
    });
  }
};

export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return next();
  }

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedPayload;
    
    next();
  } catch (error) {
    next();
  }
};

export const isAuthor = (req, res, next) => {
  if (req.user.role !== 'AUTHOR') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. You must be an Author to perform this action.'
    });
  }
  next();
};

export const verfiyCommentAccess = async (req, res, next) => {
  const userId = req.user.id;
  const userRole = req.user.role;
  const commentId = parseInt(req.params.commentId);
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found."
      });
    }

    const isCommentOwner = comment.userId === userId;
    const isAuthor = userRole === 'AUTHOR';
    // Branching Authorization Logic based on the request method
    if (req.method === 'DELETE') {
      if (!isCommentOwner && !isAuthor) {
        return res.status(403).json({ success: false, message: "Forbidden." });
      }
    } else if (req.method === 'PATCH') {
      if (!isCommentOwner) {
        return res.status(403).json({ success: false, message: "Forbidden." });
      }
    }
    
    next();
  } catch (error) {
    next(error)
  }
};