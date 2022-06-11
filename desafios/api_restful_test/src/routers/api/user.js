import express from "express";
import { checkAuthorization } from "../../auth/index.js";
import { passportCall } from "../../services/external/passport-config.js";
import userController from "../../controllers/users.js";

const router = express.Router();

router.get(
  "/current",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  userController.currentSession
);

export default router;
