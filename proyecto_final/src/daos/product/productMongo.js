import Contenedor from "../../services/dbMongo.js";
import productSchema from "../../models/product.js";

export default class ProductMongo extends Contenedor {
  constructor() {
    super("product", productSchema);
  }
}
