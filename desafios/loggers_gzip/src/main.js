import cluster from "cluster";
import compression from "compression";
import MongoStore from "connect-mongo";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { Server as HttpServer } from "http";
import os from "os";
import passport from "passport";
import { Server as Socket } from "socket.io";
import config from "./config.js";
import productsApiRouter from "./routers/api/products.js";
import randomApiRouter from "./routers/api/random.js";
import authWebRouter from "./routers/web/auth.js";
import homeWebRouter from "./routers/web/home.js";
import addMessagesHandlers from "./routers/ws/messages.js";
import addProductsHandlers from "./routers/ws/products.js";
import logger from "./services/logging.js";
import { initializePassportConfigFb } from "./services/passport-configFb.js";
import { initializePassportConfigTw } from "./services/passport-configTw.js";

dotenv.config();

const mongoUrl = config.mongodb.cnxStr;

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

io.on("connection", async (socket) => {
  addProductsHandlers(socket, io.sockets);
  addMessagesHandlers(socket, io.sockets);
});

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(
  session({
    store: MongoStore.create({ mongoUrl }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 600000,
    },
  })
);

app.use((req, _, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

initializePassportConfigFb();
app.use(passport.initialize());
app.use(passport.session());

initializePassportConfigTw();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/productos", productsApiRouter);
app.use("/api", randomApiRouter);
app.use(authWebRouter);
app.use(homeWebRouter);

app.use((req, res) => {
  logger.warn(`${req.method} ${req.url}`);
  res.sendStatus(404);
});

if (config.MODE === "cluster" && cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Master process PID: ${process.pid}`);

  console.log(`Starting ${numCPUs} workers...`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, _code, _signal) => {
    console.log(`The subprocess ${worker.process.pid} died. Restarting..`);
    cluster.fork();
  });
} else {
  const connectedServer = httpServer.listen(config.PORT, () => {
    console.log(
      `Server on port ${config.PORT} || Worker ${process.pid} started! - http://localhost:${config.PORT}`
    );
  });
  connectedServer.on("error", (error) =>
    console.log(`Error en servidor ${error}`)
  );
}
