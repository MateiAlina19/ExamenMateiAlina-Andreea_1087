const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Video extends Model {}

Video.init(
  {
    description: {
      type: DataTypes.STRING,
      length: { minimum: 5 },
    },
    title: {
      type: DataTypes.STRING,
      length: { minimum: 5 },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    validate: {
      isUrl: true,
    },
    },
  },
  {
    sequelize,
    modelName: "video"
  }
);

module.exports = Video;
