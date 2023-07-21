import {Router} from 'express';

const router=Router();

router.get("/",(req, res)=>{
    
   res.render("index", {
    title: "Homepage"
    });
  
});

router.get("/profile",(req, res)=>{
    
    res.send("Not yet done but working");
   
 });

export default router;