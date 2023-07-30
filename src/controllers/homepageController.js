import { getDb } from "../db/conn.js";
import { Post } from "../models/postModel.js";
const db = getDb();

// import post collection from database
const posts = db.collection("posts");

const homepageController = {

  // controller function to handle homepage route
  getHomepage: async (req, res) => {
    try {
      const postsArray = await posts.find({}).toArray();
      res.render("homepage", {
        title: "Homepage",
        posts: postsArray
      });
    } catch (error) {
      res.render("error", {
        title: "Page not Found."
      });
    }
  }, 

  getLFT: async (req, res) => {
    try {
      const postsArray = await posts.find({ tag: "LFT" }).toArray();
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
    console.log('Received new post data:', newPostData);
    console.log("POST request for add new post received");

    // Create a new instance of the Post model and save it to the database
    const newPost = new Post({
      username: req.body.username,
      date: req.body.date,
      title: req.body.title,
      content: req.body.content,
      tag: req.body.tag,
      comments: [],
      upvotes: 0,
      downvotes: 0,
      edited: false,
    });

    try {
      const result = await newPost.save();
      console.log(result);
      // Respond with a success status code and message
      res.status(200).json({ message: 'Post added successfully' });
    } catch (err) {
      // Handle errors and respond with an error status code and message
      console.error('Error adding post:', err);
      res.status(500).json({ error: 'Error adding post to the database' });
    }
  }
}

export default homepageController;