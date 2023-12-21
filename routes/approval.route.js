const express = require("express");
const router = express.Router();
const approveService = require("../services/approval.services");
const request = require('request');

router.post("/", async function (req, res, next) {
  try {
    res.json(await approveService.updatePartnerAprvlStatus(req.body));
  } catch (err) {
    console.error(`Error while updating the record`, err.message);
    next(err);
  }
});

router.get("/getpartnerRegistrationStatusCount", async function (req, res, next) {
  try {
    res.json(await approveService.getpartnerStatusCount());
  } catch (err) {
    console.error(
      `Error while getting Property Registration Master `,
      err.message
    );
    next(err);
  }
});

//Onkar Get Reach us Data
router.get("/custReachusData", async function (req, res, next) {
  try {
    res.json(await approveService.custReachusData());
  } catch (err) {
    console.error(
      `Error while getting Cust Reach Us Data`,
      err.message
    );
    next(err);
  }
});
//Onkar get Take action Data
router.get("/takeActionDetails/:reachus_id", async function (req, res, next) {
  try {
    res.json(await approveService.takeActionDetails(req.params.reachus_id));
  } catch (err) {
    console.error(
      `Error while getting Take Action Data`,
      err.message
    );
    next(err);
  }
});
router.get("/getPartnerAllDisplayForAdmin/:status", async function (req, res, next) {
  try {
    res.json(await approveService.getPartnerAllDisplayForAdmin(req.params.status));
  } catch (err) {
    console.error(
      `Error while getting Partner Registration Data`,
      err.message
    );
    next(err);
  }
});
router.get("/partnerRegData", async function (req, res, next) {
  try {
    res.json(await approveService.partnerRegData());
  } catch (err) {
    console.error(
      `Error while getting Partner Registration Data`,
      err.message
    );
    next(err);
  }
});
router.put("/approvePartner", async function (req, res, next) {
  // console.log("req.body",req.body)
  request(`https://api.bulksmsgateway.in/sendmessage.php?user=admin@sedots.com&password=Sms@sedots2020&mobile=${req.body.mobile_no}&message=Dear User, Your registration successful ,${req.body.partner_id} is reference number for registration Mangohomz	
  &sender=SEDOTS&type=3&template_id=1207166316197280944`, { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
  });
  try {
    res.json(await approveService.approvePartner(req.body));
    
  } catch (err) {
    console.log(`Error while approving the Partner Registration`, err.message);
    next(err);
  }
});
router.put("/rejectPartner", async function (req, res, next) {
  try {
    res.json(await approveService.rejectPartner(req.body));
  } catch (err) {
    console.log(`Error while Rejecting the Partner Registration`, err.message);
    next(err);
  }
});


router.get("/staffRegData", async function (req, res, next) {
  try {
    res.json(await approveService.staffRegData());
  } catch (err) {
    console.error(
      `Error while getting Staff Registration Data`,
      err.message
    );
    next(err);
  }
});
router.put("/approveStaffRegistration", async function (req, res, next) {
  try {
    res.json(await approveService.approveStaffRegistration(req.body));
  } catch (err) {
    console.log(`Error while approving the Staff Registration`, err.message);
    next(err);
  }
});
router.put("/rejectStaffRegistration", async function (req, res, next) {
  try {
    res.json(await approveService.rejectStaffRegistration(req.body));
  } catch (err) {
    console.log(`Error while Rejecting the Staff Registration`, err.message);
    next(err);
  }
});


router.get("/cityManagerRegData", async function (req, res, next) {
  try {
    res.json(await approveService.cityManagerRegData());
  } catch (err) {
    console.error(
      `Error while getting City Manager Registration Data`,
      err.message
    );
    next(err);
  }
});
router.put("/approveCityManager", async function (req, res, next) {
  try {
    res.json(await approveService.approveCityManager(req.body));
  } catch (err) {
    console.log(`Error while approving the City Manager Registration`, err.message);
    next(err);
  }
});
router.put("/rejectCityManager", async function (req, res, next) {
  try {
    res.json(await approveService.rejectCityManager(req.body));
  } catch (err) {
    console.log(`Error while Rejecting the City Manager Registration`, err.message);
    next(err);
  }
});
router.put("/approvePartnerfood", async function (req, res, next) {
  // console.log("partner",req.body)
  try {
    res.json(await approveService.approvePartnerfood(req.body));
  } catch (err) {
    console.log(`Error while approving the Partner Registration`, err.message);
    next(err);
  }
});
router.put("/rejectPartnerfood", async function (req, res, next) {
  try {
    res.json(await approveService.rejectPartnerfood(req.body));
  } catch (err) {
    console.log(`Error while Rejecting the Partner Registration`, err.message);
    next(err);
  }
});
router.put("/approvePartnertravel", async function (req, res, next) {
  // console.log("partner",req.body)
  try {
    res.json(await approveService.approvePartnertravel(req.body));
  } catch (err) {
    console.log(`Error while approving the Partner Registration`, err.message);
    next(err);
  }
});
router.put("/rejectPartnertravel", async function (req, res, next) {
  try {
    res.json(await approveService.rejectPartnertravel(req.body));
  } catch (err) {
    console.log(`Error while Rejecting the Partner Registration`, err.message);
    next(err);
  }
});
router.put("/approvePartnermedical", async function (req, res, next) {
  // console.log("partner",req.body)
  try {
    res.json(await approveService.approvePartnermedical(req.body));
  } catch (err) {
    console.log(`Error while approving the Partner Registration`, err.message);
    next(err);
  }
});
router.put("/rejectPartnermedical", async function (req, res, next) {
  try {
    res.json(await approveService.rejectPartnermedical(req.body));
  } catch (err) {
    console.log(`Error while Rejecting the Partner Registration`, err.message);
    next(err);
  }
});

router.put("/Registernewpartner", async function (req, res, next) {
  // console.log("partner",req.body)
  try {
    res.json(await approveService.Registernewpartner(req.body));
  } catch (err) {
    console.log(`Error while Partner Registering`, err.message);
    next(err);
  }
});
router.put("/Registernewaccpartner", async function (req, res, next) {
  // console.log("partner",req.body)
  try {
    res.json(await approveService.Registernewaccpartner(req.body));
  } catch (err) {
    console.log(`Error while Partner Registering`, err.message);
    next(err);
  }
});
router.put("/Registernewtravelpartner", async function (req, res, next) {
  // console.log("partner",req.body)
  try {
    res.json(await approveService.Registernewtravelpartner(req.body));
  } catch (err) {
    console.log(`Error while Partner Registering`, err.message);
    next(err);
  }
});
router.put("/Registernewmedicalpartner", async function (req, res, next) {
  // console.log("partner",req.body)
  try {
    res.json(await approveService.Registernewmedicalpartner(req.body));
  } catch (err) {
    console.log(`Error while Partner Registering`, err.message);
    next(err);
  }
});
router.get("/diseasetakeActionDetails/:health_support_id", async function (req, res, next) {
  try {
    res.json(await approveService.diseasetakeActionDetails(req.params.health_support_id));
  } catch (err) {
    console.error(
      `Error while getting Take Action Data`,
      err.message
    );
    next(err);
  }
});
router.get("/getpatientDiseaseData", async function (req, res, next) {
  try {
    res.json(await approveService.getpatientDiseaseData());
  } catch (err) {
    console.error(
      `Error While Getting Patient Disease Data`,
      err.message
    );
    next(err);
  }
});
module.exports = router;
