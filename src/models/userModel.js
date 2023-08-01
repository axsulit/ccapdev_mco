import { Schema, model } from "mongoose";

const userSchema = new Schema ({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
  });

export const User = model("user", userSchema);