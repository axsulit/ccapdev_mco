import {Router} from 'express';
import userRouter from './userRouter.js';


const router=Router();


router.get("/",async (req, res)=>{
   console.log("get method working")
   res.render("index", {
    title: "Homepage"
    });
  
});

//TO DO: profile
router.get("/profile",(req, res)=>{ 
    res.send("Not yet done but working");
 });
 router.get("/users", async (req, res) => {
    console.log("meow");
    res.render("users", {
        title: "Users",
    });
});

// router.post("/",async (req, res)=>{
//     console.log("POST request for homepage for users received");
//      console.log(req.body);
//  });
 router.use(userRouter);
 router.use((req, res) => {
    res.render("error", {
        title: "Page not Found."
    });
});



//router.use(userRouter);


export default router;