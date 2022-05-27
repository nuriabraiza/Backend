import mongoose from "mongoose";
import Container from "../containers/Container.js";
import { returnMessage } from "../utils/functions.js";

class CartsApi extends Container {
  constructor() {
    super(
      "carts",
      new mongoose.Schema(
        {
          productos: { type: Array, required: true },
          userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        },
        { timestamps: true }
      ),
      "Carrito"
    );
  }

  async createOne(userId, cart = { productos: [] }) {
    return super.createOne({ ...cart, userId });
  }

  async addProducts(id, products) {
    const cart = await super.getOneById(id);
    if (cart.code !== 200) {
      return cart;
    }
    const cartPayload = cart.payload;
    if (products.length === 0) {
      return returnMessage(true, 400, "No se encontró el producto", null);
    }

    products.forEach((product) => {
      const productFound = cartPayload.productos.find(
        (prod) => prod.id === product.id
      );
      let amount = 1;
      if (productFound) {
        productFound.amount += amount;
      } else {
        cartPayload.productos.push({ ...product, amount });
      }
    });

    const cartUpdated = await super.updateOneById(id, cartPayload);
    return cartUpdated;
  }

  async deleteProduct(id, productId) {
    const cart = await super.getOneById(id);
    if (cart.code !== 200) {
      return cart;
    }

    const product = cart.payload.productos.find(
      (product) => product.id === productId
    );
    if (product === undefined) {
      return returnMessage(
        true,
        400,
        "No se encontró el producto en el carrito",
        null
      );
    }

    cart.payload.productos = cart.payload.productos.filter(
      (product) => product.id !== productId
    );
    return await super.updateOneById(id, cart.payload);
  }
}

export default new CartsApi();
