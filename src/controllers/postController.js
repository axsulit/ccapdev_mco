import { getDb } from "../db/conn.js";
import { ObjectId } from "mongodb";
const db = getDb();

// import posts collection from database
const userposts = db.collection("posts");

const postController = {

    // gets post for each user
    getPost: async (req, res) => {
      try {
        const param_postid = req.params.id;
        console.log("post id",param_postid);

        const existPost = await userposts.findOne({
          _id: new ObjectId(param_postid)
        });

        if (existPost) {
          res.render("indiv-post", {
            title: "Edit profile",
            upvotes: existPost.upvotes,
            title: existPost.title,
            tag: existPost.tag,
            username: existPost.username,
            date: existPost.date,
            content: existPost.content,
            id: existPost._id
          });
        } else {
          res.render("error", {
            title: "Page not Found."
          });
        }
      } catch (err) {
        res.render("error", {
          title: "Page not Found."
        });
      }
    },

    // saves post edits to database
    saveContent: async (req, res) => {
      console.log("POST request for update in content post received");
      console.log(req.body.edited);
      try {
        let updateResult = await userposts.updateOne(
          { _id: new ObjectId(req.body.id) },
          {
            $set: {
              content: req.body.content,
              edited: req.body.edited
            }
          }
        );
        console.log(updateResult);
        res.sendStatus(200);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
    },
};

export default postController;