const express = require("express");
const router = express.Router();
const cityMaster = require("../services/citiesOfState.services");

router.get("/:state", async function (req, res, next) {
  try {
    res.json(await cityMaster.getMultiple(req.params.state));
  } catch (err) {
    console.error(`Error while loading cities `, err.message);
    next(err);
  }
});
router.get("/getAllCities/selectCities", async function (req, res, next) {
  try {
    res.json(await cityMaster.getAllCities());
  } catch (err) {
    console.error(`Error while loading cities `, err.message);
    next(err);
  }
});
router.get("/getCityName/:city", async function (req, res, next) {
  // console.log("req.params.city",req.params.city);
  try {
    res.json(await userAccount.getCityName(req.params.city));
  } catch (err) {
    console.error(`Error while getting User Menus `, err.message);
    next(err);
  }
});

module.exports = router;