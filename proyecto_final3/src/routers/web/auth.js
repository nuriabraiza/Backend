import { Router } from "express";
import path from "path";
import jwt from "jsonwebtoken";
import { passportCall } from "../../services/passport-config.js";
import upload from "../../services/upload.js";
import config from "../../config.js";
import { checkAuthorization } from "../../auth/index.js";

const authWebRouter = new Router();

authWebRouter.get("/", (_, res) => {
  res.redirect("/home");
});

authWebRouter.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(process.cwd(), "/views/login.html"));
  }
});

authWebRouter.get("/register", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(process.cwd(), "/views/register.html"));
  }
});

authWebRouter.get(
  "/logout",
  passportCall("jwt"),
  checkAuthorization(["admin", "user"]),
  (req, res) => {
    if (req.user) {
      res.clearCookie("JWT_COOKIE");
    }
    res.redirect("/login");
  }
);

authWebRouter.post(
  "/register",
  upload.single("avatar"),
  passportCall("signup"),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(user, config.JWT_SECRET);
    res.cookie("JWT_COOKIE", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.redirect("/");
  }
);

authWebRouter.post("/login", passportCall("login"), (req, res) => {
  const user = req.user;
  const token = jwt.sign(user, config.JWT_SECRET);
  res.cookie("JWT_COOKIE", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  res.redirect("/");
});

export default authWebRouter;
