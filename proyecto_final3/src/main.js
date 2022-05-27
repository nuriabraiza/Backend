import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import config from "./config.js";
import cartApiRouter from "./routers/api/cart.js";
import productsApiRouter from "./routers/api/products.js";
import userApiRouter from "./routers/api/user.js";
import authWebRouter from "./routers/web/auth.js";
import homeWebRouter from "./routers/web/home.js";
import logger from "./services/logging.js";
import initializePassportConfig from "./services/passport-config.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use((req, _, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

initializePassportConfig();
app.use(passport.initialize());

app.use("/api/productos", productsApiRouter);
app.use("/api/carrito", cartApiRouter);
app.use("/api/usuarios", userApiRouter);

app.use(authWebRouter);
app.use(homeWebRouter);
app.use;

app.use((req, res) => {
  logger.warn(`${req.method} ${req.url}`);
  res.sendStatus(404);
});

const connectedServer = app.listen(config.PORT, () => {
  const port = connectedServer.address().port;
  console.log(`Server running at ${process.env.URL_BASE}${port}`);
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
