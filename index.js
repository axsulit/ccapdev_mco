import "dotenv/config";

import express from "express";
import exphbs from "express-handlebars";
import db from './models/db.js';

// import routers
import homepageRouter from "./routes/homepageRoute.js";

const port = process.env.PORT;

const app = express();

app.engine("hbs", exphbs.engine({extname: 'hbs'}));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static(`public`));

// use express.json() middleware to parse request body
app.use(express.json());

// use router (add if necessary)
app.use(homepageRouter);

db.connect();

app.listen(port, function () {
    console.log(`Server is running at:`);
    console.log(`http://localhost:` + port);
});