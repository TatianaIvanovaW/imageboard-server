const { Router } = require("express");
const jwt = require("../auth/jwt");
const { auth } = require("../auth/middleware");

const Image = require("../models").image;
const User = require("../models").user;

const router = new Router();

router.get("/", auth, async (req, res, next) => {
  const limit = Math.min(req.query.limit || 25, 500);
  const offset = req.query.offset || 0;

  try {
    const images = await Image.findAndCountAll({ limit, offset });
    res.status(200).send({ images: images.rows, total: images.count });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const newImage = await Image.create(req.body);
    res.status(200).json(newImage);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res) => {
  const imageId = req.params.id;

  try {
    const imageById = await Image.findByPk(imageId);
    if (!imageById) return res.status(404).send("image not found");
    res.status(200).send(imageById);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
