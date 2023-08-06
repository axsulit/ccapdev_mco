import { Router } from "express";
import postController from "../controllers/postController.js";

import { votePost } from "../controllers/postController.js";

const postRouter = Router();

postRouter.get("/post/:id", postController.getPost);
postRouter.get("/comment", postController.getComment);
postRouter.get("/", postController.getIndex);
postRouter.post("/saveContent", postController.saveContent);
postRouter.post("/addComment", postController.addComment);
postRouter.post("/delete", postController.getDelete);
postRouter.post("/upvotePost", postController.putUpvote);
postRouter.post("/downvotePost", postController.putDownvote);
postRouter.post("/toggleVote/:id/:voteType", postController.toggleVote);


export default postRouter;