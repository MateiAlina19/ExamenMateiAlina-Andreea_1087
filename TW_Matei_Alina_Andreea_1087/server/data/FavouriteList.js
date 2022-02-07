const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
const Video = require("./Video");

class FavouriteList extends Model {}

FavouriteList.init(
  {
    description: {
      type: DataTypes.STRING,
      length: { minimum: 3 },
    },
  },
  {
    sequelize,
    modelName: "favouritelist",
  }
);

FavouriteList.hasMany(Video, {foreignKey:"ListId"});
module.exports = FavouriteList;
