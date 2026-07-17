import { Router } from "express";
import { updateComment, deleteComment } from "../controllers/commentController.js";
import { requireAuth, verfiyCommentAccess } from "../middleware/authMiddleware.js";
import { validateComment, validateId } from "../middleware/validators.js";
import { handleValidation } from "../middleware/handleValidation.js";

const commentRouter = Router();

commentRouter.patch('/:commentId',
  requireAuth,
  validateId,
  verfiyCommentAccess,
  validateComment,
  handleValidation,
  updateComment
);
commentRouter.delete('/:commentId',
  requireAuth,
  validateId,
  verfiyCommentAccess,
  deleteComment
);


export default commentRouter;