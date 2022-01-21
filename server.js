const express = require("express");
const Contenedor = require("./contenedor");
const RandomNumber = (min, max) =>
  Math.round(Math.random() * (max + min) + min);

const PORT = 3003;
/* ------ SERVER ------ */

class Server {
  constructor(port = PORT, fileName = "productos") {
    this.app = express();
    this.PORT = port;
    this.database = new Contenedor(fileName);
    this.routes();
  }
  routes() {
    this.app.get("/", (req, res) => {
      console.log(req);
      res.send("Bienvenidos");
    });

    this.app.get("/productos", (req, res) => {
      this.database.getAll().then((items) => {
        res.send(items.productos);
      });
    });

    this.app.get("/productoRandom", (req, res) => {
      this.database.getById(RandomNumber(1, 6)).then((item) => {
        res.send(item.producto);
      });
    });

    this.app.listen(PORT, () => {
      console.log(
        `Servidor Http escuchando en el puerto http://localhost:${this.PORT}`
      );
    });

    this.app.on("error", (error) => console.log(`Error en servidor ${error}`));
  }
}
