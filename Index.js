const express = require("express");

//express app
const app= express();
const cookieParser=require("cookie-parser");

app.use(cookieParser());

const PORT=3000;
const database = require('mongoose'); //to connect to mongodb
//connect to mongodb and listen to requests
database.connect("mongodb+srv://utkarshbishnoi99:47704101@nodejs.lypjlco.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = database.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected"));

//register view engine
app.set('view engine','ejs');

//middleware and static files
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());

//express layouts
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layout/layout');

//teacher and student routes
const teachRoutes = require("./Routes/TeacherRoutes")
const studRoutes = require("./Routes/StudentRoutes") 
app.use("/Teacher",teachRoutes);
app.use("/student",studRoutes);

//routes
app.get("/", (req, res) => {
    res.render("Index");
  });

app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
  });

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
