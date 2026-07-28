import { Router } from "express";
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/postController.js";
import { createComment } from "../controllers/commentController.js";
import { requireAuth, optionalAuth, isAuthor } from '../middleware/authMiddleware.js';
import { validateCreatePost, validateUpdatePost, validateId, validateComment } from "../middleware/validators.js";
import { handleValidation } from "../middleware/handleValidation.js";
import { uploadSingleFile } from "../middleware/upload.js";

const postRouter = Router();

postRouter.get('/', optionalAuth, getAllPosts);
postRouter.get('/:postId', optionalAuth, validateId, getPostById);
postRouter.post('/',
  requireAuth,
  isAuthor,
  uploadSingleFile,
  validateCreatePost,
  handleValidation,
  createPost
);
postRouter.patch('/:postId',
  requireAuth,
  isAuthor,
  validateId,
  uploadSingleFile,
  validateUpdatePost,
  handleValidation,
  updatePost
);
postRouter.delete('/:postId', requireAuth, isAuthor, validateId, deletePost);
postRouter.post('/:postId/comments',
  requireAuth,
  validateId,
  validateComment,
  handleValidation,
  createComment
);

export default postRouter;