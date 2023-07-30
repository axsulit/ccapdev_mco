import { Router } from 'express';
import userRouter from './userRouter.js';
import profileRouter from './profileRouter.js';
import postRouter from './postRouter.js';


const router = Router();

// import controllers
import homepageController from '../controllers/homepageController.js';
import errorController from '../controllers/errorController.js';

// define the homepage route using the homepageController
router.get("/", homepageController);

// use other routers 
router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/profile', profileRouter);

// fallback route for handling errors
// router.use(errorController);

export default router;




// import {Router} from 'express';

// import userRouter from './userRouter.js';
// import profileRouter from './profileRouter.js';
// import postRouter from './postRouter.js';
// import { getDb } from '../db/conn.js';

// const db=getDb();
// const posts = db.collection("posts");

// const router=Router();


// router.get("/",async (req, res)=>{
//     const postsArray = await posts.find({}).toArray();
//     res.render("homepage", {
//         title: "Homepage",
//         posts: postsArray
//     });
  
// });

//  router.use(userRouter);
//  router.use(postRouter);
//  router.use(profileRouter);

//  router.use((req, res) => {
//     res.render("error", {
//         title: "Page not Found."
//     });
// });

// export default router;