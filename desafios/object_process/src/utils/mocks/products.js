import faker from "faker";
faker.locale = "es";

function createNFakeProducts(n) {
  const products = [];
  for (let i = 1; i <= n; i++) {
    const prod = createFakeProduct(i);
    products.push(prod);
  }
  return products;
}

function createFakeProduct(id) {
  const prod = {
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: `${faker.image.imageUrl()}?${isNaN(id) ? 1 : id}`,
  };
  if (id) {
    prod.id = id;
  }
  return prod;
}

export { createFakeProduct, createNFakeProducts };
