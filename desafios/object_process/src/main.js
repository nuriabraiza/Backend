import MongoStore from "connect-mongo";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { Server as HttpServer } from "http";
import passport from "passport";
import { Server as Socket } from "socket.io";
import config from "./config.js";
import productsApiRouter from "./routers/api/products.js";
import randomApiRouter from "./routers/api/random.js";
import authWebRouter from "./routers/web/auth.js";
import homeWebRouter from "./routers/web/home.js";
import addMessagesHandlers from "./routers/ws/messages.js";
import addProductsHandlers from "./routers/ws/products.js";
import { initializePassportConfigFb } from "./services/passport-configFb.js";
import { initializePassportConfigTw } from "./services/passport-configTw.js";

dotenv.config();

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

io.on("connection", async (socket) => {
  addProductsHandlers(socket, io.sockets);
  addMessagesHandlers(socket, io.sockets);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(
  session({
    store: MongoStore.create({ mongoUrl: config.mongodb.cnxStr }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 600000,
    },
  })
);
initializePassportConfigFb();
app.use(passport.initialize());
app.use(passport.session());

initializePassportConfigTw();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", productsApiRouter);
app.use("/api", randomApiRouter);
app.use(authWebRouter);
app.use(homeWebRouter);

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
