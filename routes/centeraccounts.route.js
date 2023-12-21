const express = require("express");
const router = express.Router();
const centeraccounts = require("../services/centeraccounts.services.js");
router.get("/BookingDataTable/:txn_id", async function (req, res, next) {
  try {
    res.json( await centeraccounts.BookingDataTable(req.params.txn_id)
    );
//  console.log("sss",req.params)
  } catch (err) {
    console.log(`Error While `,err.message);
    next(err);
  }
});
// router.get("/BookingDataTable", async function (req, res, next) {
//     try {
//       res.json( await centeraccounts.BookingDataTable()
//       );
//     } catch (err) {
//       console.log(`Error While `,err.message);
//       next(err);
//     }
//   });
  
  router.get("/masterreportsdetails/:account_id", async function (req, res, next) {
    try {
      res.json( await centeraccounts.masterreportsdetails(req.params.account_id)
      );
    } catch (err) {
      console.log(`Error While `,err.message);
      next(err);
    }
  });
  router.get("/getAdminreportsdetails", async function (req, res, next) {
    try {
      res.json( await centeraccounts.getAdminreportsdetails()
      );
    } catch (err) {
      console.log(`Error While `,err.message);
      next(err);
    }
  });

  router.get("/getAdminreportsForTravelBooking", async function (req, res, next) {
    try {
      res.json( await centeraccounts.getAdminreportsForTravelBooking()
      );
    } catch (err) {
      console.log(`Error While `,err.message);
      next(err);
    }
  });
  router.get("/getAdminreportsForMedicalBooking", async function (req, res, next) {
    try {
      res.json( await centeraccounts.getAdminreportsForMedicalBooking()
      );
    } catch (err) {
      console.log(`Error While `,err.message);
      next(err);
    }
  });
  router.get("/getAdminreportsForFoodBooking", async function (req, res, next) {
    try {
      res.json( await centeraccounts.getAdminreportsForFoodBooking()
      );
    } catch (err) {
      console.log(`Error While `,err.message);
      next(err);
    }
  });
  
  router.get("/propertyreportsdetails", async function (req, res, next) {
    try {
      res.json( await centeraccounts.propertyreportsdetails()
      );
    } catch (err) {
      console.log(`Error While `,err.message);
      next(err);
    }
  });


  router.get("/propertywisereportsdetails", async function (req, res, next) {
    try {
      res.json( await centeraccounts.propertywisereportsdetails()
      );
    } catch (err) {
      console.log(`Error While `,err.message);
      next(err);
    }
  });


  
  router.get("/propertymonthswisereportsdetails", async function (req, res, next) {
    try {
      res.json( await centeraccounts.propertymonthswisereportsdetails()
      );
    } catch (err) {
      console.log(`Error While `,err.message);
      next(err);
    }
  });
  
  router.get("/foodreportmethod/:account_id", async function (req, res, next) {
    try {
      res.json( await centeraccounts.foodreportmethod(req.params.account_id)
      );
    } catch (err) {
      console.log(`Error While `,err.message);
      next(err);
    }
  });
  router.get("/travelreportmethod/:account_id", async function (req, res, next) {
    try {
      res.json( await centeraccounts.travelreportmethod(req.params.account_id)
      );
    } catch (err) {
      console.log(`Error While `,err.message);
      next(err);
    }
  });
  router.get("/medicalreportmethod/:account_id", async function (req, res, next) {
    try {
      res.json( await centeraccounts.medicalreportmethod(req.params.account_id)
      );
    } catch (err) {
      console.log(`Error While `,err.message);
      next(err);
    }
  });

  //Ravi Route For getting Date Wise Account Details 

router.get("/getDateWiseAccountsDatails", async function (req, res, next) {
  try {
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const txn_id = req.query.txn_id;
    const property_city_id=req.query.property_city_id;
    //console.log(fromDate,toDate,txn_id)
    res.json( await centeraccounts.getDateWiseAccountsDatails(fromDate,toDate,txn_id,property_city_id)
    );
    //  console.log("sss",req.params)
  } catch (err) {
    console.log(`Error While Loading Account  Deatils `,err.message);
    next(err);
  }
});


router.get("/getBookingAllCity", async function (req, res, next) {
  try {
    res.json(await centeraccounts.getBookingAllCity());
  } catch (err) {
    console.error(`Error while loading Property cities `, err.message);
    next(err);
  }
});

router.get("/:property_city_id", async function (req, res, next) {
  try {
    res.json(await centeraccounts.getPropertyBasedOncity(req.params.property_city_id));
  } catch (err) {
    console.error(`Error while loading cities `, err.message);
    next(err);
  }
});

module.exports = router;