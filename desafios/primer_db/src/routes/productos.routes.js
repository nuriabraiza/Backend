const express = require("express");
const apiRouter = express.Router();

const productController = require("../controller/product.controller.js");

apiRouter.get("/", productController.getForm);

apiRouter.post("/productos", productController.newProd);

apiRouter.get("/productos", productController.getAll);

apiRouter.get("/productos/:id", productController.getById);

apiRouter.put("/productos/:id", productController.updateProd);

apiRouter.delete("/productos/:id", productController.deleteProd);

module.exports = apiRouter;
