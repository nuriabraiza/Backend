const Producto = require("../services/product.service.js");

exports.getForm = async (req, res) => {
  await res.render("index", { productos: Producto.getAll });
};

exports.getAll = async (req, res) => {
  await res.render("productList", { productos: Producto.getAll });
};

exports.newProd = async (req, res) => {
  let toAdd = await req.body;
  Producto.newProd(toAdd);
  res.redirect("/");
};

exports.getById = async (req, res) => {
  let id = await req.params.id;
  await res.status(200).json(Producto.getById(id));
};

exports.updateProd = async (req, res) => {
  let toChange = await req.body;
  let id = await req.params.id;
  await res.status(200).json(Producto.updateProd(toChange, id));
};

exports.deleteProd = async (req, res) => {
  let id = await req.params.id;
  await res.status(200).json(Producto.deleteProd(id));
};
