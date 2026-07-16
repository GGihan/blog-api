import { prisma } from "../../lib/prisma.js";
import { matchedData } from 'express-validator';
import { validatePost } from "../middleware/validators.js";
import { handleValidation } from "../middleware/handleValidation.js";

// Controls
export const getAllPosts = async (req, res) => {
  const userRole = req.user?.role;
  let allPosts = [];
  
  if (userRole === 'AUTHOR') {
    allPosts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } else {
    allPosts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  }
  
  res.json({
    success: true,
    posts: allPosts,
  });
};

export const getPostById = async (req, res) => {
  const postId = parseInt(req.params.postId);
  const userRole = req.user?.role;
  const post = await prisma.post.findUnique({
    where: { id: postId }
  });

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found.",
    });
  }

  if (!post.published && userRole !== 'AUTHOR') {
    return res.status(404).json({
      success: false,
      message: "Post not found.",
    });
  }

  res.json({
    success: true,
    post,
  });
};

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