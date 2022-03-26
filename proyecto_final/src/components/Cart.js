import { Cart } from "../daos/index.js";
import { request, response } from "express";

const showCart = (req = request, res = response) => {
  let { id } = req.params;
  Cart.getById(id).then((item) => {
    if (item.status === "Error") {
      res.status(404).send(item.message);
    } else {
      res.status(200).send(item.payload);
    }
  });
};

const createCart = (req = request, res = response) => {
  const newCart = {
    productos: [],
  };
  Cart.save(newCart).then((item) => {
    if (item.status === "Error") {
      res.status(404).send(item.message);
    } else {
      res.status(201).send({ id: JSON.stringify(item.id) });
    }
  });
};

const addToCart = (req = request, res = response) => {
  // Agrega productos al carrito según su ID
  const { id } = req.params;
  const { pid } = req.body;

  Cart.addToCart(id, pid).then((e) => {
    if (e.status === "Error") {
      return res.status(404).send({
        status: "Error",
        message: e.message,
      });
    } else {
      return res.status(201).send({
        status: "Success",
        message: e.message,
      });
    }
  });
};

const deleteCart = (req = request, res = response) => {
  // Borra un carrito con todos sus productos
  let { id } = req.params;
  Cart.deleteById(id).then((item) => {
    if (item.status === "Error") {
      res.status(404).send(item.message);
    } else {
      res.status(200).send(item.message);
    }
  });
};

const deleteProductCart = (req = request, res = response) => {
  // Borra un producto del carrita
  let { id, id_prod } = req.params;

  Cart.removeFromCart(id, id_prod).then((e) => {
    if (e.status === "Error") {
      res.status(404).send(e.message);
    } else {
      res.status(200).send(e.message);
    }
  });
};

export { showCart, createCart, addToCart, deleteCart, deleteProductCart };
