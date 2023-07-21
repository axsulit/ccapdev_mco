import {Router} from 'express';
import userRouter from './userRouter.js';


const router=Router();


router.get("/",async (req, res)=>{
   res.render("index", {
    title: "Homepage",
    //errorMessage:"KIMIIII"
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



//router.use(userRouter);


export default router;