
import { Schema, model } from "mongoose";


const allowedTags = ["General Discussion", "LFT", "Technical Issues", "Off Topic"];

const postSchema = new Schema({
  username: {
    type: String,
    required: true,
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
    enum: allowedTags,
    default: "General Discussion",
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

export const Post = model("post", postSchema);
