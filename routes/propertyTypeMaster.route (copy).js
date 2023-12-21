const express = require("express");
const router = express.Router();
const propertyTypeMaster = require("../services/propertyTypeMaster.services");

/* GET All  Property Type Master. */
router.get("/", async function(req, res, next) {
    try {
      res.json(await propertyTypeMaster.getMultiple());
    } catch (err) {
      console.error(`Error while getting Property Type Master `, err.message);
      next(err);
    }
  });
  /* GET single Property Type Master. */
  router.get("/:id", async function(req, res, next) {
    try { 
      res.send(await propertyTypeMaster.getSingleClassDetail(req.params.id));  
    } catch (err) {
      console.error(`Error while getting Property Type Master `, err.message);
      next(err);
    }
  });
  /* POST create a new Property Type Master */
  router.post("/", async function(req, res, next) {
    try {
      res.json(await propertyTypeMaster.create(req.body));
    } catch (err) {
      console.error(`Error while creating Property Type Master`, err.message);
      next(err);
    }
  });
  /* PUT Property Type Master */
  router.put("/:id", async function(req, res, next) {
    try {
      res.json(await propertyTypeMaster.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating Property Type Master`, err.message);
      next(err);
    }
  });
  /* DELETE  a Property Type Master */
  router.delete("/:id", async function(req, res, next) {
    try {
      res.json(await propertyTypeMaster.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting Property Type Master`, err.message);
      next(err);
    }
  });

module.exports = router;