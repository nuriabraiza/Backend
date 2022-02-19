const express = require("express");
const app = express();
const Contenedor = require("../manejo_archivos/contenedor");
const productsList = new Contenedor("productos");

//ROUTES
app.get("/", (req, res) => {
  res.send("Bienvenidos - Ir a /productos o /productoRandom");
});

app.get("/productos", async (req, res) => {
  const products = await productsList.getAll();
  res.send(products);
});

app.get("/productoRandom", (req, res) => {
  const productosParseados = JSON.parse(products, null, 2);
  function obtenerProductoRandom(array) {
    const index = Math.floor(Math.random(array) * array.length);
    return array[index];
  }
  const productoRandom = obtenerProductoRandom(productosParseados);
  const respuesta = {
    code: 200,
    msg: productoRandom,
  };
  res.send(respuesta);
});

//START SERVER
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server on port http://localhost:${PORT}`);
});

server.on("error", (err) => console.log(`Error in server: ${err}`));
