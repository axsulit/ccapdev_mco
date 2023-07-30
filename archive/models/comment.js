import { Schema, model } from "mongoose";

const commentSchema = new Schema ({
    commentid: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      upvotes: {
        type: Number,
        default: 0,
      },
      downvotes: {
        type: Number,
        default: 0,
      },
      username: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
});

export const Comment = model("comment", commentSchema);