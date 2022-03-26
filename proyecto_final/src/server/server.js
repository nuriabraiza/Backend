import express from "express";
import { engine } from "express-handlebars";
import __dirname from "../utils/utils";
import APIProducts from "../routes/products.js";
import APICart from "../routes/cart.js";

const initialConfig = {
  port: 8080,
};

export default class Server {
  constructor(port = initialConfig.port) {
    this.app = express();
    this.PORT = process.env.PORT || port;
    this.server = this.app.listen(this.PORT, () =>
      console.log(
        `Servidor escuchando en el puerto: http://localhost:${this.PORT}`
      )
    );
    this.routes();
    this.engines();
  }

  routes() {
    this.app.use("/");
    this.app.use("/api/cart", APICart);
    this.app.use("/api/products", APIProducts);
    this.app.use("/*", (req, res) => {
      res.status(400).send({
        error: -2,
        descripcion: `La ruta '${req.baseUrl}' con el método [${req.method}] no existe.`,
      });
    });
  }

  engines() {
    this.app.engine(
      "handlebars",
      engine({
        partialsDir: `${__dirname}/views/partials`,
      })
    );
    this.app.set("view engine", "handlebars");
    this.app.set("views", `${__dirname}/views`);
  }
}
