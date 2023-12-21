const express = require("express");
const router = express.Router();
const agent = require("../services/agentReg.services");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const dir = require("../resources/filepath");
/* GET All  Property Registration Master. */


router.get("/agentAccomodation", async function (req, res, next) {
  try {
    res.json(await agent.getMultiple());
  } catch (err) {
    console.error(
      `Error while getting Agent Registration Master `,
      err.message
    );
    next(err);
  }
});
router.get("/agentRegApproval", async function (req, res, next) {
  try {
    res.json(await agent.getAgentApproval());
  } catch (err) {
    console.error(
      `Error while getting Agent Registration Master `,
      err.message
    );
    next(err);
  }
});

router.get("/agentLocationDetails/:agent_id/:agent_sub_id", async function (req, res, next) {
  try {
    res.json(await agent.getAgentLocation(req.params.agent_id, req.params.agent_sub_id));
  } catch (err) {
    console.error(
      `Error while getting Add Equipment Details Registration`,
      err.message
    );
    next(err);
  }
});
router.get("/existingUserProperty/:agent_id", async function (req, res, next) {
  try {
    res.json(await agent.existingUserProperty(req.params.agent_id));
  } catch (err) {
    console.error(
      `Error while getting Agent Registration Master `,
      err.message
    );
    next(err);
  }
});
router.get("/agentRegMasterStatusCount", async function (req, res, next) {
  try {
    res.json(await agent.getStatusCount());
  } catch (err) {
    console.error(
      `Error while getting Agent Registration Master `,
      err.message
    );
    next(err);
  }
});

router.get("/getAgentDataOnStatus/:status", async function (req, res, next) {
  try {
    res.json(await agent.getAgentDataOnStatus(req.params.status));
  } catch (err) {
    console.error(
      `Error while getting Agent Registration Master `,
      err.message
    );
    next(err);
  }
});
router.get("/getAgentRegApprovalStatus/agent", async function (req, res) {
  try {
    res.json(await agent.getAgentRegApproval());
  } catch (err) {
    console.error(
      `Error while getting Agent Registration Approval Details `,
      err.message
    );
    next(err);
  }
});
/* GET single Property Registration Master. */
router.get("/:id", async function (req, res, next) {
  try {
    res.send(await agent.getSingleParentTypeDetail(req.params.status));
  } catch (err) {
    console.error(
      `Error while getting Agent Registration Master `,
      err.message
    );
    next(err);
  }
});
/* POST create a new Property Registration Master */
router.post("/agentRegistrationMaster", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let agent_documents_loc = dir.agent_documents;
    form.uploadDir = agent_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.agentPartnerDetails);

      if (files.pancard) {
        let panCardObj = JSON.parse(JSON.stringify(files)).pancard;
        let panCardName = `${data.name}_${new Date().getTime()}_${panCardObj.originalFilename}`;
        fs.renameSync(panCardObj.filepath, path.join(form.uploadDir, panCardName));
        docNames.panCardName = panCardName;
      }
      if (files.addhaar) {
        let addhaarObj = JSON.parse(JSON.stringify(files)).addhaar;
        let addhaarName = `${data.name}_${new Date().getTime()}_${addhaarObj.originalFilename}`;
        fs.renameSync(addhaarObj.filepath, path.join(form.uploadDir, addhaarName));
        docNames.addhaarName = addhaarName;
      }
      if (files.gst_tin) {
        let gstInObj = JSON.parse(JSON.stringify(files)).gst_tin;
        let gstInName = `${data.name}_${new Date().getTime()}_${gstInObj.originalFilename}`;
        fs.renameSync(gstInObj.filepath, path.join(form.uploadDir, gstInName));
        docNames.gstInName = gstInName;
      }
      if (files.mh_agreement) {
        let mhAgreementObj = JSON.parse(JSON.stringify(files)).mh_agreement;
        let mhAgreementName = `${data.name}_${new Date().getTime()}_${mhAgreementObj.originalFilename}`;
        fs.renameSync(mhAgreementObj.filepath, path.join(form.uploadDir, mhAgreementName));
        docNames.mhAgreementName = mhAgreementName;
      }
      //  if (files.partner_pic) {
      //   let  partnerPicObj = JSON.parse(JSON.stringify(files)).partner_pic;
      //   let partnerPicName =  `${data.name}_${new Date().getTime()}_${partnerPicObj.originalFilename}`;
      //     fs.renameSync( partnerPicObj.filepath,path.join(form.uploadDir,partnerPicName));
      //    docNames.partnerPicName = partnerPicName;
      //  }
      if (files.mb_certificate) {
        let mbCertificateObj = JSON.parse(JSON.stringify(files)).mb_certificate;
        let mbCertificateName = `${data.name}_${new Date().getTime()}_${mbCertificateObj.originalFilename}`;
        fs.renameSync(mbCertificateObj.filepath, path.join(form.uploadDir, mbCertificateName));
        docNames.mbCertificateName = mbCertificateName;
      }
      if (files.property_tax) {
        let propertyTaxObj = JSON.parse(JSON.stringify(files)).property_tax;
        let propertyTaxName = `${data.name}_${new Date().getTime()}_${propertyTaxObj.originalFilename}`;
        fs.renameSync(propertyTaxObj.filepath, path.join(form.uploadDir, propertyTaxName));
        docNames.propertyTaxName = propertyTaxName;
      }
      if (files.fire_safety) {
        let fireSafetyObj = JSON.parse(JSON.stringify(files)).fire_safety;
        let fireSafetyName = `${data.name}_${new Date().getTime()}_${fireSafetyObj.originalFilename}`;
        fs.renameSync(fireSafetyObj.filepath, path.join(form.uploadDir, fireSafetyName));
        docNames.fireSafetyName = fireSafetyName;
      }
      if (files.cancelled_cheque) {
        let cancelledChequeObj = JSON.parse(JSON.stringify(files)).cancelled_cheque;
        let cancelledChequeName = `${data.name}_${new Date().getTime()}_${cancelledChequeObj.originalFilename}`;
        fs.renameSync(cancelledChequeObj.filepath, path.join(form.uploadDir, cancelledChequeName));
        docNames.cancelledChequeName = cancelledChequeName;
      }
        res.json(await agent.create(fields, files, docNames, ipAddress));
    });
  } catch (err) {
    console.error(
      `Error while creating Agent Registration Master`,
      err.message
    );
    next(err);
  }
});
router.post("/agentLocation", async function (req, res, next) {
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let agent_documents_loc = dir.agent_documents;
    form.uploadDir = agent_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.agentItemDetails);

      if (files.agentimage) {
        let agentImageObj = JSON.parse(JSON.stringify(files)).agentimage;
        let agentImageName = `${data.agent_name}_${new Date().getTime()}_${agentImageObj.originalFilename}`;
        fs.renameSync(agentImageObj.filepath, path.join(form.uploadDir, agentImageName));
        docNames.agentImageName = agentImageName;
      }
      res.json(await agent.createAgentDetails(fields, files, docNames));
    });
  } catch (err) {
    console.error(
      `Error while creating Agent Details Registration`,
      err.message
    );
    next(err);
  }
});
router.post("/saveAgentRegDetails", async function (req, res, next) {
  try {
    res.json(await agent.create(req.body));
  } catch (err) {
    console.error(
      `Error while creating Agent Property Registration Master`,
      err.message
    );
    next(err);
  }
});
router.post("/getMultipleAgentDetails", async function (req, res, next) {
  try {
    res.json(
      await agent.getMultipleAgentDetails(req.body)
    );
  } catch (err) {
    console.error(
      `Error while creating Agent Property Registration Master`,
      err.message
    );
    next(err);
  }
});
router.post("/agentRegistration", async function(req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
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
      let data = JSON.parse(fields.agentFormDetails);
      if (files.cancelCheque) {
        let cancelCheque_Obj = JSON.parse(JSON.stringify(files)).cancelCheque;
        let cancelCheque_name = `${
          data.first_name
        }_${new Date().getTime()}_${cancelCheque_Obj.originalFilename}`;
        fs.renameSync(
          cancelCheque_Obj.filepath,
          path.join(form.uploadDir, cancelCheque_name)
        );
        docNames.cancelCheque_name = cancelCheque_name;
      }
      if (files.panCardFile) {
        let panCardFile_Obj = JSON.parse(JSON.stringify(files)).panCardFile;
        let panCardFile_name = `${
          data.first_name
        }_${new Date().getTime()}_${panCardFile_Obj.originalFilename}`;
        fs.renameSync(
          panCardFile_Obj.filepath,
          path.join(form.uploadDir, panCardFile_name)
        );
        docNames.panCardFile_name = panCardFile_name;
      }
      if (files.passportFile) {
        let passportFile_Obj = JSON.parse(JSON.stringify(files)).passportFile;
        let passportFile_name = `${
          data.first_name
        }_${new Date().getTime()}_${passportFile_Obj.originalFilename}`;
        fs.renameSync(
          passportFile_Obj.filepath,
          path.join(form.uploadDir, passportFile_name)
        );
        docNames.passportFile_name = passportFile_name;
      }
      if (files.drivingLicienceFile) {
        let drivingLicienceFile_Obj = JSON.parse(JSON.stringify(files)).drivingLicienceFile;
        let drivingLicienceFile_name = `${
          data.first_name
        }_${new Date().getTime()}_${drivingLicienceFile_Obj.originalFilename}`;
        fs.renameSync(
          drivingLicienceFile_Obj.filepath,
          path.join(form.uploadDir, drivingLicienceFile_name)
        );
        docNames.drivingLicienceFile_name = drivingLicienceFile_name;
      }
   
    // console.log("data&doc",data,docNames)
    res.json(await agent.createagentRegistration(fields,files, docNames, ipAddress));
  });
  } catch (err) {
    console.error(`Error while submitting Partner Registration`, err.message);
    next(err);
  }
});
/* PUT Property Registration Master */
router.put("/:user_id/:agent_id/:agent_sub_id/:agent_name/:agent_sub_name", async function (req, res, next) {
  try {
    res.json(await agent.updateDetails(req.params.user_id, req.params.agent_id, req.params.agent_sub_id, req.params.agent_name, req.params.agent_sub_name, req.body));

  } catch (err) {
    console.error(`Error while updating Agent Registration Master`, err.message);
    next(err);
  }
});
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await agent.update(req.params.id, req.body));
  } catch (err) {
    console.error(
      `Error while updating Agent Property Registration Master`,
      err.message
    );
    next(err);
  }
});
// router.put("/approveAgentRegDetails/:agent_id/:agent_sub_id", async function (req, res, next) {
//   try {
//     res.json(await agent.approveAgentRegDetails(req.params.agent_id,req.params.agent_sub_id,req.body));
//   } catch (err) {
//     console.error(`Error while Approving Agent Data`, err.message);
//     next(err);
//   }
// });
router.put("/approveAgentRegDetails/agent", async function (req, res, next) {
  try {
    res.json(await agent.approveAgentRegDetails(req.body));
  } catch (err) {
    console.log(`Error while approving the Partner Registration`, err.message);
    next(err);
  }
});
router.put("/rejectAgentRegDetails/:agent_id/:agent_sub_id", async function (req, res, next) {
  try {
    res.json(await agent.rejectAgentRegDetails(req.params.agent_id,req.params.agent_sub_id,req.body));
  } catch (err) {
    console.error(`Error while rejecting Agent Data`, err.message);
    next(err);
  }
});
/* DELETE  a Property Registration Master */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await agent.remove(req.params.id));
  } catch (err) {
    console.error(
      `Error while deleting Agent Property Registration Master`,
      err.message
    );
    next(err);
  }
});
router.get("/getAgentAccountData/:account_id", async function (req, res, next) {
  try {
    res.json(await agent.getAgentAccountData(req.params.account_id));
  } catch (err) {
    console.error(
      `Error while getting Agent Details `,
      err.message
    );
    next(err);
    // console.log(req.params)
  }
});
module.exports = router;
