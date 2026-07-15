import jwt from 'jsonwebtoken';

// Check if logged in and attach payload to request
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
  
    req.user = decodedPayload;
    
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Session expired or invalid token. Please log in.' 
    });
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