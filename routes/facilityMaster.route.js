const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const formidable = require("formidable");
const throttle = require("express-throttle-bandwidth");
const facilityMaster = require("../services/facilityMaster.services");
const app = express();

app.use(express.static("public")); //to access the files in public folder

app.use(fileUpload());
/* GET All  Facility Type Master. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await facilityMaster.getMultiple());
  } catch (err) {
    console.error(`Error while getting Facility Type Master `, err.message);
    next(err);
  }
});
router.get("/loadPropertyAmenities", async function (req, res, next) {
  try {
    res.json(await facilityMaster.getpropertyAmenities());
  } catch (err) {
    console.error(`Error while getting Property Facilities `, err.message);
    next(err);
  }
});






/* GET single Facility Type Master. */
router.get("/:id", async function (req, res, next) {
  try {
    res.send(await facilityMaster.getSingleCropConditionDetail(req.params.id));
  } catch (err) {
    console.error(`Error while getting Facility Type Master `, err.message);
    next(err);
  }
});
/* POST create a new Facility Type Master */
// router.post("/", async function (req, res, next) {
//   try {
//     // let alldetails = JSON.parse(req.body);
//     res.json(await facilityMaster.create(req.body));
//   } catch (err) {
//     console.error(`Error while creating Facility Type Master`, err.message);
//     next(err);
//   }
// });
/* PUT Facility Type Master */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await facilityMaster.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Facility Type Master`, err.message);
    next(err);
  }
});
/* DELETE  a Facility Type Master */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await facilityMaster.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Facility Type Master`, err.message);
    next(err);
  }
});

module.exports = router;
