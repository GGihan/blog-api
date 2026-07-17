import { prisma } from "../../lib/prisma.js";
import { matchedData } from 'express-validator';

// Controls
export const getAllPosts = async (req, res) => {
  const userRole = req.user?.role;
  // Set limit for post amount per page
  const MAX_LIMIT = 50;
  const page = Math.max(1, parseInt(req.query.page) || 1);
  let limit = parseInt(req.query.limit) || 10;
  if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  } else if (limit < 1) {
    limit = 1;
  }
  const skip = (page - 1) * limit;
  // Show all unpublished posts if Author
  let whereClause = {};
  if (userRole !== 'AUTHOR') {
    whereClause = { published: true };
  }
  // Use $transaction to prevent race condition
  const [allPosts, totalPosts] = await prisma.$transaction([
    prisma.post.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: skip,
      include: {
        _count: {
          select: { comments: true },
        },
        user: {
          select: { username: true },
        },
      },
    }),
    prisma.post.count({
      where: whereClause,
    }),
  ]);
  
  res.json({
    success: true,
    posts: allPosts,
    pagination: {
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      hasMore: page * limit < totalPosts,
    },
  });
};

export const getPostById = async (req, res) => {
  const postId = parseInt(req.params.postId);
  const userRole = req.user?.role;
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      comments: {
        orderBy: { createdAt: 'desc' },
        include: {
          user: { 
            select: { username: true },
          },
        },
      },
      user: {
        select: { username: true },
      },
    },
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

export const createPost = async (req, res) => {
  let { title, content, published } = matchedData(req);
  const userId = req.user.id;
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      published,
      userId,
    },
    include: {
      user: {
        select: { username: true },
      },
    },
  });

  res.status(201).json({
    success: true,
    message: 'New post created.',
    post: newPost,
  });
};

export const updatePost = async (req, res) => {
  let { title, content, published } = matchedData(req);
  const postId = parseInt(req.params.postId);
  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { 
        title,
        content, 
        published,
      },
    });

    res.json({ 
      success: true, 
      post: updatedPost,
    });
  } catch (error) {
    // Prisma code for "Record to update not found" is 'P2025'
    if (error.code === 'P2025') {
      return res.status(404).json({ 
        success: false, 
        message: "Post not found." 
      });
    }
  }
};

export const deletePost = async (req, res) => {
  const postId = parseInt(req.params.postId);
  try {
    const deletedPost = await prisma.post.delete({
      where: { id: postId},
    });

    res.json({
      success: true,
      message: 'Post deleted.',
      deletedPostId: deletedPost.id,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ 
        success: false, 
        message: "Post not found." 
      });
    }
  }
};