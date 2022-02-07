const express = require("express");
const sequelize = require("./database");
const video = require("./routes/video");
const favouritelist = require("./routes/favouritelist");
const cors = require("cors");

sequelize.sync({ force: true }).then(() => console.log("db ready"));

const app = express();

app.use(express.json());
app.use(cors());
app.use("/videos", video);
app.use("/favouritelists", favouritelist);

app.listen(8080, () => {
  console.log("app is running");
});
