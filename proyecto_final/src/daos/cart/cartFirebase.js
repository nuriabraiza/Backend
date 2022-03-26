import Contenedor from "../../services/databaseFirebase.js";
import productFirebase from "../product/productFirebase.js";

export default class CartFirebase extends Contenedor {
  constructor() {
    super("cart");
    this.product = new productFirebase();
  }

  async addToCart(id, pid) {
    try {
      let isProdExist = await this.product.getById(pid).then((e) => e.payload);
      if (!isProdExist) {
        return {
          status: "Error",
          message: "El producto que quiere agregar no existe.",
        };
      }

      let ref = this.collection.doc(id);
      let data = await ref
        .get()
        .then((doc) => (doc.exists ? doc.data() : null));
      if (!data) {
        return { status: "Error", message: `No hay registro de este carrito.` };
      }

      let isProdInCart = data.productos.some((e) => e === pid);
      if (isProdInCart) {
        return {
          status: "Error",
          message: `No se puede agregar varias veces el mismo ID.`,
        };
      }

      await this.collection.doc(id).update({
        productos: this.FieldValue.arrayUnion(pid),
      });

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
      let isProdExist = await this.product.getById(pid).then((e) => e.payload);
      if (!isProdExist) {
        return {
          status: "Error",
          message: "El producto que eliminar del carrito no es valido.",
        };
      }

      let ref = this.collection.doc(id);
      let data = await ref
        .get()
        .then((doc) => (doc.exists ? doc.data() : null));
      if (!data) {
        return { status: "Error", message: `No hay registro de este carrito.` };
      }

      let isProdInCart = data.productos.some((e) => e === pid);
      if (!isProdInCart) {
        return {
          status: "Error",
          message: `No existe el producto dentro del carrito.`,
        };
      }

      let newCart = data.productos.filter((e) => e !== pid);
      /* this.FieldValue.arrayRemove(pid) */ //Borra todo el array..

      await this.collection.doc(id).set({
        productos: newCart,
      });

      return {
        status: "Success",
        message: "Se elimino un producto al carrito.",
      };
    } catch (err) {
      return { status: "Error", message: `Hubo un error: ${err}` };
    }
  }
}
