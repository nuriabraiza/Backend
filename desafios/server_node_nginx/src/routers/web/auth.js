import { Router } from "express";
import passport from "passport";
import path from "path";
import UserApi from "../../api/user.js";

const authWebRouter = new Router();

authWebRouter.get("/", (_, res) => {
  res.redirect("/home");
});

authWebRouter.get("/login", (req, res) => {
  const name = req.session?.name;
  if (name) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(process.cwd(), "/views/login.html"));
  }
});

authWebRouter.get("/register", (req, res) => {
  const name = req.session?.name;
  if (name) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(process.cwd(), "/views/register.html"));
  }
});

authWebRouter.get("/logout", (req, res) => {
  const name = req.session?.name;
  if (name) {
    req.session.destroy((err) => {
      if (!err) {
        res.render(path.join(process.cwd(), "/views/pages/logout.ejs"), {
          name,
        });
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});

authWebRouter.post("/register", (req, res) => {
  const { name, surname, email, password, alias, age } = req.body;
  if (name && surname && email && password && alias && age) {
    const avatar = `https://avatars.dicebear.com/api/identicon/${email}.png`;
    UserApi.createOne({
      name,
      surname,
      email,
      password,
      alias,
      age,
      avatar,
    }).then((user) => {
      if (user.code === 200) {
        req.session.name = user.payload.name;
        req.session.userId = user.payload.id;
        res.redirect("/home");
      } else {
        res.send("Error: no se pudo crear el usuario");
      }
    });
  } else {
    res.send("Error: no se pudo crear el usuario");
  }
});

authWebRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    UserApi.getOneByProperty("email", email).then((user) => {
      if (user.code === 200) {
        if (user.payload.password === password) {
          req.session.name = user.payload.name;
          req.session.userId = user.payload.id;
          return res.redirect("/home");
        } else {
          return res.send("Error: contraseña incorrecta");
        }
      } else {
        return res.send("Error: usuario no encontrado");
      }
    });
  }
});

authWebRouter.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["public_profile"] }),
  (req, res) => {}
);

authWebRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login?error='facebook-login'",
  }),
  (req, res) => {
    req.session.name = req.user.name;
    req.session.userId = req.user.id;
    res.redirect("/");
  }
);

export default authWebRouter;
