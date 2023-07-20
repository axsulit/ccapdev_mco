// System-related packages
import "dotenv/config";

//Web-app related packages
import express from 'express';
import exphbs from 'express-handlebars';

//TO DO: Routes modules
const app=express();

//TO DO: Database modules
//import database


app.use("/static", express.static("public"));
// Set handlebars as the express app's default view engine
app.engine("hbs", exphbs.engine({
    extname:"hbs",
}));
app.set("view engine", "hbs");
app.set("views","./views");

app.listen(3000,()=>console.log("Express app is now listening..."));