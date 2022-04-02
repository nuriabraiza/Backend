const faker = require("faker");

class ProductModel {
  constructor() {}

  generarId() {
    return faker.datatype.uuid();
  }

  generarProducto() {
    return {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(
        (number = 1),
        (number = 1000),
        (number = 2),
        (string = "$")
      ),
      image: faker.image.fashion(),
    };
  }
}

module.exports = new ProductModel();
