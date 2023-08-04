import { ObjectId } from "mongodb";
import { Post } from "../models/postModel.js";
import { User } from "../models/userModel.js";


const homepageController = {

  // controller function to handle homepage route
  getHomepage: async (req, res) => {
    try {
      const posts = await Post.find({}).populate({ path: 'username', model: User }).lean().exec();
      //console.log(posts);
  
      if(req.session.authorized){
        const user = await User.findOne({username: req.session.user.username}).lean().exec();
        console.log("User authorized in homepage: ", user);
        console.log(user.username);

        res.render("homepage", {
          title: "Homepage",
          posts: posts,
          notAuth: false,
          navusername:user.username,
          navpfp:user.picture
        });
      }
      else{
        res.render("homepage", {
          title: "Homepage",
          posts: posts,
          notAuth:true
        });
      }
      
    } catch (error) {
      res.render("error", {
        title: "Page not Found."
      });
    }
  }, 

  getLFT: async (req, res) => {
    try {
      const postsArray = await Post.find({ tag: "LFT" }).toArray();
      res.render("homepage", {
        title: "Homepage",
        posts: postsArray
      });
      console.log(postsArray);
    } catch (error) {
      res.render("error", {
        title: "Page not Found."
      });
    }
  },

  // adds new post to database
  addPost: async (req, res) => {
    // Parse the incoming data
    const newPostData = req.body;
    console.log("POST request for add new post received");
    console.log('Received new post data:', newPostData);

    const {  date, title, content, tag, comment, upvotes, downvotes, edited } = req.body;
    
    try {
      await Post.create({
        username: new ObjectId(req.session.user._id),
        date,
        title,
        content,
        tag,
        comment,
        upvotes,
        downvotes,
        edited
      });
      // Respond with a success status code and message
      res.sendStatus(200);
    } catch (err) {
      // Handle errors and respond with an error status code and message
      console.error('Error adding post:', err);
      res.sendStatus(500);
    }
  }
}

export default homepageController;