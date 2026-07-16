import { prisma } from "../../lib/prisma.js";
import { matchedData } from 'express-validator';
import { validatePost } from "../middleware/validators.js";
import { handleValidation } from "../middleware/handleValidation.js";

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
export const createPost = [
  validatePost,
  handleValidation,
  async (req, res) => {
    let { title, content } = matchedData(req);
    const userId = req.user.id;
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
  },
];