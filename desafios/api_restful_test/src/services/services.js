import Dao from "../dao/dao.js";
import UserService from "./users.js";
import ProductService from "./products.js";
import CartService from "./carts.js";

const dao = new Dao();

export const userService = new UserService(dao);
export const productService = new ProductService(dao);
export const cartService = new CartService(dao);
