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

var connections = [];
io.on('connection', (socket) => {
  connections.push(socket);
  console.log('a user connected' + " " + socket.id);

  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  //Getting Cordinat from UserGPS
  socket.on('cord', (datas) => {
    io.emit('cordinate.user', datas );
  })

  //Sending Tujuan from AdminGps
  socket.on('tujuan.to', (data) => {
    io.emit('update', data);
  })

  setInterval(()=> {
    socket.emit('jumlah', connections.length);
  }, 5000)

  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1)
    console.log(connections.length);
    console.log('user disconnected ' + socket.id);
  });
});