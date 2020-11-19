const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = require('express')();
const routeUser = require('./routes/direction');
const env = require('dotenv');
const http = require('http').createServer(app);
const io = require('socket.io')(http)


env.config();
mongoose.connect(
  process.env.MONGO,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected db")
);


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", routeUser);
http.listen(8080, () => console.log("Server Running"));