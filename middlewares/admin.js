module.exports = (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(403).send("Unauthorized user. Forbidden operation");

  next();
};
