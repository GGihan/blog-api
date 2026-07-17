import { Router } from "express";
import { updateComment } from "../controllers/commentController.js";
import { requireAuth, canUpdateComment } from "../middleware/authMiddleware.js";
import { validateComment, validateId } from "../middleware/validators.js";
import { handleValidation } from "../middleware/handleValidation.js";

const commentRouter = Router();

commentRouter.patch('/:commentId',
  requireAuth,
  validateId,
  canUpdateComment,
  validateComment,
  handleValidation,
  updateComment
);
// commentRouter.delete('/:id');


export default commentRouter;