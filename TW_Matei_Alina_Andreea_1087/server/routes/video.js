const express = require("express");
const router = express.Router();
const Video = require("../data/Video");

router.post("/", async (req, res) => {
  await Video.create(req.body);
  res.send("video is inserted");
});

router.get("/", async (req, res) => {
  const videos = await Video.findAll();
  res.send(videos);
});

router.get("/:id", async (req, res) => {
  const reqId = req.params.id;
  const video = await Video.findOne({ where: { id: reqId } });

  if (!video) {
    res.status(404).send("The video does not exist");
    return;
  }

  res.send(video);
});

router.get("/list/:id", async (req, res) => {
    const reqId = req.params.id;
    const video = await Video.findAll({ where: { ListId: reqId } });
  
    if (!video) {
      res.status(404).send("The video does not exist");
      return;
    }
  
    res.send(video);
  });


router.put("/:id", async (req, res) => {
  const reqId = req.params.id;
  const video = await Video.findOne({ where: { id: reqId } });

  if (!video) {
    res.status(404).send("The video does not exist");
    return;
  }

  video.title = req.body.title;
  video.description = req.body.description;
  video.url = req.body.url;
  await video.save();
  res.send("updated");
});

router.delete("/:id", async (req, res) => {
  const reqId = req.params.id;
  await Video.destroy({ where: { id: reqId } });
  res.send("removed");
});

module.exports = router;
