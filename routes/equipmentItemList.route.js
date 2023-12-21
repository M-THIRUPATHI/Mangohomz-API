const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const formidable = require("formidable");
const throttle = require("express-throttle-bandwidth");
const equipmentItemList = require("../services/equipmentItemList.services");
const app = express();
app.use(express.static("public")); //to access the files in public folder

app.use(fileUpload());
/* GET All  Food Items List. */
router.get("/", async function (req, res, next) {
    try {
      res.json(await equipmentItemList.getMultiple());
    } catch (err) {
      console.error(`Error while getting Equipment Items List `, err.message);
      next(err);
    }
  });

  router.get("/loadUnits/:item_id", async function (req, res, next) {
    try {
      res.json(await equipmentItemList.getMedicalUnits(req.params.item_id));
    } catch (err) {
      console.error(`Error while getting Equipment Items List `, err.message);
      next(err);
    }
  });




module.exports = router;
