import { request, response } from "express";
import { Product } from "../daos/index.js";

const getAllProducts = (req = request, res = response) => {
  Product.getAll().then((items) => {
    if (items.status === "Error") {
      res.status(404).send(items.message);
    } else {
      res.status(200).send(items.payload);
    }
  });
};

const getProductByPID = (req = request, res = response) => {
  let { pid } = req.params;
  Product.getById(pid).then((item) => {
    if (item.status === "Error") {
      res.status(404).send(item.message);
    } else {
      res.status(200).send(item.payload);
    }
  });
};

const saveProduct = (req = request, res = response) => {
  let { title, description, thumbnail, price, stock } = req.body;
  const object = {
    code: `PROD-${Date.now()}`,
    title,
    description,
    thumbnail,
    price,
    stock,
  };

  if (!title || !description || !thumbnail || !price || !stock) {
    res
      .status(404)
      .send("No se puede guardar un producto con campos incompletos.");
  } else {
    Product.save(object).then((item) => {
      if (item.status === "Error") {
        res.status(404).send(item.message);
      } else {
        Product.getAll().then((items) => {
          if (items.status === "Error") {
            res.status(404).send(items.message);
          } else {
            let res = JSON.parse(JSON.stringify(items));
            req.io.io.emit("updateProducts", res);
          }
        });
        res.status(201).send(JSON.stringify(item.id));
      }
    });
  }
};

const updateProduct = (req = request, res = response) => {
  let { pid } = req.params;
  let { title, description, thumbnail, price, stock } = req.body;
  const obj = {
    title,
    description,
    thumbnail,
    price,
    stock,
  };

  if (!title || !description || !thumbnail || !price || !stock) {
    res
      .status(404)
      .send("No se puede guardar un producto con campos incompletos.");
  } else {
    Product.update(pid, obj).then((item) => {
      if (item.status === "Error") {
        res.status(404).send(item.message);
      } else {
        res.status(201).send(item.message);
      }
    });
  }
};

const deleteProduct = (req = request, res = response) => {
  let { pid } = req.params;
  Product.deleteById(pid).then((item) => {
    console.log(item);
    if (item.status === "Error") {
      res.status(404).send(item.message);
    } else {
      res.status(200).send(item.message);
    }
  });
};

export {
  getAllProducts,
  getProductByPID,
  saveProduct,
  updateProduct,
  deleteProduct,
};
