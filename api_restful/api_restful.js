const express = require("express");
const app = express();
const apiRouter = express.Router();
const PORT = 8080;

const Producto = require("./index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);
app.use("/static", express.static(__dirname + "/public"));

apiRouter.get("/productos", (req, res) => {
  res.send(Producto.prodList);
});

apiRouter.post("/productos", (req, res, next) => {
  let toAdd = req.body;
  let prod = Producto.newProd(toAdd);
  res.send(prod);
});

apiRouter.get("/productos/:id", (req, res) => {
  let id = req.params.id;
  res.send(Producto.getById(id));
});

apiRouter.put("/productos/:id", (req, res, next) => {
  let toChange = req.body;
  let id = req.params.id;
  res.send(Producto.updateProd(toChange, id));
  console.log("Producto Actualizado");
});

apiRouter.delete("/productos/:id", (req, res, next) => {
  let id = req.params.id;
  res.send(Producto.deleteProd(id));
  console.log("Producto Eliminado");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server listening on PORT", PORT);
  }
});
