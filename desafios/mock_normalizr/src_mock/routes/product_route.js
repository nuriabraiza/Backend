const express = require("express");
const router = express.Router();
const controller = require("../controller/products");

router.get("/generar/:cant", (req, res) => {
  let mocks = controller.generar(req.params.cant);
  res.send(mocks);
});

router.get("/productos-test/:id", (req, res) => {
  let producto = controller.buscarPorId(req.params.id);
  res.send(producto);
});

router.get("/productos-test", (req, res) => {
  let productos = controller.listar();
  res.send(productos);
});

router.post("/productos-test", (req, res) => {
  let resultado = controller.agregar(req.body);
  res.send(resultado);
});

router.put("/productos-test/:id", (req, res) => {
  let resultado = controller.actualizar(req.params.id, req.body);
  res.send(resultado);
});

router.delete("/productos-test/:id", (req, res) => {
  let resultado = controller.eliminar(req.params.id);
  res.send(resultado);
});

module.exports = router;
