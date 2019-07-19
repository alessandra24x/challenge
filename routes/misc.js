const express = require("express");

const router = express.Router();

router.get("/", function(req, res, next) {
  res.render("index", { title: "Mercadolibre" });
});

router.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = router;
