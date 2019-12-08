const SocketIO = require("socket.io");

const axios = require("axios");

module.exports = (server, app) => {
  const io = SocketIO(server, { path: "/socket.io" });
  app.set("io", io);
  const chat = io.of("/chat");

  chat.on("connection", socket => {
    console.log("room 네임스페이스에 접속");

    socket.emit("message", "data 받아라");
    socket.on("disconnect", () => {
      console.log("room 네임스페이스 접속 해제");
    });
  });
};
