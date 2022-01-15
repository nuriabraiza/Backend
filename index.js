const express = require("express");
const moment = require("moment");
const app = express();
const PORT = 3007;
let contador = 0;

app.get("/", (req, res) => {
  console.log(req);
  res.send("Bienvenidos");
});

app.get("/visitas", (req, res) => {
  console.log(req);
  contador++;
  res.send(`Cantidad de visitas: ${contador}`);
});

app.get("/fyh", (req, res) => {
  res.send({ fyh: moment().format("DD/MM/YYYY HH:mm:SS") });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor Http escuchando en el puerto http://localhost:${PORT}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
