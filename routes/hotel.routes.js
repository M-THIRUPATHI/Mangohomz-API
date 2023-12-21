const express = require("express");
const router = express.Router();
const hotel = require("../services/hotel.services");

router.post("/loadhotels", async function (req, res, next) {
  try {
    res.json(await hotel.getHotelsDetailsBySearch(req.body));
  } catch (err) {
    console.error(`Error while getting Hotel Details `, err.message);
    next(err);
  }
});
router.get("/loadhotels/:city_id/:latitude/:longitude", async function (req, res, next) {

  try {
    res.json(await hotel.getHotelsDetailsBySearch(req.params.city_id,req.params.latitude,req.params.longitude));
  } catch (err) {
    console.error(`Error while getting Hotel Details `, err.message);
    next(err);
  }
});
router.get("/loadhotelsInfo/:partner_id/:partner_sub_id/:txn_id", async function (req, res, next) {

  try {
    res.json(await hotel.getHotelFullInfo(req.params.partner_id,req.params.partner_sub_id,req.params.txn_id));
  } catch (err) {
    console.error(`Error while getting Hotel Data `, err.message);
    next(err);
  }
  // console.log("routes",req.params)
});
router.get("/loadHotelInfoForCart/:partner_id/:partner_sub_id/:txn_id", async function (req, res, next) {

  try {
    res.json(await hotel.loadHotelInfoForCart(req.params.partner_id,req.params.partner_sub_id,req.params.txn_id));
  } catch (err) {
    console.error(`Error while getting Hotel Data `, err.message);
    next(err);
  }
  // console.log("routes",req.params)
});
router.get("/loadPropertyInfo/:city_seo_name/:hospital_seo_name/:subproperty_seo_name", async function (req, res, next) {

  try {
    res.json(await hotel.loadPropertyInfo(req.params.city_seo_name,req.params.hospital_seo_name,req.params.subproperty_seo_name));
  } catch (err) {
    console.error(`Error while getting Property Info Details `, err.message);
    next(err);
  }
});
module.exports = router;
