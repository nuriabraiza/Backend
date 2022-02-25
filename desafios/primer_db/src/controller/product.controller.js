const Product = require("../services/product.service.js");

exports.getForm = async (req, res) => {
  await res.render("index", { productos: Product.getAll() });
};

exports.getAll = async (req, res) => {
  const result = await Product.getAll();
  res.json(result);
};

exports.newProd = async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const result = await Product.newProd(title, price, thumbnail);
  res.json(result);
};

exports.getById = async (req, res) => {
  let id = await req.params.id;
  const result = await Product.getById(id);
  res.status(200).json(result);
};

exports.updateProd = async (req, res) => {
  let toChange = await req.body;
  let id = await req.params.id;
  const result = await Product.updateProd(toChange, id);
  res.status(200).json(result);
};

exports.deleteProd = async (req, res) => {
  let id = await req.params.id;
  const result = await Product.deleteProd(id);
  res.status(200).json(result);
};
