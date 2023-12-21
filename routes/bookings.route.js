const express = require("express");
const router = express.Router();
const bookings = require("../services/bookings.services");
const request = require('request');

// const formidable = require("formidable");
// const path = require("path");
// const fs = require("fs");
// const dir = require("../resources/filepath");
router.get(
  "/bookingFoodManzohomzOffer/:offer_from_whom",
  async function (req, res, next) {
    try {
      res.json(
        await bookings.loadbookingFoodManzohomzOffer(req.params.offer_from_whom)
      );
    } catch (err) {
      console.error(`Error while getting Food mangohomz offers`, err.message);
      next(err);
    }
  }
);
router.get("/TravelManzohomzOffer/:offer_from_whom", async function (req, res, next) {
  try {
    res.json(await bookings.travelManzohomzOffer(req.params.offer_from_whom));
  } catch (err) {
    console.error(`Error while getting mangohomz offers`, err.message);
    next(err);
  }
});
router.get("/getMHBookingData/:booking_order_id", async function (req, res, next) {
  try {
    res.json(await bookings.getMHBookingData(req.params.booking_order_id));
  } catch (err) {
    console.error(`Error while getting MH Booking Details`, err.message);
    next(err);
  }
});
router.post("/saveFoodBookingDetails", async function (req, res, next) {
  try {
    res.json(await bookings.createFoodBooking(req.body));
  } catch (err) {
    console.error(
      `Error while submitting Food Partner Registration`,
      err.message
    );
    next(err);
  }
});
router.post("/saveFoodBookingLogsDetails", async function (req, res, next) {
  try {
    res.json(await bookings.createFoodBookingLogs(req.body));
  } catch (err) {
    console.error(
      `Error while submitting Food Partner Registration`,
      err.message
    );
    next(err);
  }
});
router.post("/saveBookingDataBeforePay", async function (req, res, next) {
  const now = new Date();
  const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  console.log("Before Rpay Booking Data Saving: ",timestamp,"-",req.body);
  console.log("Before Rpay Guests Data Saving: ",timestamp,"-",req.body.guestDataObj);

   let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
  try {
    res.json(await bookings.saveBookingDataBeforePay(req.body, ipAddress));
    console.log("reqqq",req.body);
  } catch (err) {
    console.error(`Error while submitting Booking Saving`, err.message);
    next(err);
  }
});
router.post("/saveBookingData", async function (req, res, next) {
  const now = new Date();
  const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  console.log("After Rpay Booking Data Saving: ",timestamp,"-",req.body);
  console.log("After Rpay Guests Data Saving: ",timestamp,"-",req.body.guestDataObj);

  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
  try {
    res.json(await bookings.create(req.body, ipAddress));
  } catch (err) {
    console.error(`Error while submitting Booking Registration`, err.message);
    next(err);
  }
});
router.get("/getMedicalBookingData/equipment/:booking_order_id", async function (req, res, next) {
  try {
    res.json(await bookings.getBookingData(req.params.booking_order_id));
  } catch (err) {
    console.error(`Error while getting Booking data`, err.message);
    next(err);
  }
});
// router.post("/saveGuestPrimaryDetails", async function (req, res, next) {
//   try {
//     res.json(await bookings.saveGuestPrimaryDetails(req.body));
//   } catch (err) {
//     console.error(`Error while submitting Equipment Registration`, err.message);
//     next(err);
//   }
// });
router.post("/saveEquipmentBookingDetails", async function (req, res, next) {
  try {
    res.json(await bookings.saveEquipmentBookingDetails(req.body));
  } catch (err) {
    console.error(`Error while submitting Equipment Registration`, err.message);
    next(err);
  }
});
router.get("/guestBookingDataTable/:account_id", async function (req, res, next) {
  try {
    res.json( await bookings.getBookingGuestData(req.params.account_id)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
router.get("/guestFoodBookingData/:account_id", async function (req, res, next) {
  try {
    res.json( await bookings.getBookingFoodData(req.params.account_id)
    );
  } catch (err) {
    console.log(`Error While Loading Food Booking Data`,err.message);
    next(err);
  }
});
router.get("/guestTravelBookingData/:account_id", async function (req, res, next) {
  try {
    res.json( await bookings.guestTravelBookingData(req.params.account_id)
    );
  } catch (err) {
    console.log(`Error While Loading Travel Booking Data`,err.message);
    next(err);
  }
});
router.get("/guestMedicalBookingData/:account_id", async function (req, res, next) {
  try {
    res.json( await bookings.getBookingMedicalData(req.params.account_id)
    );
  } catch (err) {
    console.log(`Error While Loading Medical Booking Data`,err.message);
    next(err);
  }
});
router.get("/customerEquipmentBkngDetails/:medical_booking_orderid", async function (req, res, next) {
  try {
    res.json( await bookings.customerEquipmentBkngDetails(req.params.medical_booking_orderid)
    );
  } catch (err) {
    console.log(`Error While Loading Medical Booking Data`,err.message);
    next(err);
  }
});
router.get("/customerBkngDetails/:medical_booking_orderid", async function (req, res, next) {
  try {
    res.json( await bookings.customerBkngDetails(req.params.medical_booking_orderid)
    );
  } catch (err) {
    console.log(`Error While Loading Medical confirmation Booking Data`,err.message);
    next(err);
  }
});
router.get("/guestBookingDataTableForCity/:city", async function (req, res, next) {
  try {
    res.json( await bookings.guestBookingDataTableForCity(req.params.city)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
router.get("/guestBookingDataTableForStaff/:city", async function (req, res, next) {
  try {
    res.json( await bookings.guestBookingDataTableForStaff(req.params.city)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
router.get("/guestBookingDataTableForAdmin/", async function (req, res, next) {
  try {
    res.json( await bookings.guestBookingDataTableForAdmin()
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});

router.get("/bookingManzohomzOffer/:offer_from_whom", async function (req, res, next) {
  try {
    res.json(await bookings.bookingManzohomzOffer(req.params.offer_from_whom));
  } catch (err) {
    console.error(`Error while getting mangohomz offers`, err.message);
    next(err);
  }
});
router.get("/loadAccomodationDetails/:booking_order_id", async function (req, res, next) {
  try {
    res.json(await bookings.getCustomerMhBookingsData(req.params.booking_order_id));
  } catch (err) {
    console.error(`Error while getting Booking Details`, err.message);
    next(err);
  }
});
router.get("/getBookingIdDetails/:booking_order_id", async function (req, res, next) {
  try {
    res.json(await bookings.getBookingDetails(req.params.booking_order_id));
  } catch (err) {
    console.error(`Error while getting Booking Details`, err.message);
    next(err);
  }
});
router.get("/gettingbookingId/:phone_no/:razorpay_order_id/:razorpay_signature/:razorpay_payment_id", async function (req, res, next) {
  try {
    res.json(await bookings.getBookingId(req.params.phone_no,req.params.razorpay_order_id,req.params.razorpay_signature,req.params.razorpay_payment_id));
  } catch (err) {
    console.error(`Error while getting mangohomz offers`, err.message);
    next(err);
  }
});
router.get("/getMHBookingData/equipment/:booking_order_id", async function (req, res, next) {
  try {
    res.json(await bookings.getBookingData(req.params.booking_order_id));
  } catch (err) {
    console.error(`Error while getting Booking data`, err.message);
    next(err);
  }
});

router.get("/bookingMedicalManzohomzOffer/:offer_from_whom", async function (req, res, next) {
  try {
    res.json(await bookings.bookingMedicalManzohomzOffer(req.params.offer_from_whom));
  } catch (err) {
    console.error(`Error while getting Medical mangohomz offers`, err.message);
    next(err);
  }
});
router.post("/submittravelDetails", async function (req, res, next) {

  try {
    res.json(await bookings.submittravelDetails(req.body));
  } catch (err) {
    console.error(`Error while saving the travel details `, err.message);
    next(err);
  }
});
router.get("/getCustomerMhBookingsData/:mh_booking_id", async function (req, res, next) {
  try {
    res.json( await bookings.getCustomerMhBookingsData(req.params.mh_booking_id)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
router.get("/getCustomerFoodBookingDetails/:food_booking_orderid", async function (req, res, next) {
  try {
    res.json( await bookings.getCustomerFoodBookingDetails(req.params.food_booking_orderid)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
router.get("/getCustomerTravelBookingDetails/:travel_booking_orderid", async function (req, res, next) {
  try {
    res.json( await bookings.getCustomerTravelBookingDetails(req.params.travel_booking_orderid)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
router.get("/getCustomerAccomodationBookingDetails/:booking_order_id", async function (req, res, next) {
  try {
    res.json( await bookings.getCustomerAccomodationBookingDetails(req.params.booking_order_id)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
router.get("/customerFoodBkngDetails/:food_booking_orderid", async function (req, res, next) {
  try {
    res.json( await bookings.customerFoodBkngDetails(req.params.food_booking_orderid)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
router.get("/gettingFoodbookingId/:mobile_number", async function (req, res, next) {
  try {
    res.json(await bookings.getFoodBookingId(req.params.mobile_number));
  } catch (err) {
    console.error(`Error while getting Loading Food Booking ID`, err.message);
    next(err);
  }
});
router.get("/gettingTravelbookingId/:mobile_number", async function (req, res, next) {
  try {
    res.json(await bookings.getTravelBookingId(req.params.mobile_number));
  } catch (err) {
    console.error(`Error while getting Loading Travel Booking Data`, err.message);
    next(err);
  }
});
router.get("/gettingEquipmentbookingId/:mobile_number", async function (req, res, next) {
  try {
    res.json(await bookings.getEquipmentBookingId(req.params.mobile_number));
  } catch (err) {
    console.error(`Error while getting Loading Travel Booking Data`, err.message);
    next(err);
  }
});

router.get("/loadAllBookingDetails/:mh_booking_id", async function (req, res, next) {
  try {
    res.json(await bookings.loadAllBookingDetails(req.params.mh_booking_id));
  } catch (err) {
    console.error(`Error while Loading MH Booking ID`, err.message);
    next(err);
  }
});
router.get("/guestBookingAccountData/:account_id", async function (req, res, next) {
  try {
    res.json( await bookings.guestBookingAccountData(req.params.account_id)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
router.get("/guestFoodBookingAccountData/:account_id", async function (req, res, next) {
  try {
    res.json( await bookings.guestFoodBookingAccountData(req.params.account_id)
    );
  } catch (err) {
    console.log(`Error While Loading Food Booking Data`,err.message);
    next(err);
  }
});
router.get("/guestTravelBookingAccountData/:account_id", async function (req, res, next) {
  try {
    res.json( await bookings.guestTravelBookingAccountData(req.params.account_id)
    );
  } catch (err) {
    console.log(`Error While Loading Travel Booking Data`,err.message);
    next(err);
  }
});
router.post("/createUserDetails", async function (req, res, next) {
  try {
    res.json(await bookings.createUserDetails(req.body));
  } catch (err) {
    console.error(
      `Error while submitting User Registration`,
      err.message
    );
    next(err);
  }
});
router.get("/guestMedicalBookingAccountData/:account_id", async function (req, res, next) {
  try {
    res.json( await bookings.guestMedicalBookingAccountData(req.params.account_id)
    );
  } catch (err) {
    console.log(`Error While Loading Medical Booking Data`,err.message);
    next(err);
  }
});
router.get("/getaccomodationdetails/acc/:account_id", async function (req, res, next) {
  try {
    res.json(
      await bookings.getaccomodationdetails(req.params.account_id)
    );
  } catch (err) {
    console.error(`Error while getting Hotels Details `, err.message);
    next(err);
  }
});
router.get("/getTravelDashboardBookingData/:account_id", async function (req, res, next) {
  try {
    res.json( await bookings.getTravelDashboardBookingData(req.params.account_id)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
router.get("/getFoodDashboardBookingData/:account_id", async function (req, res, next) {
  try {
    res.json( await bookings.getFoodDashboardBookingData(req.params.account_id)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});

router.get("/getMedicalDashboardBookingData/:account_id", async function (req, res, next) {
  try {
    res.json( await bookings.getMedicalDashboardBookingData(req.params.account_id)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
router.get("/loadaccallbooking/:account_id/:partner_id/:partner_sub_id/:txn_id", async function (req, res, next) {
  try {
    res.json( await bookings.loadaccallbooking(req.params.account_id,req.params.partner_id,req.params.partner_sub_id,req.params.txn_id)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
router.get("/loadacctravelbooking/:account_id/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.json( await bookings.loadacctravelbooking(req.params.account_id,req.params.agent_id,req.params.transport_sub_id)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
router.get("/loadaccfoodbooking/:account_id/:agent_id/:agent_sub_id", async function (req, res, next) {
  try {
    res.json( await bookings.loadaccfoodbooking(req.params.account_id,req.params.agent_id,req.params.agent_sub_id)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});

router.get("/loadaccmedicalbooking/:account_id/:equipment_id/:equipment_sub_id", async function (req, res, next) {
  try {
    res.json( await bookings.loadaccmedicalbooking(req.params.account_id,req.params.equipment_id,req.params.equipment_sub_id)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
router.get("/revenueBookingData/:account_id", async function (req, res, next) {
  try {
    res.json( await bookings.revenueBookingData(req.params.account_id)
    );
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
router.post("/arthilabsdetaisSavingmethod", async function (req, res, next) {
  const now = new Date();
  const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  console.log("req.body",req.body);
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
  try {
    res.json(await bookings.SavingAarthilabsdata(req.body, ipAddress));
  } catch (err) {
    console.error(`Error while submitting the Aarthi Labs Data`, err.message);
    next(err);
    
  }
 
});
router.get("/getAarthilabDetails", async function (req, res, next) {
  try {
    res.json(await bookings.getAarthilabDetails());
  } catch (err) {
    console.error(
      `Error while getting Aarthilabs Data`,
      err.message
    );
    next(err);
  }
});
module.exports = router;
