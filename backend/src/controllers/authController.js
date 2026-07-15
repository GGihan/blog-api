import { prisma } from "../../lib/prisma.js";
import { body, validationResult, matchedData } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Controls
// add validation later on
export const registerUser = async (req, res) => {
  let { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  // generate token for immediate login
  const token = jwt.sign(
    { 
      id: newUser.id,
      role: newUser.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1d' }
  );

  res.status(201).json({
    success: true,
    message: 'Registration complete.',
    token,
    user: {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
    },
  });
};

export const loginUser = async (req, res) => {
  let { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password.',
    });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password.',
    });
  }

  const token = jwt.sign(
    { 
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1d' }
  );

  res.json({
    success: true,
    message: 'Login complete.',
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  });
};