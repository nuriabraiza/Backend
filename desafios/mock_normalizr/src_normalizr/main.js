import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";
import config from "./config.js";
import addMessagesHandlers from "./routers/messages.js";

dotenv.config();

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

io.on("connection", async (socket) => {
  addMessagesHandlers(socket, io.sockets);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const connectedServer = httpServer.listen(config.PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${
      connectedServer.address().port
    } - http://localhost:${config.PORT}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
