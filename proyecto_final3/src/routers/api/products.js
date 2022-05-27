import { Router } from "express";
import productsApi from "../../api/products.js";
import { checkAuthorization } from "../../auth/index.js";
import { passportCall } from "../../services/passport-config.js";
import upload from "../../services/upload.js";

const productsApiRouter = new Router();

//GET
productsApiRouter.get("/", async (_, res) => {
  const result = await productsApi.getAll();
  res.status(result.code).json(result);
});

//GET ONE
productsApiRouter.get("/:id", async (req, res) => {
  const id = /^\d+$/.test(req.params.id)
    ? parseInt(req.params.id)
    : req.params.id;
  const result = await productsApi.getOneById(id);
  res.status(result.code).json(result);
});

//POST
productsApiRouter.post(
  "/",
  passportCall("jwt"),
  checkAuthorization(["admin"]),
  upload.single("thumbnail"),
  async (req, res) => {
    const product = req.body;
    const result = await productsApi.createOne(product, req.file);
    res.status(result.code).json(result);
  }
);

//UPDATE
productsApiRouter.put(
  "/:id",
  passportCall("jwt"),
  upload.single("thumbnail"),
  checkAuthorization(["admin"]),
  async (req, res) => {
    const id = /^\d+$/.test(req.params.id)
      ? parseInt(req.params.id)
      : req.params.id;
    const product = req.body;
    const result = await productsApi.updateOneById(id, product, req.file);

    res.status(result.code).json(result);
  }
);

//DELETE
productsApiRouter.delete(
  "/:id",
  passportCall("jwt"),
  checkAuthorization(["admin"]),
  async (req, res) => {
    const id = /^\d+$/.test(req.params.id)
      ? parseInt(req.params.id)
      : req.params.id;
    const result = await productsApi.deleteOneById(id);
    res.status(result.code).json(result);
  }
);

export default productsApiRouter;
