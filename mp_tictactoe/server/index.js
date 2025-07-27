const express = require("express");
const http = require("http");
const { default: mongoose } = require("mongoose");

/*
mongodb+srv://hishenal21:qZjBVR4g1Hk7SIl3@cluster0.8hbabcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
*/

const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);

var io = require("socket.io")(server);
const DB =
  "mongodb+srv://hishenal21:test123@cluster0.jwttabp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("createRoom", async ({ nickName }) => {
    console.log(`${nickName} created a room`);
    console.log(socket.id);
    // socket.join(nickName);
    // socket.emit("roomCreated", { message: `Room created by ${nickName}` });
  });
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
