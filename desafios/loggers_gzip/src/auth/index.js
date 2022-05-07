export function webAuth(req, res, next) {
  if (req.session?.name) {
    next();
  } else {
    res.redirect("/login");
  }
}

export function apiAuth(req, res, next) {
  if (req.session?.name) {
    next();
  } else {
    res.status(401).json({ error: "no autorizado!" });
  }
}
