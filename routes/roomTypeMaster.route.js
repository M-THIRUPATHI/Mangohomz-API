const express = require("express");
const router = express.Router();
const roomTypeMaster = require("../services/roomTypeMaster.services");

/* GET All  Room Type. */
router.get("/", async function(req, res, next) {
    try {
      res.json(await roomTypeMaster.getMultiple());
    } catch (err) {
      console.error(`Error while getting Room Type Master `, err.message);
      next(err);
    }
  });
  /* GET single Room Type. */
  router.get("/:id", async function(req, res, next) {
    try { 
      res.send(await roomTypeMaster.getSingleSeasonDetail(req.params.id));  
    } catch (err) {
      console.error(`Error while getting Room Type Master `, err.message);
      next(err);
    }
  });
  /* POST create a new Room Type */
  router.post("/", async function(req, res, next) {
    try {
      res.json(await roomTypeMaster.create(req.body));
    } catch (err) {
      console.error(`Error while creating Room Type Master`, err.message);
      next(err);
    }
  });
  /* PUT Room Type */
  router.put("/:id", async function(req, res, next) {
    try {
      res.json(await roomTypeMaster.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating Room Type Master`, err.message);
      next(err);
    }
  });
  /* DELETE  a Room Type */
  router.delete("/:id", async function(req, res, next) {
    try {
      res.json(await roomTypeMaster.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting Room Type Master`, err.message);
      next(err);
    }
  });

module.exports = router;