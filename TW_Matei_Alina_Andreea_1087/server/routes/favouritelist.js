const express = require("express");
const router = express.Router();
const FavouriteList = require("../data/FavouriteList");

router.post("/", async (req, res) => {
  await FavouriteList.create(req.body);
  res.send("favouritelist is inserted");
});

router.get("/", async (req, res) => {
  const favouritelists = await FavouriteList.findAll();
  res.send(favouritelists);
});

router.get("/:id", async (req, res) => {
  const reqId = req.params.id;
  const favouritelist = await FavouriteList.findOne({ where: { id: reqId } });

  if (!favouritelist) {
    res.status(404).send("The favourite list does not exist");
    return;
  }

  res.send(favouritelist);
});


router.put("/:id", async (req, res) => {
  const reqId = req.params.id;
  const favouritelist = await FavouriteList.findOne({ where: { id: reqId } });

  if (!favouritelist) {
    res.status(404).send("The favouritelist does not exist");
    return;
  }

  favouritelist.description = req.body.description;
  await favouritelist.save();
  res.send("updated");
});

router.delete("/:id", async (req, res) => {
  const reqId = req.params.id;
  await FavouriteList.destroy({ where: { id: reqId } });
  res.send("removed");
});

module.exports = router;
