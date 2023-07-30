import { getDb } from "../db/conn.js";
const db = getDb();

// import post collection from database
const posts = db.collection("posts");

// controller function to handle homepage route
const homepageController = async (req, res) => {
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
  };

export default homepageController;