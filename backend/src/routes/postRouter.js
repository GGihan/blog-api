import { Router } from "express";
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/postController.js";
import { requireAuth, optionalAuth, isAuthor } from '../middleware/authMiddleware.js';
import { validateCreatePost, validateUpdatePost, validateId } from "../middleware/validators.js";
import { handleValidation } from "../middleware/handleValidation.js";

const postRouter = Router();

postRouter.get('/', optionalAuth, getAllPosts);
postRouter.get('/:id', optionalAuth, validateId, getPostById);
postRouter.post('/', requireAuth, isAuthor, validateCreatePost, handleValidation, createPost);
postRouter.patch('/:id', 
  requireAuth, 
  isAuthor, 
  validateId, 
  validateUpdatePost, 
  handleValidation, 
  updatePost
);
postRouter.delete('/:id', requireAuth, isAuthor, validateId, deletePost);

export default postRouter;