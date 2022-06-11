import GenericQueries from "./GenericQueries.js";

export default class CartService extends GenericQueries {
  constructor(dao) {
    super(dao, "Carts");
  }
}
