import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

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
        const hashedPassword = await bcrypt.hash(password, 10);
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
    const existUser = await User.findOne({ username });

    if (!existUser) {
      console.log("Username incorrect");
      res.sendStatus(500);
    } else {
      try {
        if (await bcrypt.compare(password, existUser.password)){
          console.log("You have logged in");
          req.session.user = existUser;
          req.session.authorized = true;
          res.sendStatus(200);
        } else {
          console.log("Password incorrect");
          res.sendStatus(500);
        }
      }catch {
        res.sendStatus(500);
      }
      
    }
  },

  logoutUser: async(req, res)=>{
    req.session.destroy();
    console.log("You are logging out");
    res.redirect("/");
  }
};

export default userController;