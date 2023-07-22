import {Router} from 'express';
import userRouter from './userRouter.js';
import { getDb } from '../db/conn.js';

const db=getDb();
const posts = db.collection("posts");

const router=Router();


router.get("/",async (req, res)=>{
    const postsArray = await posts.find({}).toArray();
    res.render("index", {
        title: "Homepage",
        posts: postsArray
    });
  
});

//TO DO: profile
router.get("/profile",(req, res)=>{ 
    res.send("Not yet done but working");
 });


 router.use(userRouter);
 router.use((req, res) => {
    res.render("error", {
        title: "Page not Found."
    });
});

export default router;