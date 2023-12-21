const express = require("express");
const router = express.Router();
const bookings = require("../services/mhOffers.services");

router.post("/saveMhOffers", async function (req, res, next) {
    try {
      res.json(await bookings.createMhOffers(req.body));
    } catch (err) {
      console.error(`Error while submitting Mh Offers Data`, err.message);
      next(err);
    }
  });

module.exports = router;