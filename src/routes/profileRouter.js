import {Router} from 'express';
import { getDb } from '../db/conn.js';

const profileRouter=Router();
const db=getDb();
const users = db.collection("users");


profileRouter.get("/profile/:username", async (req, res)=>{ 
    const param_username=req.params.username;
    //console.log("username",param_username);

   // const usersArray = await users.find({}).toArray();
    //console.log(usersArray);
    const user = await users.findOne({ 
        username: req.params.username,  
    });
  
    if(user){
        res.render("profile", {
            title: "Profile",
            pfp: user.picture,
            username:user.username,
            bio: user.bio

        });
    }
    else{
        res.render("error", {
            title: "Page not Found."
        });
    }
   
 });
 

 
 profileRouter.get("/edit-profile/:username", async(req, res)=>{
    const user = await users.findOne({ 
        username: req.params.username,  
    });
    res.render("edit-profile",{
        title:"Edit profile",
        picture: user.picture,
        bio: user.bio,
        username: user.username
    });
 });

 profileRouter.post("/edit-profile/saveDescription", async(req, res)=>{
        console.log("POST request for homepage for update description received");
        console.log(req.body.username);
        try{
            let updateResult= await users.updateOne(
                {username: req.body.username},
                {$set: {
                    bio: req.body.bio
                }}
            );
            console.log(updateResult);
            res.sendStatus(200);
        }catch{
            console.error(err);
            res.sendStatus(500);
        }
 });


export default profileRouter;