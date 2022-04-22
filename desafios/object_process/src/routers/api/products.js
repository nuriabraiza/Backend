import { Router } from "express";
import { apiAuth } from "../../auth/index.js";
import { createNFakeProducts } from "../../utils/mocks/products.js";

const productsApiRouter = new Router();

productsApiRouter.get("/productos-test", apiAuth, (_, res) => {
  res.json(createNFakeProducts(10));
});

export default productsApiRouter;
