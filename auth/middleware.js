const User = require("../models").user;
const { toData } = require("./jwt");

async function auth(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return res.send("missing auth");
    const [bearer, token] = authorization.split(" ");
    if (!bearer || bearer !== "Bearer") return res.send("missing Bearer");
    if (!token) return res.send("missing token");

    const data = toData(token);
    const { userId } = data;
    console.log(userId);
    const user = await User.findByPk(userId);
    if (!user) return res.status(400).send("you have no access");
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send("invalid token");
    next(e);
  }
}

module.exports = { auth };
