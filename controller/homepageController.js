import Post from "../models/PostModel.js";
import { getDb } from "../models/db.js";

const db=getDb();
const posts = db.collection("posts");

// import model here

const homepageController = {
    getPosts: async function(req, res) {
        const postsArray = await Post.find({}).toArray();
        res.render("homepage", {
            title: "Homepage",
            posts: postsArray
        });
    }
}

export default homepageController;