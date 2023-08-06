import { User } from "../models/userModel.js";
import { Post } from "../models/postModel.js";
import { Comment } from "../models/commentModel.js";



const profileController = {
 
  getProfile: async (req, res) => {
    let canEdit= false;
    console.log("getProfile called");
    const param_username = req.params.username;
    console.log("req.params.username",req.params.username)
    console.log("param_username", param_username);

    const user = await User.findOne({
      username: param_username
    });
    console.log("user",user);
    //console.log("/getProfile user: ",user);
    const posts = await Post.find({username:user._id}).populate({ path: 'username', model: User }).lean().exec();
    //console.log(posts);
    const comments=await Comment.find({username:user._id}).populate({ path: 'username', model: User }).lean().exec();
    console.log(comments);
    if (user) {
      if (req.session.authorized) {
        const nav_user = await User.findOne({username: req.session.user.username}).lean().exec();

        //check if logged in user is similar to the one viewing the profile
        if(nav_user.username==user.username){
          canEdit=true;
        }
        else{
          canEdit=false;
        }
          res.render("profile", {
            title: "Profile",
            notAuth: false,
            pfp: user.picture,
            username: user.username,
            bio: user.bio,
            posts: posts,
            picture: user.picture,
            navusername:nav_user.username,
            navpfp:nav_user.picture,
            canEdit: canEdit,
            comments:comments
          });
          console.log(comments);
      } else {
        res.render("profile", {
          title: "Profile",
          notAuth: true,
          pfp: user.picture,
          username: user.username,
          bio: user.bio,
          posts: posts,
          picture: user.picture,
          canEdit:false,
          comments:comments
        });
      }
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
  uploadFile: async(req, res)=>{
    console.log("File is being uploaded")
    //console.log("Name of file", req.file.filename);
    console.log("Username of current user: ", req.session.user.username);
    console.log("Description: ", req.body.description);
    
    try{
      let updateResult = await User.updateOne(
        { username: req.session.user.username },
        {
          $set: {
            bio: req.body.description,
            picture: `/static/images/${req.file.filename}`
          }
        }
      );
    }catch(error){
      let updateResult = await User.updateOne(
        { username: req.session.user.username },
        {
          $set: {
            bio: req.body.description,
          }
        }
      );
    }
    

    //put redirect here just like sir's
    res.redirect(`/profile/${req.session.user.username}`);
  }

};

export default profileController;