import "dotenv/config";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import colors from "colors";
import cors from "cors";

const PORT = process.env.PORT || 3004;
const whiteList = process.env.WHITE_LIST
  ? process.env.WHITE_LIST.split(",")
  : "";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: whiteList,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log();
  socket.on("chat", (data) => {
    console.log(
      colors.bgMagenta.black(
        `--->>> Client connected --- ${JSON.stringify(data)}   `
      )
    );
    socket.broadcast.emit("chat", (data = { ...data, from: socket.id }));
  });
});

const main = () => {
  server.listen(PORT, () => {
    console.log(
      colors.bgGreen.black(` ==>> Server chat is running on PORT ${PORT} `)
    );
  });
};

main();
