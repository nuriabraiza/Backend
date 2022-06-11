import productsApiRouter from "../routers/api/product.js";

const { default: axios } = require("axios");

async function getProds() {
  try {
    let res = await axios.get("http://localhost:8080/");
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

async function pushProds() {
  try {
    let prod = productsApiRouter.put;
    let res = await axios.post("http://localhost:8080/", { prod });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

setInterval(() => {
  pushProds();
}, 2000);
setInterval(() => {
  console.log("Obteniendo lista de números...");
  getProds();
}, 10000);
