const express = require("express");
const app = express();
const Contenedor = require("./contenedor");
const productsList = new Contenedor("./productos");

//ROUTES
app.get("/", (req, res) => {
  res.send("Bienvenidos - Ir a /productos o /productoRandom");
});

app.get("/productos", async (req, res) => {
  const products = await productsList.getAll();
  res.send(products);
});

app.get("/productoRandom", async (req, res) => {
  const data = await productsList.getAll();
  const random = Math.floor(Math.random() * data.length);
  res.send(await productsList.getById(parseInt(random + 1)));
});

//START SERVER
const PORT = process.env.PORT || 3050;

const server = app.listen(PORT, () => {
  console.log(`Server on port http://localhost:${PORT}`);
});

server.on("error", (err) => console.log(`Error in server: ${err}`));
