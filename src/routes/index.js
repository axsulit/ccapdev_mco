import {Router} from 'express';

const router=Router();

router.get("/",(req, res)=>{
    res.render("layouts/main",{
        title: "Homepage"
    });
});

export default router;