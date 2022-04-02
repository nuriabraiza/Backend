import Contenedor from "../../services/dbMongo.js";
import cartSchema from "../../models/cart.js";
import ProductMongo from "../product/productMongo.js";

export default class CartMongo extends Contenedor {
  constructor() {
    super("cart", cartSchema);
    this.product = new ProductMongo();
  }

  async addToCart(id, pid) {
    try {
      if (pid.length < 24) {
        return { status: "Error", message: "Debe agregar un ID válido." };
      }

      let isProdExist = await this.product.collection.findOne({ _id: pid });
      if (!isProdExist) {
        return {
          status: "Error",
          message: "El producto que quiere agregar no existe.",
        };
      }

      let isProdInCart = await this.collection.findOne({
        _id: id,
        productos: pid,
      });
      if (isProdInCart) {
        return {
          status: "Error",
          message: `No se puede agregar varias veces el mismo ID.`,
        };
      }

      await this.collection.updateOne(
        { _id: id },
        { $push: { productos: pid } }
      );
      return {
        status: "Success",
        message: "Se agrego un producto al carrito.",
      };
    } catch (err) {
      return { status: "Error", message: `Hubo un error: ${err}` };
    }
  }

  async removeFromCart(id, pid) {
    try {
      if (pid.length < 24) {
        return { status: "Error", message: "Debe agregar un ID válido." };
      }

      let isProdExist = await this.product.collection.findOne({ _id: pid });
      if (!isProdExist) {
        return {
          status: "Error",
          message: "El producto que eliminar del carrito no es valido.",
        };
      }

      let isProdInCart = await this.collection.findOne({
        _id: id,
        productos: pid,
      });
      if (!isProdInCart) {
        return {
          status: "Error",
          message: `No existe el producto dentro del carrito.`,
        };
      }

      await this.collection.updateOne(
        { _id: id },
        { $pull: { productos: pid } }
      );
      return {
        status: "Success",
        message: "Se elimino un producto al carrito.",
      };
    } catch (err) {
      return { status: "Error", message: `Hubo un error: ${err}` };
    }
  }
}
