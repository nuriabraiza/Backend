import { Router } from "express";
import productController from "../../controllers/products.js";
import { checkAuthorization } from "../../auth/index.js";
import { passportCall } from "../../services/external/passport-config.js";
import upload from "../../services/external/upload.js";

const productsApiRouter = new Router();

//GET
productsApiRouter.get("/", productController.getProducts);

//GET ONE
productsApiRouter.get("/:id", productController.getProductById);

//POST
productsApiRouter.post(
  "/",
  passportCall("jwt"),
  checkAuthorization(["admin"]),
  upload.single("thumbnail"),
  productController.createProduct
);

//UPDATE
productsApiRouter.put(
  "/:id",
  passportCall("jwt"),
  checkAuthorization(["admin"]),
  upload.single("thumbnail"),
  productController.updateProduct
);

//DELETE
productsApiRouter.delete(
  "/:id",
  passportCall("jwt"),
  checkAuthorization(["admin"]),
  productController.deleteProduct
);

export default productsApiRouter;
