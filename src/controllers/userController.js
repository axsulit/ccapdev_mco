import { getDb } from '../db/conn.js';

const db = getDb();
const users = db.collection("users");

const userController = {
  registerUser: async (req, res) => {
    const { username, password, picture } = req.body;

    // Check if the username already exists
    const existUsername = await users.findOne({ username });

    if (existUsername) {
      console.log("ERROR in Registering: username is taken");
      res.sendStatus(500);
    } else {
      try {
        await users.insertOne({
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
    const existUser = await users.findOne({ username, password });

    if (!existUser) {
      console.log("Username or Password is incorrect");
      res.sendStatus(500);
    } else {
      console.log("You have logged in");
      const userPicture = existUser.picture;
      console.log(userPicture);
      res.sendStatus(200);
    }
  }
};

export default userController;