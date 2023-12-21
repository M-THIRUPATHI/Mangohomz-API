const express = require("express");
const router = express.Router();
const cityMaster = require("../services/cityMaster.services");

router.get("/", async function (req, res, next) {
  try {
    res.json(await cityMaster.getMultiple());
  } catch (err) {
    console.error(`Error while loading cities `, err.message);
    next(err);
  }
});
router.get("/getarthilabcities", async function (req, res, next) {
  try {
    res.json(await cityMaster.getarthilabcities());
  } catch (err) {
    console.error(`Error while loading cities `, err.message);
    next(err);
  }
});
router.get("/getarthilabcenters/:city", async function (req, res, next) {
  try {
    res.json(await cityMaster.getarthilabcenters(req.params.city));
  } catch (err) {
    console.error(`Error while loading test centers `, err.message);
    next(err);
  }
});
router.get("/getarthilabaddress/:city/:center_name", async function (req, res, next) {
  try {
    res.json(await cityMaster.getarthilabaddress(req.params.city,req.params.center_name));
  } catch (err) {
    console.error(`Error while loading test centers `, err.message);
    next(err);
  }
});

router.get("/getarthilabtesttypes/:city/:center_name", async function (req, res, next) {
  try {
    res.json(await cityMaster.getarthilabtesttypes(req.params.city,req.params.center_name));
  } catch (err) {
    console.error(`Error while loading test types `, err.message);
    next(err);
  }
  // console.log("testtype",req.params);
});
// router.get("/getarthilabtestname/:city/:center_name/:test_type", async function (req, res, next) {
//   try {
//     res.json(await cityMaster.checkAvailabilityofTest(req.params.city,req.params.center_name,req.params.test_type));
//   } catch (err) {
//     console.error(`Error while loading test names `, err.message);
//     next(err);
  
//   }
//   console.log("req.params",req.params);
// });

router.get("/getarthilabtestname/:city/:center_name/:test_type", async function (req, res, next) {
  try {
    const testAvailability = await cityMaster.checkAvailabilityofTest(req.params.city, req.params.center_name, req.params.test_type);
    // console.log("testAvailability",testAvailability,testAvailability.length);
    if (testAvailability.length > 0 && testAvailability[0].status=="YES")  {
      const testNames = await cityMaster.getTestNamesByType(req.params.city,req.params.test_type);
      res.json(testNames);
    } else {
      // Handle the case when the test type is not available in the selected city and center
      // Send an appropriate response or error message
      // res.status(404).json({ error: "Test name is not available in the selected city." });

      res.json([]);
      // console.log("req.params",req.params);
    }
    
  } catch (err) {
    console.error(`Error while loading test names: ${err.message}`);
    next(err);
  }
});
router.get("/getallpointtypes/:property_city_id", async function (req, res, next) {
  try {
    const city_code = req.params.property_city_id;
    res.json(await cityMaster.getAllPointTypes(city_code));
  } catch (err) {
    console.error(`Error while loading all point types`, err.message);
    next(err);
  }
});
router.get("/getallpointnames/:city_code/:point_type/:hotel_txn_id", async function (req, res, next) {
  try {
    
    const city_code = req.params.city_code;
    const point_type = req.params.point_type;
    const hotel_txn_id = req.params.hotel_txn_id;
    // console.log("city_code:", city_code);
    // console.log("point_type:", point_type);
    // console.log("hotel_txn_id:", hotel_txn_id);

    res.json(await cityMaster.getAllPointNames(city_code, point_type, hotel_txn_id));
  } catch (err) {
    console.error(`Error while loading all point names`, err.message);
    next(err);
  }
});

router.get("/getpropertyallcity", async function (req, res, next) {
  try {
    res.json(await cityMaster.getpropertyallcity());
  } catch (err) {
    console.error(`Error while loading Property cities `, err.message);
    next(err);
  }
});
module.exports = router;