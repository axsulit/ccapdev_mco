import { Post } from "../models/postModel.js";
import { User } from "../models/userModel.js";


const homepageController = {

  // controller function to handle homepage route
  getHomepage: async (req, res) => {
    try {
      const users=await User.find({}).lean().exec();
      const posts = await Post.find({}).lean().exec();
      // try{
      //   const test = await Post.find({}).populate({
      //     path: 'username',
      //     select: 'picture'
      //   }).lean().exec();        
      // }catch(err){
      //   console.error(err);
      // }
      
      //console.log(users);
      if(req.session.authorized){
        res.render("homepage", {
          title: "Homepage",
          posts: posts,
          navusername:req.session.user.username,
          navpfp:req.session.user.picture
        });
      }
      else{
        res.render("homepage", {
          title: "Homepage",
          posts: posts,
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

    const { username, date, title, content, tag, comment, upvotes, downvotes, edited } = req.body;

    try {
      await Post.insertOne({
        username,
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
      res.status(200).json({ message: 'Post added successfully!' });
    } catch (err) {
      // Handle errors and respond with an error status code and message
      console.error('Error adding post:', err);
      res.status(500).json({ error: 'Error adding post to the database' });
    }
  }
}

export default homepageController;