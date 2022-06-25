import { Router } from "express";
import cartController from "../../controllers/carts.js";
import { checkAuthorization } from "../../auth/index.js";
import { passportCall } from "../../services/external/passport-config.js";

const cartApiRouter = Router();

cartApiRouter.get(
  "/",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  cartController.getCarts
);

cartApiRouter.post(
  "/",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  cartController.createCart
);

cartApiRouter.delete(
  "/:id",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  cartController.deleteCart
);

cartApiRouter.post(
  "/:id/checkout",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  cartController.checkout
);

cartApiRouter.get(
  "/:id/productos",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  cartController.getProducts
);

cartApiRouter.post(
  "/:id/productos",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  cartController.addProduct
);

cartApiRouter.delete(
  "/:id/productos/:productId",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  cartController.deleteProductFromCart
);

export default cartApiRouter;
