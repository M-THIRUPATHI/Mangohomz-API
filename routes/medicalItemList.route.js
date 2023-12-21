const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const formidable = require("formidable");
const throttle = require("express-throttle-bandwidth");
const medicalItemList = require("../services/medicalItemList.services");
const app = express();
app.use(express.static("public")); //to access the files in public folder

app.use(fileUpload());
/* GET All  Food Items List. */
router.get("/loadAllMedicalstores", async function (req, res, next) {
  try {
    res.json(await medicalItemList.loadAllMedicalstores());
  } catch (err) {
    console.error(`Error while getting Food Items List `, err.message);
    next(err);
  }
});

module.exports = router;
