import { Router } from 'express';
import userRouter from './userRouter.js';
import profileRouter from './profileRouter.js';
import postRouter from './postRouter.js';

const router = Router();

// import controllers
import homepageController from '../controllers/homepageController.js';
import errorController from '../controllers/errorController.js';

// define the homepage route using the homepageController
router.get("/", homepageController.getHomepage);
router.post("/addPost", homepageController.addPost);

// use other routers 
router.use(userRouter);
router.use(postRouter);
router.use(profileRouter);

// fallback route for handling errors
router.use(errorController);

export default router;