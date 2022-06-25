export default class Product {
  constructor(data) {
    this.data = data;
  }

  static get model() {
    return "Products";
  }

  static get schema() {
    return {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true },
    };
  }
}
