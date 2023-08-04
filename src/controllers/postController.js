import { ObjectId } from "mongodb";
import { User } from "../models/userModel.js";
import { Post } from "../models/postModel.js";

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
      console.log(posts);
      
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

  getDelete: async function (req, res) {
    const id = req.body.id; 

    try {
        const result = await Post.deleteOne({_id: id}).exec();
        console.log(result);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  }
};

export default postController;

