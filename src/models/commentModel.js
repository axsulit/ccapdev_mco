import { Schema, model, mongoose, SchemaType } from "mongoose";

const commentSchema = new Schema({
  username: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
  },
  post: {
    type:  mongoose.SchemaTypes.ObjectId,
    ref: 'post',
    required: true,
  },
  date: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  content: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  upvotes: {
    type: mongoose.SchemaTypes.Number,
    default: 0,
  },
  downvotes: {
    type: mongoose.SchemaTypes.Number,
    default: 0,
  },
  edited: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
});

export const Comment = model("comment", commentSchema);
