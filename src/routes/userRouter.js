import {Router} from 'express';
import { getDb } from '../db/conn.js';

const userRouter=Router();
const db=getDb();
const users = db.collection("users");


//Logging In
// userRouter.post("/",async (req, res)=>{
//     console.log("POST request for homepage for users received");
//     console.log(req.body);
// });

export default userRouter;