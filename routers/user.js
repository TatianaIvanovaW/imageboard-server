const { Router } = require("express");

const User = require("../models").user;

const router = new Router();

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
});

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
