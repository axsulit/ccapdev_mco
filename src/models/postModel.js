import { Schema,SchemaTypes, model, mongoose} from "mongoose";

const allowedTags = [
  "General Discussion",
  "LFT",
  "Technical Issues",
  "Off Topic",
];

const postSchema = new mongoose.Schema({
  username: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
  },
  date: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  title: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  content: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  tag: {
    type: mongoose.SchemaTypes.String,
    required: true,
    enum: allowedTags,
    default: "General Discussion",
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: "comment",
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

export const Post = mongoose.model("post", postSchema);
