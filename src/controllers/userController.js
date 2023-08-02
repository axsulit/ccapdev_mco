import { User } from "../models/userModel.js";

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
        await User.create({
          username,
          password,
          picture
        });

        console.log("new user: ", username, " has been created. You are logged in.");
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