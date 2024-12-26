import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketId=(receiverId)=>{
  return userSocketMap[receiverId];
}

const userSocketMap = {};


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Validate and store userId
  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // Emit the updated list of online users
  io.emit("getOnlineUsers",Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    // Remove the user from the map
    // for (const [key, value] of userSocketMap.entries()) {
    //   if (value === socket.id) {
    //     userSocketMap.delete(key);
    //     break;
    //   }
    // }
    delete userSocketMap[userId];

    // Emit the updated list of online users
    // io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
  });
});

export { app, io, server };
