import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import colors from 'colors';
import morgan from 'morgan';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3004;
const whiteList = process.env.WHITE_LIST

app.use(cors({origin: whiteList}));

// Middlewares



const main = () => {
  server.listen(PORT, () => {
    console.log(colors.bgGreen.black(` ==>> Server chat is running on PORT ${PORT} `))
  })
}


main();

