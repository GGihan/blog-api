import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";

const commentRouter = Router();

// commentRouter.patch('/:id')
// commentRouter.delete('/:id')


export default commentRouter;