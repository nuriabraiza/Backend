import { Router } from "express";
import {
  showCart,
  addToCart,
  deleteCart,
  deleteProductCart,
} from "../components/Cart.js";

const APICart = Router();

APICart.get("/:id/products", showCart);
APICart.post("/:id/product", addToCart);
APICart.delete("/:id", deleteCart);
APICart.delete("/:id/product/:id_prod", deleteProductCart);

export default APICart;
