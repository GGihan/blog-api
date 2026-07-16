import { Router } from "express";
import { getAllPosts, getPostById, createPost, updatePost } from "../controllers/postController.js";
import { requireAuth, optionalAuth, isAuthor } from '../middleware/authMiddleware.js';

const postRouter = Router();

postRouter.get('/', optionalAuth, getAllPosts);
postRouter.get('/:postId', optionalAuth, getPostById);
postRouter.post('/', requireAuth, isAuthor, createPost);
postRouter.patch('/:postId', requireAuth, isAuthor, updatePost);
// postRouter.delete('/:postId', requireAuth, isAuthor, deletePost);

export default postRouter;