import { Schema, model } from "mongoose";

const postSchema = new Schema ({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
        type: String,
        required: true,
    },
      title: {
        type: String,
        required: true,
    },
      content: {
        type: String,
        required: true,
    },
      tag: {
        type: String,
        required: true,
    },
      comments: {
        type: [String],
        default: [],
    },
      upvotes: {
        type: Number,
        default: 0,
    },
      downvotes: {
        type: Number,
        default: 0,
    },
      edited: {
        type: Boolean,
        default: false,
    },
  });

const Post = model("post", postSchema);
export default Post;