import {Router} from 'express';
import { getDb } from '../db/conn.js';

const userRouter=Router();
const db=getDb();
const users = db.collection("users");

//Register In
 userRouter.post("/register",async (req, res)=>{
   console.log("POST request for homepage for Register received");
    console.log(req.body);

     //checking username exists
    // const existUsername = await users.findOne({ 
    //     username: req.body.username
    // });
    // if (existUsername) {
    //     console.log('username taken');
    // }
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
});

export default userRouter;