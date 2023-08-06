import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

const userController = {
  registerUser: async (req, res) => {
    const { username, password, picture } = req.body;

    // Check if the username already exists
    const existUsername = await User.findOne({ username });

    if (existUsername) {
      console.log("ERROR in Registering: username is taken");
      res.sendStatus(500);
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);

        await User.create({
          username,
          password:hashedPassword,
          picture
        });

        console.log("new user: ", username, " has been created. You are logged in.");
        const existUser = await User.findOne({ username });
        req.session.user = existUser;
        req.session.authorized = true;
        res.sendStatus(200);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
    }
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists and the password is correct
    const existUser = await User.findOne({ username, password });

    if (!existUser) {
      console.log("Username or Password is incorrect");
      res.sendStatus(500);
    } else {
      console.log("You have logged in");
      req.session.user = existUser;
      req.session.authorized = true;
      res.sendStatus(200);
    }
  },

  logoutUser: async(req, res)=>{
    req.session.destroy();
    console.log("You are logging out");
    res.redirect("/");
  }
};

export default userController;