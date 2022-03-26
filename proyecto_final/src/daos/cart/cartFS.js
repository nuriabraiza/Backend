import Contenedor from "../../services/databaseFS.js";

export default class CartFileSystem extends Contenedor {
  constructor() {
    super("cart");
  }
}
