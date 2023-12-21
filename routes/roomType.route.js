const express = require("express");
const router = express.Router();
const roomType = require("../services/roomType.services");

router.get("/", async function (req, res, next) {
  try {
    res.json(await roomType.getRoomTYpe());
  } catch (err) {
    console.error(`Error while loading roomType `, err.message);
    next(err);
  }
});

module.exports = router;

