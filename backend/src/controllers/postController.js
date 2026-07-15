import { prisma } from "../../lib/prisma.js";
import { body, validationResult, matchedData } from 'express-validator';

// Controls
export const getAllPosts = async (req, res) => {
  const allPosts = await prisma.post.findMany();
  
  res.json({
    success: true,
    posts: allPosts,
  });
};

// export const getPostById = async (req, res) => {

// };

// add validation later on
export const createPost = async (req, res) => {
  let { title, content } = req.body;
  const userId = 1; // change this to real user later on
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      userId,
    },
  });

  res.status(201).json({
    success: true,
    message: 'New post created.',
    post: newPost,
  });
};