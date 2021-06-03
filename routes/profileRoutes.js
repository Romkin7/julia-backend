const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    user: { username: "john", email: "john.doe@gmail.com" },
  });
});

/* router.get("/events", (req, res) => {
  return res.send("Hello world from events");
}); */

module.exports = router;
