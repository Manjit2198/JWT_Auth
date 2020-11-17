require("./dbConnection");
const { Mongoose } = require("mongoose");

const express = require("express"),
          app = express(),
      dotenv  =require("dotenv"),
         port = 3080,
   bodyParser = require("body-parser"),     
    mongoose  = require("mongoose"),
    authRoute = require("./routes/auth");
    postRoute = require("./routes/posts")

dotenv.config();    

app.use(bodyParser.urlencoded({extended:false}));
app.use(require("express").json())
app.use("/api/posts", postRoute)
app.use("/api/user", authRoute);
app.listen(port, ()=> console.log("Listenting to the port",port));