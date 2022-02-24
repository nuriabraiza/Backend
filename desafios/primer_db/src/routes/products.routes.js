const express = require("express");
const apiRouter = express.Router();
const { mysql: configMysql } = require("../db/config");
const ProductDB = require("../db/productDB");
const productBase = new ProductDB(configMysql);
const Producto = require("../services/product.service");
const producto = new Producto();

const products = productBase.getAll();
if (products === null) {
  productBase.table();
}

apiRouter.get("/", (req, res) => {
  const products = producto.get();
  productBase
    .table()
    .then(() => {
      return productBase.addProd(products);
    })
    .then(() => {
      return productBase.getAll();
    })
    .then((list) => {
      console.table(list);
    });
  if (!products) {
    return res.status(404).json({
      error: "no hay productos cargados",
    });
  }
});

apiRouter.post("/productos", (res, req) => {
  const data = req.body;
  const products = producto.get();
  if (producto.add(data)) {
    if (data.form === "1")
      return res.redirect("http://localhost:8080/nuevo-producto");
    res.status(201).json(data);
    res.render("nuevo-producto", {
      products: products,
    });
    productBase.addProd(products);
  }
  res.status(400).send();
});

apiRouter.get("/productos/:id", (res, req) => {
  const { id } = req.params;
  const idProd = producto.getById(id);
  if (idProd) {
    return res.json(idProd);
  }
});

apiRouter.put("/productos/:id", (req, res) => {
  const data = req.body;
  const { id } = req.params;
  if (producto.update(id, data)) {
    productBase.updateById(id, data);
    res.status(201).json(data);
  }
  res.status(400).send();
});

apiRouter.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  const idProd = product.getById(id);
  producto.remove(id);
  productBase.deleteById(id);
  res.json(idProd);
});

module.exports = apiRouter;
