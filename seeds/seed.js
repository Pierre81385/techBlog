const sequelize = require("../config/connection");
const { User, Comment, Post } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualiHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData, {
    individualiHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    individualiHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
