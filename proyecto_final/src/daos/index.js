let Product;
let Cart;
let mongo = "mongo";

switch (mongo) {
  case "fileSystem":
    const { default: ProductFS } = await import("./product/productFS.js");
    const { default: CartFS } = await import("./cart/cartFS.js");
    Product = new ProductFS();
    Cart = new CartFS();
    break;

  case "mongo":
    const { default: ProductMongo } = await import("./product/productMongo.js");
    const { default: CartMongo } = await import("./cart/cartMongo.js");
    Product = new ProductMongo();
    Cart = new CartMongo();
    break;

  case "firebase":
    const { default: ProductFirebase } = await import(
      "./product/productFirebase.js"
    );
    const { default: CartFirebase } = await import("./cart/cartFirebase.js");
    Product = new ProductFirebase();
    Cart = new CartFirebase();
    break;

  default:
}

export { Product, Cart, mongo };
