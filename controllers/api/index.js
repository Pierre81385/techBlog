//map out the comment, post, and user routes here
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);

module.exports = router;
