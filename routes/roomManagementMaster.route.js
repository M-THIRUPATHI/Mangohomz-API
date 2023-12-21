const express = require("express");
const router = express.Router();
const roomManagementMaster = require("../services/roomManagementMaster.services");

/* GET All  Rooms Management Master. */
router.get("/", async function(req, res, next) {
    try {
      res.json(await roomManagementMaster.getMultiple());
    } catch (err) {
      console.error(`Error while getting Rooms Management Master `, err.message);
      next(err);
    }
  });
  /* GET single Rooms Management Master. */
  router.get("/:id", async function(req, res, next) {
    try { 
      res.send(await roomManagementMaster.getSingleSchemeDetail(req.params.id));  
    } catch (err) {
      console.error(`Error while getting Rooms Management Master `, err.message);
      next(err);
    }
  });
  /* POST create a new Rooms Management Master */
  router.post("/", async function(req, res, next) {
    try {
      res.json(await roomManagementMaster.create(req.body));
    } catch (err) {
      console.error(`Error while creating Rooms Management Master`, err.message);
      next(err);
    }
  });
  /* PUT Rooms Management Master */
  router.put("/:id", async function(req, res, next) {
    try {
      res.json(await roomManagementMaster.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating Rooms Management Master`, err.message);
      next(err);
    }
  });
  /* DELETE  a Rooms Management Master */
  router.delete("/:id", async function(req, res, next) {
    try {
      res.json(await roomManagementMaster.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting Rooms Management Master`, err.message);
      next(err);
    }
  });

module.exports = router;