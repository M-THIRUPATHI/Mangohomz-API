const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const dir = require("../resources/filepath");
const fs = require("fs");
const request = require('request');

const customerRegistration = require("../services/customerRegistration.services");

/* GET All  Customer Registration. */
router.get("/", async function(req, res, next) {
    try {
      res.json(await customerRegistration.getMultiple());
    } catch (err) {
      console.error(`Error while getting Customer Registration `, err.message);
      next(err);
    }
  });
  /* GET single Customer Registration. */
  router.get("/:item_id", async function (req, res, next) {
    try {
      res.json(await customerRegistration.getChargesByChargeName(req.params.item_id));
    } catch (err) {
      console.error(
        `Error while Loading Charges by Passing Charge ID`,
        err.message
      );
      next(err);
    }
  });
  router.get("/:id", async function(req, res, next) {
    try { 
      res.send(await customerRegistration.getSingleChargeDetail(req.params.id));  
    } catch (err) {
      console.error(`Error while getting Customer Registration `, err.message);
      next(err);
    }
  });
  
  /* POST create a new Customer Registration */
  router.post("/", async function(req, res, next) {
    try {
      res.json(await customerRegistration.create(req.body));
    } catch (err) {
      console.error(`Error while submitting Customer Registration`, err.message);
      next(err);
    }
  });
  /* PUT Customer Registration */
  router.put("/:id", async function(req, res, next) {
    try {
      res.json(await customerRegistration.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating Customer Registration`, err.message);
      next(err);
    }
  });
  /* DELETE  a Customer Registration */
  router.delete("/:id", async function(req, res, next) {
    try {
      res.json(await customerRegistration.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting Customer Registration`, err.message);
      next(err);
    }
  });
  router.post("/reachwithusSaving", async function (req, res, next) {
  
    let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
   
    try {
      const form = new formidable.IncomingForm();
  
      form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.reach_us);
      // request(`http://api.bulksmsgateway.in/sendmessage.php?user=Mangohomzz&password=Mangohomzz@123&mobile=${data.mobileNumber}&message=Dear ${data.patientName} We acknowledge your Enquiry at MANGOHOMZ. Our team will further update you on this. For any assistance, please Call MH Care Number 8929982655. Thank you -Team MANGOHOMZ. Stay Well - Get Well.&sender=MGHOMZ&type=3&template_id=1007607818098563066`, { json: true }, (err, response, data) => {
      //   if (err) {
      //     console.log(err);
      //   }
      // });
      // console.log("LLL", docNames)
        res.json(await customerRegistration.reachwithusSaving(fields, ipAddress)
        );
      });
   
    
    } catch (err) {
      console.error(`Error while reach us Details`, err.message);
      next(err);
    }
  });
  router.post("/savingPatientHSDetails", async function (req, res, next) {
    let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
    try {
      const form = new formidable.IncomingForm();
      formidable.keepExtensions = true;
      let accomdation_partner_documents_loc = dir.accomdation_partner_documents;
      form.uploadDir = accomdation_partner_documents_loc;
      if (!fs.existsSync(form.uploadDir)) {
        fs.mkdirSync(form.uploadDir);
      }
      let docNames = {};
      form.parse(req, async (_, fields, files) => {
        let data = JSON.parse(fields.patient_details);
        res.json(
          await customerRegistration.savingPatientHSDetails(data, ipAddress)
        
        );
     
      });
    } catch (err) {
      console.error(`Error while Inserting Patient Details`, err.message);
      next(err);
    }
  });
  
//POST Action TAke Data
router.post("/savingActionTakeDetails", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let accomdation_partner_documents_loc = dir.accomdation_partner_documents;
    form.uploadDir = accomdation_partner_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.reachusActionTake_details);
      res.json(
        await customerRegistration.savingActionTakeDetails(data, ipAddress)
      );
    });
  } catch (err) {
    console.error(`Error while Taking Action`, err.message);
    next(err);
  }
});
  
//POST  Patient Details
router.post("/savingPatientHSDetails", async function (req, res, next) {
  console.log("asdas")
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let accomdation_partner_documents_loc = dir.accomdation_partner_documents;
    form.uploadDir = accomdation_partner_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.patient_details);
      res.json(
        await customerRegistration.savingPatientHSDetails(data, ipAddress)
      
      );
   
    });
  } catch (err) {
    console.error(`Error while Inserting Patient Details`, err.message);
    next(err);
  }
});
router.post("/healthSupportActionTakeSaving", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let accomdation_partner_documents_loc = dir.accomdation_partner_documents;
    form.uploadDir = accomdation_partner_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.healthSupportActionTake_details);
      res.json(
        await customerRegistration.healthSupportActionTakeSaving(data, ipAddress)
      );
    });
  } catch (err) {
    console.error(`Error while Taking Action`, err.message);
    next(err);
  }
});
router.post("/savechatus", async function (req, res, next) {
  const now = new Date();
  const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  console.log("req.body",req.body);
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
  try {
    res.json(await customerRegistration.savechatus(req.body, ipAddress));
  } catch (err) {
    console.error(`Error while submitting Chat Deatails`, err.message);
    next(err);
    
  }
 
});
router.post("/savingMedicalLoanDetails", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  try {
    const data = req.body;
    const message = await customerRegistration.savingMedicalLoanDetails(data, ipAddress);
    res.json({ message });
  } catch (err) {
    console.error(`Error while submitting Location Details`, err.message);
    next(err);
  }
});
module.exports = router;