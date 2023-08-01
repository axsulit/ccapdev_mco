import { getDb } from '../db/conn.js';

const db = getDb();
const users = db.collection("users");
const userposts = db.collection("posts");

const profileController = {
  getProfile: async (req, res) => {
    const param_username = req.params.username;

    const user = await users.findOne({
      username: param_username
    });
    const postsArray = await userposts.find({
      username: param_username
    }).toArray();

    if (user) {
      res.render("profile", {
        title: "Profile",
        pfp: user.picture,
        username: user.username,
        bio: user.bio,
        posts: postsArray,
        picture: user.picture,
        navusername:req.session.user.username,
        navpfp:req.session.user.picture
      });
    } else {
      res.render("error", {
        title: "Page not Found."
      });
    }
  },

  editProfile: async (req, res) => {
    const user = await users.findOne({
      username: req.params.username
    });
    res.render("edit-profile", {
      title: "Edit profile",
      picture: user.picture,
      bio: user.bio,
      username: user.username,
      picture: user.picture
    });
  },

  saveDescription: async (req, res) => {
    console.log("POST request for homepage for update description received");
    console.log(req.body.username);
    try {
      let updateResult = await users.updateOne(
        { username: req.body.username },
        {
          $set: {
            bio: req.body.bio,
            // picture: req.body.picture
          }
        }
      );
      console.log(updateResult);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
};

export default profileController;