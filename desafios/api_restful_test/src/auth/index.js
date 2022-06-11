export const checkAuthorization = (roles) => {
  return async (req, res, next) => {
    if (!req.user) return res.send({ error: "Not authorized" });
    if (roles.includes(req.user.role)) next();
    else res.status(403).send({ error: "User not allowed at this endpoint" });
    return;
  };
};
