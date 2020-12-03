const { Router } = require("express");

const Image = require("../models").image;

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const images = await Image.findAll();
    res.status(200).send(images);
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
