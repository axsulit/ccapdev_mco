import {Router} from 'express';
import { getDb } from '../db/conn.js';

const userRouter=Router();
const db=getDb();
const users = db.collection("users");

//Register 
 userRouter.post("/register",async (req, res)=>{
   console.log("POST request for homepage for Register received");
    console.log(req.body);
    //console.log("req.body.username: ",req.body.username);

     //checking username exists
    const existUsername = await users.findOne({ 
            username: req.body.username
            
     });
    if (existUsername) {
        console.log("username is taken");
    }
    else{
        try {
            const result = await users.insertOne({
                username: req.body.username, 
                password: req.body.password,
                picture: req.body.picture
            });
    
            console.log(result);
            res.sendStatus(200);
       
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }
   
});

//Register 
userRouter.post("/login",async (req, res)=>{
    console.log("POST request for Login received");
    // console.log(req.body);
     //console.log("req.body.username: ",req.body.username);
 
      //checking username exists
     const existUsername = await users.findOne({ 
             username: req.body.username
             
      });
     if (!existUsername) {
         console.log("username does not exist");
     }
     else{
         console.log("sign up first");
     }
    
 });

export default userRouter;