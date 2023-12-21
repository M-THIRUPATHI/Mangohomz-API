const express = require("express");
const router = express.Router();
const states = require("../services/statesMaster.services");

router.get("/", async function (req, res, next) {
  try {
    res.json(await states.getMultiple());
  } catch (err) {
    console.error(`Error while loading States `, err.message);
    next(err);
  }
});

module.exports = router;

