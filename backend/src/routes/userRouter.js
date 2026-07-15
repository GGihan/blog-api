import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { getMe } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get('/me', requireAuth, getMe)

export default userRouter;