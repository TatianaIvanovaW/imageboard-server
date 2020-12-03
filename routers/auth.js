const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const User = require("../models").user;
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send("you need to enter your name");
  if (!password) return res.status(400).send("you need to enter your password");

  try {
    const userLoggin = await User.findOne({ where: { email } });
    if (!userLoggin) return res.status(404).send("user not found");

    const comparison = bcrypt.compareSync(password, userLoggin.password);

    if (!comparison) return res.status(400).send("wrong password");

    return res.send({
      jwt: toJWT({ userId: userLoggin.id }),
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
