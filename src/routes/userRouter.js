import {Router} from 'express';
import { getDb } from '../db/conn.js';

const userRouter=Router();
const db=getDb();
const users = db.collection("users");

//Register 
 userRouter.post("/register",async (req, res)=>{
    //    console.log("POST request for homepage for Register received");
    //     console.log(req.body);
    //console.log("req.body.username: ",req.body.username);

     //checking username exists
    const existUsername = await users.findOne({ 
            username: req.body.username
            
     });
    if (existUsername) {
        console.log("ERROR in Registering: username is taken");
    
    }
    else{
        try {
            const result = await users.insertOne({
                username: req.body.username, 
                password: req.body.password,
                picture: req.body.picture
            });
    
            //console.log(result);
            console.log("new user: ",req.body.username, " has been created. You are logged in.");
            res.sendStatus(200);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }
});

//Log In
userRouter.post("/login",async (req, res)=>{
    console.log("POST request for Login received");
    console.log("LOGIN: ", req.body);
    //console.log("req.body.username: ",req.body.username);
    const usersArray = await users.find({}).toArray();
    //console.log(usersArray);
    //checking username exists
    const existUser = await users.findOne({ 
             username: req.body.username,
             password: req.body.password
    });
     if (!existUser) {
         console.log("Username or Password is incorrect");
         res.sendStatus(500);
     }
     else{
        // TO DO: render homepage where in navbar, user's  username is displayed in navbar
        //i think rendering should not occur here
        console.log("You have logged in")
        res.sendStatus(200);
     }
    
 });

export default userRouter;