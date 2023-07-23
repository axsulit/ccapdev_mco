
import {Router} from 'express';
import { getDb } from '../db/conn.js';
import {ObjectId} from 'mongodb';

const postRouter=Router();
const db=getDb();
const userposts = db.collection("posts");

postRouter.get("/post/:id", async (req, res)=>{ 
    try{
        const param_postid=req.params.id;
        console.log("post id",param_postid);

        const existPost = await userposts.findOne({ 
            _id: new ObjectId(param_postid)
            
        });
        //console.log(existPost);
        if(existPost){
            res.render("indiv-post",{
                title:"Edit profile",
                upvotes:existPost.upvotes,
                title:existPost.title,
                tag:existPost.tag,
                username:existPost.username,
                date: existPost.date,
                content:existPost.content,
                id:existPost._id
            });
        }
        else{
            res.render("error", {
                title: "Page not Found."
            });
    }
    }catch(err){
        res.render("error", {
            title: "Page not Found."
        });
    }
    
   
 });

 export default postRouter;