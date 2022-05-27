import express from "express";
import { checkAuthorization } from "../../auth/index.js";
import { passportCall } from "../../services/passport-config.js";

const router = express.Router();

router.get(
  "/current",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  (req, res) => {
    res.send({
      user: req.user,
    });
  }
);

export default router;
