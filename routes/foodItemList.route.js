const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const formidable = require("formidable");
const throttle = require("express-throttle-bandwidth");
const foodItemsList = require("../services/foodItemList.services");
const app = express();
app.use(express.static("public")); //to access the files in public folder

app.use(fileUpload());
/* GET All  Food Items List. */
router.get("/loadItems", async function (req, res, next) {
  try {
    res.json(await foodItemsList.loadFoodItems());
  } catch (err) {
    console.error(`Error while getting Food Items List `, err.message);
    next(err);
  }
});
router.get("/:food_type_id", async function (req, res, next) {
  try {
    res.json(await foodItemsList.getAllFoodItemsList(req.params.food_type_id));
  } catch (err) {
    console.error(`Error while getting Food Items List `, err.message);
    next(err);
  }
});

  /* GET single Food Items List. */
  router.get("/:id", async function (req, res, next) {
    try {
      res.send(await foodItemsList.getSingleCropConditionDetail(req.params.id));
    } catch (err) {
      console.error(`Error while getting Food Items List `, err.message);
      next(err);
    }
  });
  /* POST create a new Food Items List */
  router.post("/", async function (req, res, next) {
    try {
      // let alldetails = JSON.parse(req.body);
      res.json(await foodItemsList.create(req.body));
    } catch (err) {
      console.error(`Error while creating Food Items List`, err.message);
      next(err);
    }
  });
  /* PUT Food Items List */
  router.put("/:id", async function (req, res, next) {
    try {
      res.json(await foodItemsList.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating Food Items List`, err.message);
      next(err);
    }
  });
  /* DELETE  a Food Items List */
  router.delete("/:id", async function (req, res, next) {
    try {
      res.json(await foodItemsList.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting Food Items List`, err.message);
      next(err);
    }
  });






module.exports = router;
