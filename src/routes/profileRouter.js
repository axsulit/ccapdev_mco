import {Router} from 'express';
import { getDb } from '../db/conn.js';

const profileRouter=Router();
const db=getDb();
const users = db.collection("users");

//TO DO: profile with userID
profileRouter.get("/profile/:username", async (req, res)=>{ 
    const param_username=req.params.username;
    //console.log("username",param_username);

    // const user = await users.findOne({ 
    //     username: req.body.username
    // });
    const usersArray = await users.find({}).toArray();
    //console.log(usersArray);
    const user = await users.findOne({ 
        username: req.params.username,  
    });
    if(user){
        res.render("profile", {
            title: "Profile",
            username:user.username
        });
    }
    else{
        res.render("error", {
            title: "Page not Found."
        });
    }
   
 });
 

 //TO DO: edit profile with userID
 profileRouter.get("/profile/edit-profile",(req, res)=>{
    res.render("edit-profile",{
        title:"Edit profile"
    });
 });


// app.get('/api/courses/:id', (req, res)=>{
//     const course=courses.find(c=> c.id === parseInt(req.params.id))
//     if(!course) res.status(404).send('course not found');
//     res.send(course);
// });

export default profileRouter;