import { Router } from "express";
import { getAllPosts, createPost } from "../controllers/postController.js";

const postRouter = Router();

postRouter.get('/', getAllPosts);
// postRouter.get('/:postId', getPostById);
postRouter.post('/', createPost)

export default postRouter;