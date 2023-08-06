import { Router } from 'express';
import userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/logout", userController.logoutUser)

export default userRouter;