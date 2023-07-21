import {Router} from 'express';
import { getDb } from '../db/conn.js';

const userRouter=Router();
const db=getDb();
const users = db.collection("users");

// userRouter.get("/users", async (req, res) => {
//     console.log("meow");
//     //const usersArray = await users.find({}).toArray();
//     res.render("users", {
//         title: "Users",
//         //users: usersArray
//     });
// });

//Register In
 userRouter.post("/register",async (req, res)=>{
   console.log("POST request for homepage for Register received");
    console.log(req.body);
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