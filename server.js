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
  const randomProduct = await productsList.getRandomProduct();

  res.send(randomProduct);
});

//START SERVER
const PORT = process.env.PORT || 3050;

const server = app.listen(PORT, () => {
  console.log(`Server on port http://localhost:${PORT}`);
});

server.on("error", (err) => console.log(`Error in server: ${err}`));
