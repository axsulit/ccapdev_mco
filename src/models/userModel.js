import { Schema, model, mongoose } from "mongoose";

const userSchema = new mongoose.Schema ({
    username: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    picture: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    bio: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
  });

export const User = mongoose.model("User", userSchema);