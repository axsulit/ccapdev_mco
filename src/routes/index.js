import {Router} from 'express';

const router=Router();

router.get("/",(req, res)=>{
    // res.render("layouts/main",{
    //     title: "Homepage"
    // });
    // res.send("hello World!");
    res.render("partials/test",{test: "/views/main"});
  
});

export default router;