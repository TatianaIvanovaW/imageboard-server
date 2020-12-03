const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const User = require("../models").user;

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send("you need to enter your name");
  if (!password) return res.status(400).send("you need to enter tour password");

  try {
    const tryToLoggin = await User.findOne({ where: { email } });
    if (!tryToLoggin) return res.status(404).send("user not found");
    if (tryToLoggin.password !== password) return res.send("wrong password");

    return res.send({
      jwt: toJWT({ userId: tryToLoggin.id }),
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
