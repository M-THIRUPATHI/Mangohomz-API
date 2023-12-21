const express = require("express");
const router = express.Router();
const propertiesDropdown = require("../services/propertiesMaster.services");

router.get("/", async function (req, res, next) {
  try {
    res.json(await propertiesDropdown.getMultiple());
  } catch (err) {
    console.error(`Error while loading Properties `, err.message);
    next(err);
  }
});

module.exports = router;