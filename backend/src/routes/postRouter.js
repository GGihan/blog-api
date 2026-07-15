import { Router } from "express";
import { getAllPosts, createPost } from "../controllers/postController.js";
import { requireAuth, isAuthor } from '../middleware/authMiddleware.js';

const postRouter = Router();

postRouter.get('/', getAllPosts);
// postRouter.get('/:postId', getPostById);
postRouter.post('/', requireAuth, isAuthor, createPost)

export default postRouter;