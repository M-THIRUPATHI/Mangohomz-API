const express = require("express");
const router = express.Router();
const propertyName = require("../services/propertyName.services");

router.get("/", async function (req, res, next) {
  try {
    res.json(await propertyName.getMultiple());
  } catch (err) {
    console.error(`Error while loading Property Name `, err.message);
    next(err);
  }
});

module.exports = router;

