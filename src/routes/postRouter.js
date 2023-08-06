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

// Upvote a post
// postRouter.post("/upvote/:id", async (req, res) => {
//     try {
//       const postId = req.params.id;
//       const post = await Post.findById(postId);
//       if (!post) {
//         return res.status(404).json({ message: "Post not found" });
//       }
  
//       post.upvotes += 1;
//       await post.save();
  
//       return res.status(200).json({ message: "Upvoted successfully", upvotes: post.upvotes });
//     } catch (error) {
//       console.error("Error upvoting post:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });
  
//   // Downvote a post
//   postRouter.post("/downvote/:id", async (req, res) => {
//     try {
//       const postId = req.params.id;
//       const post = await Post.findById(postId);
//       if (!post) {
//         return res.status(404).json({ message: "Post not found" });
//       }
  
//       post.downvotes += 1;
//       await post.save();
  
//       return res.status(200).json({ message: "Downvoted successfully", downvotes: post.downvotes });
//     } catch (error) {
//       console.error("Error downvoting post:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });

//   postRouter.post("/vote/:id", votePost);

export default postRouter;