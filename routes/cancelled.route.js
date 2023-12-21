const express = require("express");
const router = express.Router();
const cancelled = require("../services/cancelled.services.js");

router.get("/loadAccomodationDetails/:mh_booking_id", async function (req, res, next) {
    try {
      res.json(await cancelled.loadAccomodationDetails(req.params.mh_booking_id));
    } catch (err) {
      console.error(`Error while Loading MH Booking ID`, err.message);
      next(err);
    }
  });
  router.get("/loadTravelDetails/:mh_booking_id", async function (req, res, next) {
    try {
      res.json(await cancelled.loadTravelDetails(req.params.mh_booking_id));
    } catch (err) {
      console.error(`Error while Loading MH Booking ID`, err.message);
      next(err);
    }
  });
  router.get("/loadMedicalDetails/:mh_booking_id", async function (req, res, next) {
    try {
      res.json(await cancelled.loadMedicalDetails(req.params.mh_booking_id));
    } catch (err) {
      console.error(`Error while Loading MH Booking ID`, err.message);
      next(err);
    }
  });
  router.get("/loadFoodDetails/:mh_booking_id", async function (req, res, next) {
    try {
      res.json(await cancelled.loadFoodDetails(req.params.mh_booking_id));
    } catch (err) {
      console.error(`Error while Loading MH Booking ID`, err.message);
      next(err);
    }
  });
  router.post("/cancellDetails", async function (req, res, next) {
  
    try {
      res.json(await cancelled.cancellDetails(req.body));
    } catch (err) {
      console.error(`Error while Cancelling details `, err.message);
      next(err);
    }
  });
  router.post("/cancelledfoodbooking", async function (req, res, next) {
    
    try {
      res.json(await cancelled.cancelledfoodbooking(req.body));
    } catch (err) {
      console.error(`Error while Cancelling details `, err.message);
      next(err);
    }
  });
  router.post("/cancelledtravelbooking", async function (req, res, next) {
   
    try {
      res.json(await cancelled.cancelledtravelbooking(req.body));
    } catch (err) {
      console.error(`Error while Cancelling details `, err.message);
      next(err);
    }
  });
  router.post("/cancelledequipmentbooking", async function (req, res, next) {
    try {
      res.json(await cancelled.cancelledequipmentbooking(req.body));
    } catch (err) {
      console.error(`Error while Cancelling details `, err.message);
      next(err);
    }
  });
  router.put(
    "/AccomodationStatus/:booking_order_id",
    async function (req, res, next) {
      try {
        res.json(
          await cancelled.AccomodationStatus(
            req.params.booking_order_id,req.body)
        );
      } catch (err) {
        console.error(
          `"Error while updating the Accomodation status Data`,
          err.message
        );
        next(err);
      }
    }
  );
  router.put(
    "/FoodStatus/:food_booking_orderid",
    async function (req, res, next) {

      try {
        res.json(
          await cancelled.FoodStatus(
            req.params.food_booking_orderid,req.body)
        );
      } catch (err) {
        console.error(
          `"Error while updating the food status Data`,
          err.message
        );
        next(err);
      }
    }
  );
  router.put(
    "/TravelStatus/:travel_booking_orderid",
    async function (req, res, next) {
      try {
        res.json(
          await cancelled.TravelStatus(
            req.params.travel_booking_orderid,req.body)
        );
      } catch (err) {
        console.error(
          `"Error while updating the travel status Data`,
          err.message
        );
        next(err);
      }
    }
  );
  router.put(
    "/EquipmentStatus/:medical_booking_orderid",
    async function (req, res, next) {
      try {
        res.json(
          await cancelled.EquipmentStatus(
            req.params.medical_booking_orderid,req.body)
        );
      } catch (err) {
        console.error(
          `"Error while updating the medical status Data`,
          err.message
        );
        next(err);
      }
    }
  );
  router.get("/gettingCancelId/:booking_order_id", async function (req, res, next) {
    try {
      res.json(await cancelled.getCancelId(req.params.booking_order_id));
    } catch (err) {
      console.error(`Error while getting cancel offers`, err.message);
      next(err);
    }
  });

  router.get("/gettingTravelCancelId/:booking_order_id", async function (req, res, next) {
    try {
      res.json(await cancelled.gettingTravelCancelId(req.params.booking_order_id));
    } catch (err) {
      console.error(`Error while getting mangohomz offers`, err.message);
      next(err);
    }
  });
  router.get("/gettingIndividualTravelCancelId/:travel_booking_orderid", async function (req, res, next) {
    try {
      res.json(await cancelled.gettingIndividualTravelCancelId(req.params.travel_booking_orderid));
    // console.log("cacaca",req.params);

    } catch (err) {
      console.error(`Error while getting mangohomz offers`, err.message);
      next(err);
    }
  });
  router.get("/gettingIndividualMedicalCancelId/:medical_booking_orderid", async function (req, res, next) {
    try {
      res.json(await cancelled.gettingIndividualMedicalCancelId(req.params.medical_booking_orderid));
    // console.log("cacaca",req.params);

    } catch (err) {
      console.error(`Error while getting mangohomz offers`, err.message);
      next(err);
    }
  });
  router.get("/gettingMedicalCancelId/:booking_order_id", async function (req, res, next) {
    try {
      res.json(await cancelled.gettingMedicalCancelId(req.params.booking_order_id));
    } catch (err) {
      console.error(`Error while getting mangohomz offers`, err.message);
      next(err);
    }
  });
 router.get("/getAccommodationCancellationDetails", async function (req, res, next) {
    try {
      res.json(await cancelled.getAccommodationCancellationDetails());
    } catch (err) {
      console.error(`Error while getting Accommodation Cancellation Details`, err.message);
      next(err);
    }
  });
  router.get("/getTravelCancellationDetails", async function (req, res, next) {
    try {
      res.json(await cancelled.getTravelCancellationDetails());
    } catch (err) {
      console.error(`Error while getting Travel Cancellation Details`, err.message);
      next(err);
    }
  });
  router.get("/getFoodCancellationDetails", async function (req, res, next) {
    try {
      res.json(await cancelled.getFoodCancellationDetails());
    } catch (err) {
      console.error(`Error while getting Food Cancellation Details`, err.message);
      next(err);
    }
  });
  router.get("/getMedicalCancellationDetails", async function (req, res, next) {
    try {
      res.json(await cancelled.getMedicalCancellationDetails());
    } catch (err) {
      console.error(`Error while getting Medical Cancellation Details`, err.message);
      next(err);
    }
  });
  router.get("/getPartnerAccCancellation/acc/:account_id", async function (req, res, next) {
    try {
      res.json(await cancelled.getPartnerAccCancellation(req.params.account_id));
    } catch (err) {
      console.error(`Error while getting Partner Acc Cancellation Details`, err.message);
      next(err);
    }
  });
module.exports = router;