// System-related packages
// import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from "url";

//Web-app related packages
import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
// import bcrypt from "bcrypt";

//Route modules
import router from "./src/routes/index.js";

//import database
const port=process.env.PORT;
import database from "./src/models/db.js";

async function main() {
  const __dirname = dirname(fileURLToPath(import.meta.url)); // directory URL
  const app = express();

  app.use("/static", express.static(__dirname + "/public"));

  app.engine(
    "hbs",
    exphbs.engine({
      extname: "hbs",
    })
  );
  app.set("view engine", "hbs");
  app.set("views", "./src/views");
  app.set("view cache", false);

  app.use(express.json());
  app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie:{
      sameSite:"strict"
    }
  }));

  app.use(router);

  database.connectToMongo();

  app.listen(port, function ()  {
    console.log("Express app now listening...");
    console.log(`Server is running at:`);
    console.log(`http://localhost:` + port);
    
  });
}

main();
