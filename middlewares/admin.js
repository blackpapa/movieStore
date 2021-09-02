const config = require("config");

module.exports = (req, res, next) => {
  if (!config.get("requireAuth")) return next();
  if (!req.user.isAdmin)
    return res.status(403).send("Unauthorized user. Forbidden operation");

  next();
};
