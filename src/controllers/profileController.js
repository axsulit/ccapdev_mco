import { User } from "../models/userModel.js";
import { Post } from "../models/postModel.js";




const profileController = {
 
  getProfile: async (req, res) => {
    console.log("getProfile called");
    const param_username = req.params.username;
   // console.log(param_username)

    const user = await User.findOne({
      username: param_username
    });
    console.log("/getProfile user: ",user);
    const posts = await Post.find({username:user._id}).populate({ path: 'username', model: User }).lean().exec();
    //console.log(posts);

    if (user) {
      res.render("profile", {
        title: "Profile",
        pfp: user.picture,
        username: user.username,
        bio: user.bio,
        posts: posts,
        picture: user.picture,
        // navusername:req.session.user.username,
        // navpfp:req.session.user.picture
      });
    } else {
      res.render("error", {
        title: "Page not Found."
      });
    }
  },

  editProfile: async (req, res) => {
    const user = await User.findOne({
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
    console.log(req.body.picture);
    try {
      let updateResult = await User.updateOne(
        { username: req.body.username },
        {
          $set: {
            bio: req.body.bio,
            picture: req.body.picture
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

export default profileController;