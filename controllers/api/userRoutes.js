//CRUD routes for users
const router = require("express").Router();
const { response } = require("express");
const { User, Post, Comment } = require("../../models");

// Inquire Test JSON
// {
// 	"username": "testPOSTuser2",
// 	"password": "testPassword5"
// }

//CREATE
router.post("/", (req, res) => {
  console.log(req.body.username);
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//READ
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["[password"] },
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "content", "created_at"],
      },

      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
      {
        model: Post,
        attributes: ["title"],
      },
    ],
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//UPDATE TODO

//DELETE
// router.delete("/:id", (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((data) => {
//       if (!data) {
//         res.status(404).json({ message: "No user found with this id" });
//         return;
//       }
//       console.log("deleting" + data);
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

//LOGIN and LOGOUT
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((data) => {
      console.log(data);

      if (!data) {
        console.log("No user with that name");
        res.status(400).json({ message: "No user with that username!" });
        return;
      }
      const validPassword = data.checkPassword(req.body.password);

      if (!validPassword) {
        console.log("No user with that password");
        res.status(400).json({ message: "Incorrect password!" });
        return;
      }
      req.session.save(() => {
        req.session.user_id = data.id;
        req.session.username = data.username;
        req.session.loggedIn = true;

        console.log("Logged in!");
        res.json({ user: data, message: "You are now logged in!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
