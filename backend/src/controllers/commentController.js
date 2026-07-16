import { prisma } from "../../lib/prisma.js";
import { matchedData } from "express-validator";

export const createComment = async (req, res) => {
  let { content } = matchedData(req);
  const userId = req.user.id;
  const postId = parseInt(req.params.id);
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