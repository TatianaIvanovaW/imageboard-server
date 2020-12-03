const { Router } = require("express");

const User = require("../models").user;

const router = new Router();

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
});

router.post("/", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log(`${fullName}, ${email}, ${password}`);
    if (!fullName || !password || !email) {
      res.status(400).send("missing parametr");
    } else {
      const newUser = await User.create({ fullName, email, password });
      res.status(200).json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
