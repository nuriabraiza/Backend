import GenericQueries from "./GenericQueries.js";

export default class ProductService extends GenericQueries {
  constructor(dao) {
    super(dao, "Products");
  }
}
