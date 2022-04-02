const faker = require("faker");
const fs = require("fs");

let str = "NAME; PRICE; IMAGE\r\n";

for (let i = 0; i < 50; i++) {
  (str +=
    faker.commerce.productName() +
    ";" +
    faker.commerce.price(
      (number = 1),
      (number = 1000),
      (number = 2),
      (string = "$")
    )),
    +";" + faker.image.fashion() + "\r\n";
}

fs.writeFileSync("test.csv", str);
