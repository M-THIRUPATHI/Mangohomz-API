const express = require("express");
const router = express.Router();
const equipmentMedicalPartner = require("../services/equipmentMedicalPartner.services.js");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const dir = require("../resources/filepath");
/* GET All  Equipment Registration  Master. */
router.get("/equipmentAccomodation", async function (req, res, next) {
  try {
    res.json(await equipmentMedicalPartner.getMultipleAccomodation());
  } catch (err) {
    console.error(
      `Error while getting Equipment Registration  Master `,
      err.message
    );
    next(err);
  }
});
router.get("/getMedicalEqpdata/:equipment_id/:equipment_sub_id", async function (req, res, next) {
  try {
    res.json(await equipmentMedicalPartner.getMedicalEqpdata(req.params.equipment_id, req.params.equipment_sub_id));
  } catch (err) {
    console.error(
      `Error while getting Add staff Equipment Details Registration`,
      err.message
    );
    next(err);
  }
});

router.put("/updateEquipmentPartnerForm/:equipment_id/:equipment_sub_id", async function (req, res, next) {
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
      let data = JSON.parse(fields.updateEquipment);
    
      if (files.pancard) {
        let panCardObj = JSON.parse(JSON.stringify(files)).pancard;
        if(panCardObj) {
          let panCardName = `${data.agent_name}_${new Date().getTime()}_${panCardObj.originalFilename}`;
          fs.renameSync(panCardObj.filepath, path.join(form.uploadDir, panCardName));
          docNames.panCardName = panCardName;
        } else {
          docNames.panCardName = data.panCardName;
        }
      } else {
        docNames.panCardName = data.pan_card_upt;
      }
      if (files.addhaar) {
        let addhaarObj = JSON.parse(JSON.stringify(files)).addhaar;
        if(addhaarObj) {
          let addhaarName = `${data.agent_name}_${new Date().getTime()}_${addhaarObj.originalFilename}`;
          fs.renameSync(addhaarObj.filepath, path.join(form.uploadDir, addhaarName));
          docNames.addhaarName = addhaarName;
        } else {
          docNames.addhaarName = data.addhaarName;
        }
      } else {
        docNames.addhaarName = data.addhaar_no_upt;
      
      }
      if (files.gst_tin) {
        let gstInObj = JSON.parse(JSON.stringify(files)).gst_tin;
        if(gstInObj) {
          let gstInName = `${data.agent_name}_${new Date().getTime()}_${gstInObj.originalFilename}`;
          fs.renameSync(gstInObj.filepath, path.join(form.uploadDir, gstInName));
          docNames.gstInName = gstInName;
        } else {
          docNames.gstInName = data.gstInName;
        }
      } else {
        docNames.gstInName = data.gst_tin_upt;
      
      }
      if (files.mh_agreement) {
        let mhAgreementObj = JSON.parse(JSON.stringify(files)).mh_agreement;
        if(mhAgreementObj) {
          let mhAgreementName = `${data.agent_name}_${new Date().getTime()}_${mhAgreementObj.originalFilename}`;
        fs.renameSync(mhAgreementObj.filepath, path.join(form.uploadDir, mhAgreementName));
        docNames.mhAgreementName = mhAgreementName;
        }else {
          docNames.mhAgreementName = data.mhAgreementName;
        }
      } else {
        docNames.mhAgreementName = data.mh_agreement_upt;
        
      }
      if (files.mb_certificate) {
        let mbCertificateObj = JSON.parse(JSON.stringify(files)).mb_certificate;
        if(mbCertificateObj) {
          let mbCertificateName = `${data.agent_name}_${new Date().getTime()}_${mbCertificateObj.originalFilename}`;
          fs.renameSync(mbCertificateObj.filepath, path.join(form.uploadDir, mbCertificateName));
          docNames.mbCertificateName = mbCertificateName;
        } else {
          docNames.mbCertificateName = data.mbCertificateName;
        }
      } else {
        docNames.mbCertificateName = data.mb_certificate_upt;
       
      }


      if (files.property_tax) {
        let propertyTaxObj = JSON.parse(JSON.stringify(files)).property_tax;
        if(propertyTaxObj) {
          let propertyTaxName = `${data.agent_name}_${new Date().getTime()}_${propertyTaxObj.originalFilename}`;
          fs.renameSync(propertyTaxObj.filepath, path.join(form.uploadDir, propertyTaxName));
          docNames.propertyTaxName = propertyTaxName;
        } else {
          docNames.propertyTaxName = data.propertyTaxName;
        }
      } else {
        docNames.propertyTaxName = data.property_tax_upt;
       
      }

      if (files.fire_safety) {
        let fireSafetyObj = JSON.parse(JSON.stringify(files)).fire_safety;
        if(fireSafetyObj) {
          let fireSafetyName = `${data.agent_name}_${new Date().getTime()}_${fireSafetyObj.originalFilename}`;
          fs.renameSync(fireSafetyObj.filepath, path.join(form.uploadDir, fireSafetyName));
          docNames.fireSafetyName = fireSafetyName;
        } else {
          docNames.fireSafetyName = data.fireSafetyName;
        }
      } else {
        docNames.fireSafetyName = data.fire_safety_upt;
       
      }
      if (files.cancelled_cheque) {
        let cancelledChequeObj = JSON.parse(JSON.stringify(files)).cancelled_cheque;
        if(cancelledChequeObj) {
          let cancelledChequeName = `${data.agent_name}_${new Date().getTime()}_${cancelledChequeObj.originalFilename}`;
          fs.renameSync(cancelledChequeObj.filepath, path.join(form.uploadDir, cancelledChequeName));
          docNames.cancelledChequeName = cancelledChequeName;
        } else {
          docNames.cancelledChequeName = data.cancelledChequeName;
        }
      } else {
        docNames.cancelledChequeName = data.cancelled_cheque_upt;
       
      }
     console.log("route",data,docNames);
    res.json(await equipmentMedicalPartner.updateEquipmentPartnerForm( data.equipment_id, data.equipment_sub_id,data,docNames));
  });
  } catch (err) {
    console.error(`Error while updating Property Data`, err.message);
    next(err);
  }
});


router.put(
  "/loadEquipmentStatus/:equipment_id/:equipment_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await equipmentMedicalPartner.loadEquipmentStatus(
          req.params.equipment_id, req.params.equipment_sub_id, req.params.txn_id, req.body)
      );
    } catch (err) {
      console.error(
        `"Error while updating the Staff Equipment status Data`,
        err.message
      );
      next(err);
    }
  }
);
router.post("/ledgerEquipmentDetails", async function (req, res, next) {
  try {
      res.json(await equipmentMedicalPartner.ledgerEquipmentDetails(req.body));
    } catch (err) {
      console.error(`Error while updating the staff equipment status `, err.message);
      next(err);
    }
  });

router.get("/equipmentpartnerNames", async function (req, res, next) {
  try {
    res.json(await equipmentMedicalPartner.getequipmentpartnerNames());
  } catch (err) {
    console.error(`Error while getting Staff PARTNERS NAMES `, err.message);
    next(err);
  }
});
router.get(
  "/SubequipmentpartnerNames/:account_id/:equipment_id", async function (req, res, next) {
    try {
      res.json(
        await equipmentMedicalPartner.getSubequipmentpartnerNames(
          req.params.account_id, req.params.equipment_id));
    } catch (err) {
      console.error(`Error while getting Staff SUBPARTNERS NAMES `, err.message);
      next(err);
    }
  }
);

router.get("/equipmentLocationDetails/:equipment_id/:equipment_sub_id", async function (req, res, next) {
  try {
    res.json(await equipmentMedicalPartner.getEquipmentLocation(req.params.equipment_id,req.params.equipment_sub_id));
  } catch (err) {
    console.error(
      `Error while getting Add Equipment Details Registration`,
      err.message
    );
    next(err);
  }
});
router.get("/existingUserProperty/:equipment_id", async function (req, res, next) {
  try {
    res.json(await equipmentMedicalPartner.existingUserProperty(req.params.equipment_id));
  } catch (err) {
    console.error(
      `Error while getting Equipment Registration Master `,
      err.message
    );
    next(err);
  }
});

router.get("/getEquipmentDataOnStatus/:status", async function (req, res, next) {
  try {
    res.json(await equipmentMedicalPartner.getEquipmentDataOnStatus(req.params.status));
  } catch (err) {
    console.error(
      `Error while getting Equipment Registration Master `,
      err.message
    );
    next(err);
  }
});
router.get("/equipmentRegistrationMasterStatusCount", async function (req, res, next) {
  try {
    res.json(await equipmentMedicalPartner.getStatusCount());
  } catch (err) {
    console.error(
      `Error while getting Equipment Registration Master `,
      err.message
    );
    next(err);
  }
});
/* GET single Transport Registration  Master. */
router.get("/:id", async function (req, res, next) {
  try {
    res.send(await equipmentMedicalPartner.getSingleParentTypeDetail(req.params.id));
  } catch (err) {
    console.error(
      `Error while getting Transport Registration  Master `,
      err.message
    );
    next(err);
  }
});
router.put("/updatingEquipment/:equipment_id/:equipment_sub_id/:txn_id", async function (req, res, next) {
  try {
    res.json(await equipmentMedicalPartner.putEquipmentDetails(req.params.equipment_id, req.params.equipment_sub_id, req.params.txn_id, req.body));
  } catch (err) {
    console.error(`Error while updating Equipment Details`, err.message);
    next(err);
  }
});
/* POST create a new Transport Registration  Master */
router.post("/", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let equipment_doc = dir.equipment_partner_documents;
    form.uploadDir = equipment_doc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.equipmentDetails);
      if (files.pancard) {
        let  panCardObj = JSON.parse(JSON.stringify(files)).pancard;
        let panCardName =  `${data.name}_${new Date().getTime()}_${panCardObj.originalFilename}`;
          fs.renameSync( panCardObj.filepath,path.join(form.uploadDir,panCardName));
         docNames.panCardName = panCardName;
       }
       if (files.addhaar) {
        let  addhaarObj = JSON.parse(JSON.stringify(files)).addhaar;
        let addhaarName =  `${data.name}_${new Date().getTime()}_${addhaarObj.originalFilename}`;
          fs.renameSync( addhaarObj.filepath,path.join(form.uploadDir,addhaarName));
         docNames.addhaarName = addhaarName;
       }
       if (files.gst_tin) {
        let  gstInObj = JSON.parse(JSON.stringify(files)).gst_tin;
        let gstInName =  `${data.name}_${new Date().getTime()}_${gstInObj.originalFilename}`;
          fs.renameSync( gstInObj.filepath,path.join(form.uploadDir,gstInName));
         docNames.gstInName = gstInName;
       }
       if (files.mh_agreement) {
        let  mhAgreementObj = JSON.parse(JSON.stringify(files)).mh_agreement;
        let mhAgreementName =  `${data.name}_${new Date().getTime()}_${mhAgreementObj.originalFilename}`;
          fs.renameSync( mhAgreementObj.filepath,path.join(form.uploadDir,mhAgreementName));
         docNames.mhAgreementName = mhAgreementName;
       }
       if (files.mb_certificate) {
        let  mbCertificateObj = JSON.parse(JSON.stringify(files)).mb_certificate;
        let mbCertificateName =  `${data.name}_${new Date().getTime()}_${mbCertificateObj.originalFilename}`;
          fs.renameSync( mbCertificateObj.filepath,path.join(form.uploadDir,mbCertificateName));
         docNames.mbCertificateName = mbCertificateName;
       }
       if (files.property_tax) {
        let  propertyTaxObj = JSON.parse(JSON.stringify(files)).property_tax;
        let propertyTaxName =  `${data.name}_${new Date().getTime()}_${propertyTaxObj.originalFilename}`;
          fs.renameSync( propertyTaxObj.filepath,path.join(form.uploadDir,propertyTaxName));
         docNames.propertyTaxName = propertyTaxName;
       }
       if (files.fire_safety) {
        let  fireSafetyObj = JSON.parse(JSON.stringify(files)).fire_safety;
        let fireSafetyName =  `${data.name}_${new Date().getTime()}_${fireSafetyObj.originalFilename}`;
          fs.renameSync( fireSafetyObj.filepath,path.join(form.uploadDir,fireSafetyName));
         docNames.fireSafetyName = fireSafetyName;
       }
       if (files.cancelled_cheque) {
        let  cancelledChequeObj = JSON.parse(JSON.stringify(files)).cancelled_cheque;
        let cancelledChequeName =  `${data.name}_${new Date().getTime()}_${cancelledChequeObj.originalFilename}`;
          fs.renameSync( cancelledChequeObj.filepath,path.join(form.uploadDir,cancelledChequeName));
         docNames.cancelledChequeName = cancelledChequeName;
       }
      res.json(await equipmentMedicalPartner.create(fields, files, docNames, ipAddress));
      
    });
  } catch (err) {
    console.error(
      `Error while creating Equipment Registration  Master`,
      err.message
    );
    next(err);
  }
});
router.post("/equipmentLocation", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let equipment_doc = dir.equipment_partner_documents;
    form.uploadDir = equipment_doc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.equipmentItemDetails);
     
      if (files.equipment_image) {
        let  equipmentImageObj = JSON.parse(JSON.stringify(files)).equipment_image;
        let equipmentImageName =  `${data.equipment_sub_name}_${new Date().getTime()}_${equipmentImageObj.originalFilename}`;
          fs.renameSync( equipmentImageObj.filepath,path.join(form.uploadDir,equipmentImageName));
         docNames.equipmentImageName = equipmentImageName;
       }
       res.json(
        await equipmentMedicalPartner.createEquipmentLocation(fields, files, docNames, ipAddress)
      );
    });
  } catch (err) {
    console.error(
      `Error while creating Equipment Location Registration Master`,
      err.message
    );
    next(err);
  }
});
router.post("/saveEquipmentRegDetails", async function (req, res, next) {
  try {
    res.json(await equipmentMedicalPartner.create(req.body));
  } catch (err) {
    console.error(
      `Error while creating Equipment Registration Master`,
      err.message
    );
    next(err);
  }
});
router.post("/getMultipleEquipmentDetails", async function (req, res, next) {
  try {
    res.json(
      await equipmentMedicalPartner.getMultiplePropertyDetails(req.body)
    );
  } catch (err) {
    console.error(
      `Error while creating Equipment Registration Master`,
      err.message
    );
    next(err);
  }
});
/* PUT Equipment Registration Master */
router.put("/:user_id/:equipment_id/:equipment_sub_id/:agent_name/:equipment_sub_name/:status", async function (req, res, next) {
  try {
    res.json(await equipmentMedicalPartner.updateDetails(req.params.user_id, req.params.equipment_id, req.params.equipment_sub_id, req.params.agent_name, req.params.equipment_sub_name,req.params.status, req.body));
  } catch (err) {
    console.error(`Error while updating Equipment Registration Master`, err.message);
    next(err);
  }
});
/* PUT Equipment Registration  Master */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await equipmentMedicalPartner.update(req.params.id, req.body));
  } catch (err) {
    console.error(
      `Error while updating Equipment Registration  Master`,
      err.message
    );
    next(err);
  }
});
/* DELETE  a Transport Registration  Master */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await equipmentMedicalPartner.remove(req.params.id));
  } catch (err) {
    console.error(
      `Error while deleting Equipment Registration  Master`,
      err.message
    );
    next(err);
  }
});

module.exports = router;
