import {Router} from 'express';
import userRouter from './userRouter.js';
import profileRouter from './profileRouter.js';
import { getDb } from '../db/conn.js';

const db=getDb();
const posts = db.collection("posts");

const router=Router();


router.get("/",async (req, res)=>{
    const postsArray = await posts.find({}).toArray();
    res.render("homepage", {
        title: "Homepage",
        posts: postsArray
    });
  
});

 router.use(userRouter);
 router.use(profileRouter);

 router.use((req, res) => {
    res.render("error", {
        title: "Page not Found."
    });
});

export default router;