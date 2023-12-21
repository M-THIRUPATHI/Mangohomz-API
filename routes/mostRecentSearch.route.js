const express = require("express");
const router = express.Router();
const mostRecentSearchService = require("../services/mostRecentSearch.services");
const request = require('request');





router.get("/loadCityWiseForSeo/:city_seo_name/:hospital_seo_name", async function (req, res, next) {

    try {
      res.json(await mostRecentSearchService.loadCityWiseForSeo( req.params.city_seo_name, req.params.hospital_seo_name));
    } catch (err) {
      console.error(`Error while getting Hotel For SEO Details `, err.message);
      next(err);
    }
  });
  
router.get("/hotels/:city_id/:hospital_id", async function (req, res, next) {

    try {
      res.json(await mostRecentSearchService.loadhotelsCity(req.params.city_id,req.params.hospital_id));
    } catch (err) {
      console.error(`Error while getting Hotel Details `, err.message);
      next(err);
    }
  });


  router.get("/loadCityWisehotelinfoForSeo/:city_seo_name/:hospital_seo_name/:subproperty_seo_name", async function (req, res, next) {

    try {
      res.json(await mostRecentSearchService.loadCityWisehotelinfoForSeo( req.params.city_seo_name, req.params.hospital_seo_name, req.params.subproperty_seo_name));
    } catch (err) {
      console.error(`Error while getting Hotel For SEO Details `, err.message);
      next(err);
      console.log(req.params);
    }
  });



module.exports = router;
