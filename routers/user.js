const { Router } = require("express");

const User = require("../models").user;

const router = new Router();

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
});

module.exports = router;
