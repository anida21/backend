require("dotenv").config();

const express = require("express");
const app = express();

const { mongoose } = require("./db/mongoose");

const bodyParser = require("body-parser");

const { Post } = require("./db/models/post.model");

const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const path = require("path");

//const production = "https://sarajevotravel.herokuapp.com/";
//const development = 'http://localhost:3000/';
//const url = (process.env.NODE_ENV ? production : development);
if(process.env.NODE_ENV === 'production'){
  //Set static folder
  app.use(express.static('./client/dist'));

  app.get('*', (req, res)=>{
      res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

/* MIDDLEWARE  */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id"
  );

  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token, x-refresh-token"
  );

  next();
});

/* END MIDDLEWARE  */

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

module.exports = app;

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening on port 3000");
});


