const express = require("express");
const http = require("http");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
const Room = require("./models/room");

// Add CORS configuration for Socket.IO
var io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"], // Allowed HTTP methods
  },
});

const DB = process.env.MONGO_URI;

app.use(express.json());

// Add CORS middleware for regular HTTP requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("createRoom", async ({ nickname }) => {
    console.log(nickname);
    console.log(socket.id);

    try {
      // room is created
      let room = new Room();
      let player = {
        socketID: socket.id,
        nickname,
        playerType: "X",
      };
      room.players.push(player);
      room.turn = player;
      room = await room.save();
      const roomId = room._id.toString();

      socket.join(roomId);
      io.to(roomId).emit("createRoomSuccess", room);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("joinRoom", async ({ nickname, roomId }) => {
    try {
      if (!roomId.match(/^[0-9a-fA-F]{24}$/)) {
        socket.emit("joinRoomError", "Invalid room ID");
        return;
      }
      let room = await Room.findById(roomId);

      if (room.isJoin) {
        let player = {
          socketID: socket.id,
          nickname,
          playerType: "O",
        };
        socket.join(roomId);
        room.players.push(player);
        room.isJoin = false; // Set isJoin to false after a player joins
        room = await room.save();
        io.to(roomId).emit("joinRoomSuccess", room);
        io.to(roomId).emit("updatePlayers", room.players);
        io.to(roomId).emit("updateRoom", room);
      } else {
        socket.emit("errorOccurred", "Game is processing");
      }
    } catch (error) {
      console.log(error);
      socket.emit("joinRoomError", "Room not found");
      return;
    }
  });

  socket.on("tap", async ({ index, roomId, displayElements }) => {
    try {
      let room = await Room.findById(roomId);

      let choice = room.turn.playerType;

      if (room.turnIndex === 0) {
        room.turn = room.players[1];
        room.turnIndex = 1;
      } else {
        room.turn = room.players[0];
        room.turnIndex = 0;
      }
      room = await room.save();

      io.to(roomId).emit("tapped", {
        index,
        choice,
        displayElements,
      });
    } catch (error) {
      console.log(error);
      socket.emit("errorOccurred", "Error while tapping");
    }
  });

  socket.on("winner", async ({ winnerSocketId, roomId }) => {
    try {
      let room = await Room.findById(roomId);
      let player = room.players.find(
        (player) => player.socketID === winnerSocketId
      );
      player.points += 1;
      room = await room.save();

      if (player.points >= room.maxRounds) {
        io.to(roomId).emit("gameOver", player);
      } else {
        io.to(roomId).emit("pointIncrease", player);
      }
    } catch (error) {
      console.log(error);
      socket.emit("errorOccurred", "Error while checking winner");
    }
  });
});

mongoose
  .connect(DB)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
