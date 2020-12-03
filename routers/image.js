const { Router } = require("express");

const Image = require("../models").image;

const router = new Router();

router.get("/", async (req, res) => {
  const images = await Image.findAll();
  res.status(200).send(images);
});

module.exports = router;
