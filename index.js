let express = require("express");
let socket = require("socket.io");
////App setup

let app = express();
let port = process.env.PORT || 4000;

let server = app.listen(port, function () {
  console.log("Listening to request on port 4000");
});

/// static file

app.use(express.static("public"));
////Socket setup
let io = socket(server);

io.on("connection", function (socket) {
  console.log("Made socket connection", socket.id);

  ///handle chat event
  socket.on("chat", function (data) {
    // console.log(data);
    io.sockets.emit("chat", data);
  });

  ///Typing
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
