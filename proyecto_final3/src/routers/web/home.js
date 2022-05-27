import { Router } from "express";
import path from "path";
import { checkAuthorization } from "../../auth/index.js";
import { passportCall } from "../../services/passport-config.js";
const homeWebRouter = new Router();

homeWebRouter.get(
  "/home",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  (req, res) => {
    const user = req.user;
    res.render(path.join(process.cwd(), "/views/pages/index.ejs"), {
      name: user.name,
      id: user.id,
      avatar: user.avatar,
    });
  }
);

homeWebRouter.get(
  "/carrito",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  (req, res) => {
    const user = req.user;
    res.render(path.join(process.cwd(), "/views/pages/carrito.ejs"), {
      name: user.name,
      id: user.id,
      avatar: user.avatar,
    });
  }
);

homeWebRouter.get(
  "/perfil",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  (req, res) => {
    res.render(path.join(process.cwd(), "/views/pages/perfil.ejs"), {
      user: req.user,
    });
  }
);

export default homeWebRouter;
