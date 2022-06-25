import compression from "compression";
import cors from "cors";
import express from "express";
import passport from "passport";
import config from "./config.js";
import { userRouter, cartRouter, productRouter } from "./routers/api/index.js";
import authWebRouter from "./routers/web/auth.js";
import homeWebRouter from "./routers/web/home.js";
import { logger, initializePassportConfig } from "./services/external/index.js";
import cookieParser from "cookie-parser";
import { graphqlHTTP } from "express-graphql";

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

app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);
app.use("/api/usuarios", userRouter);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.use(authWebRouter);
app.use(homeWebRouter);

app.use((req, res) => {
  logger.warn(`${req.method} ${req.url}`);
  res.sendStatus(404);
});

const connectedServer = app.listen(config.PORT, () => {
  const port = connectedServer.address().port;
  console.log(`Server running at ${config.URL_BASE}${port}`);
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
