import { ObjectId } from "mongodb";
import { User } from "../models/userModel.js";
import { Post } from "../models/postModel.js";
import { Comment } from "../models/commentModel.js";
const postController = {
  // gets post for each user

  getIndex: async (req, res) => {
    var result = await db.findMany(
     // Comments,
      {},
      "date upvotes username content"
    );
    console.log(result);

    res.render("indiv-post", {
      comment: result,
    });
  },

  getPost: async (req, res) => {
    try {
      let canEdit= false;
      const param_postid = req.params.id;
      console.log("post id", param_postid);

      const posts = await Post.find({_id:new ObjectId(param_postid)}).populate({ path: 'username', model: User }).lean().exec();
      const comments=await Comment.find({post:new ObjectId(param_postid)}).populate({ path: 'username', model: User }).lean().exec();
      console.log(comments);
      //console.log(posts);
      
      if (posts) {
        if (req.session.authorized) {
          console.log("Authorized session in getProfile")
          const nav_user = await User.findOne({username: req.session.user.username}).lean().exec();
          if(nav_user.username==posts[0].username.username){
            canEdit=true;
          }
          else{
            canEdit=false;
          }
          res.render("indiv-post", {
            title: "Edit profile",
            upvotes: posts[0].upvotes,
            downvotes: posts[0].downvotes,
            title: posts[0].title,
            tag: posts[0].tag,
            pfp: posts[0].username.picture,
            username: posts[0].username.username,
            date: posts[0].date,
            content: posts[0].content,
            id: posts[0]._id,
            comments:comments.map(comment => ({ ...comment, commentId: comment._id })),
            navusername:nav_user.username,
            navpfp:nav_user.picture,
            notAuth: false,
            canEdit:canEdit
          });
        }else{
          // console.log("working");
          res.render("indiv-post", {
            upvotes: posts[0].upvotes,
            downvotes: posts[0].downvotes,
            title: posts[0].title,
            tag: posts[0].tag,
            pfp: posts[0].username.picture,
            username: posts[0].username.username,
            date: posts[0].date,
            content: posts[0].content,
            id: posts[0]._id,
            comments:comments.map(comment => ({ ...comment, commentId: comment._id })),
            notAuth: true,
            canEdit:false
          });
        }
      } else {
        res.render("error", {
          title: "Page not Found.",
        });
      }
    } catch (err) {
      console.error(err);
      res.render("error", {
        title: "Page not Found.",
      });
    }
  },

  // saves post edits to database
  saveContent: async (req, res) => {
    console.log("POST request for update in content post received");
    console.log(req.body.edited);
    try {
      let updateResult = await Post.updateOne(
        { _id: new ObjectId(req.body.id) },
        {
          $set: {
            content: req.body.content,
            edited: req.body.edited,
          },
        }
      );
      console.log(updateResult);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  getComment: async (req, res) => {
    try {
      const param_cmtid = req.params.id;
      console.log("comment id", param_cmtid);

      const existCmnt = await Post.findOne({
        _id: new ObjectId(param_cmtid),
      });

      if (existCmnt) {
        res.render("indiv-post", {
          upvotes: existCmnt.upvotes,
          downvotes: existCmnt.downvotes,
          username: existCmnt.username,
          date: existCmnt.date,
          content: existCmnt.content,
          id: existCmnt._id,
        });
      } else {
        res.render("error", {
          title: "Page not Found.",
        });
      }
    } catch (err) {
      res.render("error", {
        title: "Page not Found.",
      });
    }
  },
  putUpvote: async (req, res)=>{
    try {
      const postId = req.body.id; // Assuming you are sending the post ID from the frontend
      const userId = req.session.user._id;
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Check if the user has already upvoted this post
      if (!post.upvotes.includes(userId)) {
        post.upvotes.push(userId);
        await post.save();
      } else {
        console.log("You already upvoted this post");
      }
  
      res.sendStatus(200);
    } catch (error) {
      console.error("Error upvoting post:", error);
      res.sendStatus(500);
    }
  },
  putDownvote: async (req, res)=>{
    console.log("Downvote request received");

    try {
      const postId = req.body.id; // Assuming you are sending the post ID from the frontend
      const userId = req.session.user._id;
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Check if the user has already downvoted this post
      if (!post.downvotes.includes(userId)) {
        post.downvotes.push(userId);
        await post.save();
      } else {
        console.log("You already downvoted this post");
      }
  
      res.sendStatus(200);
    } catch (error) {
      console.error("Error downvoting post:", error);
      res.sendStatus(500);
    }
  },

  toggleVote: async (req, res) => {
    const postId = req.params.id;
    const userId = req.session.user._id;
    const voteType = req.query.voteType; // "upvote" or "downvote"
  
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      const voteArray = voteType === "upvote" ? post.upvotes : post.downvotes;
      const voteIndex = voteArray.indexOf(userId);
  
      if (voteIndex === -1) {
        // User hasn't voted, so add their vote
        voteArray.push(userId);
      } else {
        // User has already voted, so remove their vote
        voteArray.splice(voteIndex, 1);
      }
  
      await post.save();
  
      return res.status(200).json({
        message: `Vote toggled successfully`,
        upvotes: post.upvotes,
        downvotes: post.downvotes,
      });
    } catch (error) {
      console.error(`Error toggling vote:`, error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getDelete: async function (req, res) {
    const id = req.body.id; 

    try {
        const result = await Post.deleteOne({_id: id}).exec();
        const deleteComment = await Comment.deleteMany({post: id}).exec();
        console.log(result);
        console.log(deleteComment);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  },

  addComment: async (req, res) => {
    const newCommentData = req.body;
    console.log("POST request for add new comment received");
    console.log('Received new comment data:', newCommentData);

    const {post, date, content, upvotes, downvotes, edited} = req.body;
    try {
      const newComment = await Comment.create({
        username: new ObjectId(req.session.user._id),
        post,
        date,
        content,
        upvotes,
        downvotes,
        edited
      });

      // Update the corresponding Post's comments array
      await Post.findByIdAndUpdate(
        post,
        { $push: { comments: newComment._id } }, // Add the new comment's ObjectId to the comments array
        { new: true }
      );
    // Respond with a success status code and message
    res.sendStatus(200);
  } catch (err) {
    // Handle errors and respond with an error status code and message
    console.error('Error adding post:', err);
    res.sendStatus(500);
  }
}

};


// // Upvote a post
// router.post("/upvote/:id", async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     post.upvotes += 1;
//     await post.save();

//     return res.status(200).json({ message: "Upvoted successfully", upvotes: post.upvotes });
//   } catch (error) {
//     console.error("Error upvoting post:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Downvote a post
// router.post("/downvote/:id", async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     post.downvotes += 1;
//     await post.save();

//     return res.status(200).json({ message: "Downvoted successfully", downvotes: post.downvotes });
//   } catch (error) {
//     console.error("Error downvoting post:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// Vote on a post (either upvote or downvote)
export const votePost = async (req, res) => {
  const { id } = req.params;
  const { voteType } = req.body; // Should be either "upvote" or "downvote"

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (voteType === "upvote") {
      post.upvotes += 1;
    } else if (voteType === "downvote") {
      post.downvotes += 1;
    } else {
      return res.status(400).json({ message: "Invalid vote type" });
    }

    await post.save();

    return res.status(200).json({
      message: `${voteType.charAt(0).toUpperCase() + voteType.slice(1)}d successfully`,
      upvotes: post.upvotes,
      downvotes: post.downvotes,
    });
  } catch (error) {
    console.error(`Error ${voteType}ing post:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const toggleVote = async (req, res) => {
//   const { id, voteType } = req.params;

//   try {
//     const post = await Post.findById(id);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     const userId = req.session.user._id;
//     const upvoteIndex = post.upvotes.indexOf(userId);
//     const downvoteIndex = post.downvotes.indexOf(userId);

//     if (voteType === "upvote") {
//       if (upvoteIndex === -1) {
//         post.upvotes.push(userId);
//         if (downvoteIndex !== -1) {
//           post.downvotes.splice(downvoteIndex, 1);
//         }
//       } else {
//         post.upvotes.splice(upvoteIndex, 1);
//       }
//     } else if (voteType === "downvote") {
//       if (downvoteIndex === -1) {
//         post.downvotes.push(userId);
//         if (upvoteIndex !== -1) {
//           post.upvotes.splice(upvoteIndex, 1);
//         }
//       } else {
//         post.downvotes.splice(downvoteIndex, 1);
//       }
//     } else {
//       return res.status(400).json({ message: "Invalid vote type" });
//     }

//     await post.save();

//     return res.status(200).json({
//       message: `${voteType.charAt(0).toUpperCase() + voteType.slice(1)}d successfully`,
//       totalVotes: post.upvotes.length - post.downvotes.length,
//     });
//   } catch (error) {
//     console.error(`Error ${voteType}ing post:`, error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

async function toggleVote(req, res) {
  const postId = req.params.id;
  const voteType = req.params.voteType;
  const userId = req.session.user._id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const isUpvote = voteType === "upvote";
    const isDownvote = voteType === "downvote";

    const alreadyUpvoted = post.upvotes.includes(userId);
    const alreadyDownvoted = post.downvotes.includes(userId);

    if (isUpvote && alreadyUpvoted) {
      post.upvotes.pull(userId);
    } else if (isDownvote && alreadyDownvoted) {
      post.downvotes.pull(userId);
    } else {
      if (isUpvote) {
        post.upvotes.push(userId);
        if (alreadyDownvoted) {
          post.downvotes.pull(userId);
        }
      } else if (isDownvote) {
        post.downvotes.push(userId);
        if (alreadyUpvoted) {
          post.upvotes.pull(userId);
        }
      }
    }

    await post.save();

    const totalVotes = post.upvotes.length - post.downvotes.length;
    return res.status(200).json({ totalVotes });
  } catch (error) {
    console.error("Error toggling vote:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default postController;


