import { prisma } from "../../lib/prisma.js";
import { matchedData } from "express-validator";

export const createComment = async (req, res) => {
  let { content } = matchedData(req);
  const userId = req.user.id;
  const postId = parseInt(req.params.postId);
  const newComment = await prisma.comment.create({
    data: {
      content,
      userId,
      postId,
    },
    include: {
      user: {
        select: { username: true },
      },
    },
  });

  res.json({
    success: true,
    comment: newComment,
  });
};

export const updateComment = async (req, res) => {
  let { content } = matchedData(req);
  const userId = req.user.id;
  const commentId = parseInt(req.params.commentId);
  try {
    const updatedComment = await prisma.comment.update({
    where: { id: commentId },
    data: {
      content,
    }
  });

  res.json({
    succes: true,
    comment: updatedComment,
  });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ 
        success: false, 
        message: "Comment not found." 
      });
    }
  }
};

export const deleteComment = async (req, res) => {
  const commentId = parseInt(req.params.commentId);
  try {
    const deletedComment = await prisma.comment.delete({
      where: { id: commentId },
    });

    res.json({
      success: true,
      message: 'Comment deleted.',
      deletedPostId: deletedComment.id,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ 
        success: false, 
        message: "Comment not found." 
      });
    }
  } 
};