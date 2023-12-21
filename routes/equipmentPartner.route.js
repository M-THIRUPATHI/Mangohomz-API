const express = require("express");
const router = express.Router();
const equipmentPartner = require("../services/equipmentPartnerReg.services");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const dir = require("../resources/filepath");
/* GET All  Equipment Registration  Master. */
router.get("/getAllEquipmentDetailsForAdmin/:status", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getAllEquipmentDetailsForAdmin(req.params.status));
  } catch (err) {
    console.error(
      `Error while getting Equipment Registration  Master `,
      err.message
    );
    next(err);
  }
});
router.get("/getMedicalDisplayCountOfPartner/:status", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getMedicalDisplayCountOfPartner(req.params.status));
  } catch (err) {
    console.error(
      `Error while getting Equipment Registration  Master `,
      err.message
    );
    next(err);
  }
});
router.get("/:account_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getMultiple(req.params.account_id));
  } catch (err) {
    console.error(
      `Error while getting Equipment Registration  Master `,
      err.message
    );
    next(err);
  }
});
router.get("/MedicalPartnersForAdmin/pendingPartners", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getMedicalPartnersForAdmin());
  } catch (err) {
    console.error(
      `Error while getting Equipment Registration  Master `,
      err.message
    );
    next(err);
  }
});
router.get("/approvedMedPartnersDataForAdmin/approvedPartners", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.approvedMedPartnersForAdmin());
  } catch (err) {
    console.error(
      `Error while getting Equipment Registration  Master `,
      err.message
    );
    next(err);
  }
});
router.get("/getEquipmentItemsForAdmin/:account_id/:equipment_id/:equipment_sub_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getEquipmentItemsForAdmin(req.params.account_id, req.params.equipment_id, req.params.equipment_sub_id));
  } catch (err) {
    console.error(
      `Error while getting Equipment Registration  Master `,
      err.message
    );
    next(err);
  }
});
router.get("/getEquipmentPartnerRegApprovalStatus/equipment", async function (req, res) {
  try {
    res.json(await equipmentPartner.getEquipmentPartnerRegApproval());
  } catch (err) {
    console.error(
      `Error while getting Equipment Registration Approval `,
      err.message
    );
    next(err);
  }
});
router.get("/equipmentAccomodation", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getMultipleAccomodation());
  } catch (err) {
    console.error(
      `Error while getting Equipment Registration  Master `,
      err.message
    );
    next(err);
  }
});
router.get("/equipmentpartnerNames/:account_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getequipmentpartnerNames(req.params.account_id));
  } catch (err) {
    console.error(`Error while getting PARTNERS NAMES `, err.message);
    next(err);
  }
});
router.get(
  "/SubequipmentpartnerNames/:account_id/:equipment_id", async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.getSubequipmentpartnerNames(
          req.params.account_id, req.params.equipment_id));
    } catch (err) {
      console.error(`Error while getting SUBPARTNERS NAMES `, err.message);
      next(err);
    }
  }
);
router.get(
  "/loadAccEquipmentSubpartnerNames/:account_id/:partner_id", async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.loadAccEquipmentSubpartnerNames(
          req.params.account_id, req.params.partner_id));
    } catch (err) {
      console.error(`Error while getting SUBPARTNERS NAMES `, err.message);
      next(err);
    }
  }
);

router.get(
  "/loadfoodEquipmentSubpartnerNames/:account_id/:agent_id", async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.loadfoodEquipmentSubpartnerNames(
          req.params.account_id, req.params.agent_id));
    } catch (err) {
      console.error(`Error while getting SUBPARTNERS NAMES `, err.message);
      next(err);
    }
  }
);

router.get(
  "/loadfoodmedicalDetails/:account_id/:agent_id/:agent_sub_id", async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.loadfoodmedicalDetails(
          req.params.account_id, req.params.agent_id, req.params.agent_sub_id));
    } catch (err) {
      console.error(`Error while getting SUBPARTNERS NAMES `, err.message);
      next(err);
    }
  }
);
router.get(
  "/loadTravelEquipmentSubpartnerNames/:account_id/:agent_id", async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.loadTravelEquipmentSubpartnerNames(
          req.params.account_id, req.params.agent_id));
    } catch (err) {
      console.error(`Error while getting SUBPARTNERS NAMES `, err.message);
      next(err);
    }
  }
);
router.get(
  "/loadmedicalstoreDetails/:account_id/:partner_id/:partner_sub_id", async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.loadmedicalstoreDetails(
          req.params.account_id, req.params.partner_id, req.params.partner_sub_id));
    } catch (err) {
      console.error(`Error while getting Medical Store data `, err.message);
      next(err);
    }
  }
);

router.get(
  "/loadmedicalDetails/:account_id/:equipment_id/:equipment_sub_id", async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.loadmedicalDetails(
          req.params.account_id, req.params.equipment_id, req.params.equipment_sub_id));
    } catch (err) {
      console.error(`Error while getting Medical Store data `, err.message);
      next(err);
    }
  }
);

router.get(
  "/loadEquipmentmedicalDetails/:account_id/:agent_id/:transport_sub_id", async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.loadEquipmentmedicalDetails(
          req.params.account_id, req.params.agent_id, req.params.transport_sub_id));
    } catch (err) {
      console.error(`Error while getting Medical Store data `, err.message);
      next(err);
    }
  }
);
router.get(
  "/loadEquipmentItems/:equipment_item_id", async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.loadEquipmentItems(req.params.equipment_item_id));
    } catch (err) {
      console.error(`Error while getting load equipment details `, err.message);
      next(err);
    }
  }
);
router.get("/getMedicalEqpData/:account_id/:equipment_id/:equipment_sub_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getMedicalEqpData(req.params.account_id, req.params.equipment_id, req.params.equipment_sub_id));
  } catch (err) {
    console.error(
      `Error while Loading the Equipment Partner Details`,
      err.message
    );
    next(err);
  }
});
router.get("/equipmentLocationDetails/:account_id/:partner_id/:partner_sub_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getEquipmentLocation(req.params.account_id,req.params.partner_id, req.params.partner_sub_id));
  } catch (err) {
    console.error(
      `Error while getting Add Equipment Details Registration`,
      err.message
    );
    next(err);
  }
});

router.get("/equipmentLocationDetails/equipment/:equipment_id/:equipment_sub_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getEquipmentApproval(req.params.equipment_id, req.params.equipment_sub_id));
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
    res.json(await equipmentPartner.existingUserProperty(req.params.equipment_id));
  } catch (err) {
    console.error(
      `Error while getting Equipment Registration Master `,
      err.message
    );
    next(err);
  }
});

router.get("/getEquipmentDataOnStatus/:status/:account_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getEquipmentDataOnStatus(req.params.status, req.params.account_id));
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
    res.json(await equipmentPartner.getStatusCount());
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
    res.send(await equipmentPartner.getSingleParentTypeDetail(req.params.id));
  } catch (err) {
    console.error(
      `Error while getting Transport Registration  Master `,
      err.message
    );
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
      if (data.equipment_id == "") {
        res.json(await equipmentPartner.create(fields, files, docNames, ipAddress));
      } else {
        res.json(await equipmentPartner.exsistingUserCreate(fields, files, docNames, ipAddress));
      }
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
        let equipmentImageObj = JSON.parse(JSON.stringify(files)).equipment_image;
        let equipmentImageName = `${data.equipment_name}_${new Date().getTime()}_${equipmentImageObj.originalFilename}`;
        fs.renameSync(equipmentImageObj.filepath, path.join(form.uploadDir, equipmentImageName));
        docNames.equipmentImageName = equipmentImageName;
      }
      res.json(
        await equipmentPartner.createEquipmentLocation(fields, files, docNames, ipAddress)
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
router.post("/saveMedicalStores", async function (req, res, next) {
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
      // console.log("FIELDS", fields)
      // console.log("files", files)
      let data = JSON.parse(fields.addMedStoresData);
      if (files.upload_image_1) {
        let equipmentImageObj1 = JSON.parse(JSON.stringify(files)).upload_image_1;
        let equipmentImageName = `${data.medical_store_name}_${new Date().getTime()}_${equipmentImageObj1.originalFilename}`;
        fs.renameSync(equipmentImageObj1.filepath, path.join(form.uploadDir, equipmentImageName));
        docNames.equipmentImageName_1 = equipmentImageName;
      }
      if (files.upload_image_2) {
        let equipmentImageObj2 = JSON.parse(JSON.stringify(files)).upload_image_2;
        let equipmentImageName = `${data.medical_store_name}_${new Date().getTime()}_${equipmentImageObj2.originalFilename}`;
        fs.renameSync(equipmentImageObj2.filepath, path.join(form.uploadDir, equipmentImageName));
        docNames.equipmentImageName_2 = equipmentImageName;
      }
      if (files.upload_image_3) {
        let equipmentImageObj3 = JSON.parse(JSON.stringify(files)).upload_image_3;
        let equipmentImageName = `${data.medical_store_name}_${new Date().getTime()}_${equipmentImageObj3.originalFilename}`;
        fs.renameSync(equipmentImageObj3.filepath, path.join(form.uploadDir, equipmentImageName));
        docNames.equipmentImageName_3 = equipmentImageName;
      }
      res.json(await equipmentPartner.saveMedicalStoresData(data, docNames, ipAddress));
      // console.log("data",data)
    });
  } catch (err) {
    console.error(`Error while Adding Equipment Stores Details,err.message`);
    next(err);
  }
});
router.post("/saveEquipmentRegDetails", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.create(req.body));
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
      await equipmentPartner.getMultiplePropertyDetails(req.body)
    );
  } catch (err) {
    console.error(
      `Error while creating Equipment Registration Master`,
      err.message
    );
    next(err);
  }
});
router.post("/ledgerEquipmentDetails", async function (req, res, next) {
try {
    res.json(await equipmentPartner.ledgerEquipmentDetails(req.body));
  } catch (err) {
    console.error(`Error while updating the travel status `, err.message);
    next(err);
  }
});
/* PUT Equipment Registration  Master */
router.put("/:user_id/:equipment_id/:equipment_sub_id/:name/:partner_sub_name", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.updateDetails(req.params.user_id, req.params.equipment_id, req.params.equipment_sub_id, req.params.name,req.params.partner_sub_name, req.body));
  } catch (err) {
    console.error(`Error while updating Equipment Registration Master`, err.message);
    next(err);
  }
});

router.put("/updatingEquipment/:equipment_id/:equipment_sub_id/:txn_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.putEquipmentDetails(req.params.equipment_id, req.params.equipment_sub_id, req.params.txn_id, req.body));
  } catch (err) {
    console.error(`Error while updating Equipment Details`, err.message);
    next(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.update(req.params.id, req.body));
  } catch (err) {
    console.error(
      `Error while updating Equipment Registration  Master`,
      err.message
    );
    next(err);
  }
});
router.put(
  "/loadEquipmentStatus/:equipment_id/:equipment_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.loadEquipmentStatus(
          req.params.equipment_id, req.params.equipment_sub_id, req.params.txn_id, req.body)
      );
    } catch (err) {
      console.error(
        `"Error while updating the travel details status Data`,
        err.message
      );
      next(err);
    }
  }
);
/* DELETE  a Transport Registration  Master */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.remove(req.params.id));
  } catch (err) {
    console.error(
      `Error while deleting Equipment Registration  Master`,
      err.message
    );
    next(err);
  }
});
/* EQUIPMENT PARTNER APPROVE */
router.put("/approveEquipmentRegDetails/:equipment_id/:equipment_sub_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.approveEquipmentRegDetails(req.params.equipment_id, req.params.equipment_sub_id, req.body));
  } catch (err) {
    console.error(`Error while Approving Equipment Data`, err.message);
    next(err);
  }
});

router.put("/rejectEquipmentRegDetails/:equipment_id/:equipment_sub_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.rejectEquipmentRegDetails(req.params.equipment_id, req.params.equipment_sub_id, req.body));
  } catch (err) {
    console.error(`Error while Approving Equipment Data`, err.message);
    next(err);
  }
});
/* MEDICAL STORE APPROVE */
router.put("/approveMedicalstoreDetails/:equipment_id/:equipment_sub_id/:txn_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.approveMedicalstoreDetails(req.params.equipment_id, req.params.equipment_sub_id,req.params.txn_id,req.body));
  } catch (err) {
    console.error(`Error while Approving Equipment Data`, err.message);
    next(err);
  }
});
router.put("/rejectMedicalstoreDetails/:equipment_id/:equipment_sub_id/:txn_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.rejectMedicalstoreDetails(req.params.equipment_id, req.params.equipment_sub_id,req.params.txn_id,req.body));
  } catch (err) {
    console.error(`Error while Approving Equipment Data`, err.message);
    next(err);
  }
});
/* EQUIPMENT ITEM APPROVE */
router.put("/approveEquipmentDetails/:equipment_id/:equipment_sub_id/:txn_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.approveEquipmentDetails(req.params.equipment_id, req.params.equipment_sub_id,req.params.txn_id,req.body));
  } catch (err) {
    console.error(`Error while Approving Equipment Data`, err.message);
    next(err);
  }
});
router.put("/rejectEquipmentDetails/:equipment_id/:equipment_sub_id/:txn_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.rejectEquipmentDetails(req.params.equipment_id, req.params.equipment_sub_id,req.params.txn_id,req.body));
  } catch (err) {
    console.error(`Error while Approving Equipment Data`, err.message);
    next(err);
  }
});


// router.get("/getEquipmentBookingDetails/booking/:city_id/:array", async function (req, res, next) {
//   try {
//     res.json(await equipmentPartner.getEquipmentBookingDetails(req.params.city_id,req.params.array));
//   } catch (err) {
//     console.error(
//       `Error while getting Equipment Booking`,
//       err.message
//     );
//     next(err);
//   }
// });
router.get("/getEquipmentBookingDetails/booking/:city_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getEquipmentBookingDetails(req.params.city_id));
  } catch (err) {
    console.error(
      `Error while getting Equipment Booking`,
      err.message
    );
    next(err);
  }
});
router.get(
  "/getBookingEquipmentTypes/:equipment_id/:equipment_sub_id/:account_id",
  async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.getBookingEquipmentTypes(
          req.params.equipment_id,
          req.params.equipment_sub_id,
          req.params.account_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Equipment booking Details `, err.message);
      next(err);
    }
  }
);

router.get(
  "/getMedicalItems/:equipment_id/:equipment_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.getMedicalItems(
          req.params.equipment_id,
          req.params.equipment_sub_id,
          req.params.txn_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Medical Item Details `, err.message);
      next(err);
    }
  }
);
router.post("/SavingPropertyPartnerDetails", async function (req, res, next) {
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
      let data = JSON.parse(fields.property_details);
      // console.log("save dthhgff",data);
      if (files.upload_image1) {
        let upload_image1_Obj = JSON.parse(JSON.stringify(files)).upload_image1;
        let upload_image1_name = `${
          data.property_name.property_name
        }_${new Date().getTime()}_${upload_image1_Obj.originalFilename}`;
        fs.renameSync(
          upload_image1_Obj.filepath,
          path.join(form.uploadDir, upload_image1_name)
        );
        docNames.upload_image1_name = upload_image1_name;
      }
      if (files.upload_image2) {
        let upload_image2_Obj = JSON.parse(JSON.stringify(files)).upload_image2;
        let upload_image2_name = `${
          data.property_name.property_name
        }_${new Date().getTime()}_${upload_image2_Obj.originalFilename}`;
        fs.renameSync(
          upload_image2_Obj.filepath,
          path.join(form.uploadDir, upload_image2_name)
        );
        docNames.upload_image2_name = upload_image2_name;
      }
      if (files.upload_image3) {
        let upload_image3_Obj = JSON.parse(JSON.stringify(files)).upload_image3;
        let upload_image3_name = `${
          data.property_name.property_name
        }_${new Date().getTime()}_${upload_image3_Obj.originalFilename}`;
        fs.renameSync(
          upload_image3_Obj.filepath,
          path.join(form.uploadDir, upload_image3_name)
        );
        docNames.upload_image3_name = upload_image3_name;
      }
      if (files.upload_image4) {
        let upload_image4_Obj = JSON.parse(JSON.stringify(files)).upload_image4;
        let upload_image4_name = `${
          data.property_name.property_name
        }_${new Date().getTime()}_${upload_image4_Obj.originalFilename}`;
        fs.renameSync(
          upload_image4_Obj.filepath,
          path.join(form.uploadDir, upload_image4_name)
        );
        docNames.upload_image4_name = upload_image4_name;
      }
      if (files.upload_image5) {
        let upload_image5_Obj = JSON.parse(JSON.stringify(files)).upload_image5;
        let upload_image5_name = `${
          data.property_name.property_name
        }_${new Date().getTime()}_${upload_image5_Obj.originalFilename}`;
        fs.renameSync(
          upload_image5_Obj.filepath,
          path.join(form.uploadDir, upload_image5_name)
        );
        docNames.upload_image5_name = upload_image5_name;
      }
      res.json(await equipmentPartner.createPropertyPartnerDetails(fields, files, docNames, ipAddress)
      );
      // console.log("docNames",docNames);
    });
  } catch (err) {
    console.error(`Error while creating Property Details`, err.message);
    next(err);
  }
});
router.post("/addFoodDetailsSaving", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let food_partner_documents_loc = dir.food_partner_documents;
    form.uploadDir = food_partner_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.food_details);
      if (files.food_image) {
        let foodImg_obj = JSON.parse(JSON.stringify(files)).food_image;
        let foodImg_name = `${data.sub_Name}_${new Date().getTime()}_${
          foodImg_obj.originalFilename
        }`;
        fs.renameSync(
          foodImg_obj.filepath,
          path.join(form.uploadDir, foodImg_name)
        );
        docNames.foodImg_name = foodImg_name;
      }
      res.json(await equipmentPartner.createFoodPartnerDetails(fields, files, docNames, ipAddress));
    });
  } catch (err) {
    console.error(`Error while creating Food Details`, err.message);
    next(err);
  }
});
router.post("/addTravelDetailsSaving", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let transport_doc = dir.transport_partner_documents;
    form.uploadDir = transport_doc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.addTravelLocation);
      if (files.vehicle_image) {
        let vehicleImageObj = JSON.parse(JSON.stringify(files)).vehicle_image;
        let vehicleImageName =  `${data.agent_name}_${new Date().getTime()}_${vehicleImageObj.originalFilename}`;
          fs.renameSync( vehicleImageObj.filepath,path.join(form.uploadDir,vehicleImageName));
         docNames.vehicleImageName = vehicleImageName;
       }
        res.json(await equipmentPartner.createPartnerTravelDetails(fields, files, docNames, ipAddress));     
      
    });
  } catch (err) {
    console.error(
      `Error while creating Travel Details`,
      err.message
    );
    next(err);
  }
});
router.get("/getPropertyPartnerDetails/:account_id/:equipment_id/:equipment_sub_id", async function (req, res, next) {
  try {
    res.send(await equipmentPartner.getPropertyPartnerData(req.params.account_id, req.params.equipment_id, req.params.equipment_sub_id));
  } catch (err) {
    console.error(`Error while getting Property Data `, err.message);
    next(err);
  }
}
);
router.get("/getRoomsPropertyDetails/:account_id/:partner_id/:partner_sub_id/:txn_id",async function (req, res, next) {
  try {
    res.send(
      await equipmentPartner.getRoomsPropertyDetails(req.params.account_id, req.params.partner_id, req.params.partner_sub_id, req.params.txn_id));
  } catch (err) {
    console.error(`Error while getting Rooms Data `, err.message);
    next(err);
  }
}
);
router.post("/propertyRoomDetailsSaving", async function (req, res, next) {
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
      let data = JSON.parse(fields.room_details);
      if (files.upload_room_image1) {
        let upload_room_image1_Obj = JSON.parse(JSON.stringify(files)).upload_room_image1;
        let upload_room_image1_name = `${data.no_of_avail_rooms}_${new Date().getTime()}_${
          upload_room_image1_Obj.originalFilename
        }`;
        fs.renameSync(
          upload_room_image1_Obj.filepath,
          path.join(form.uploadDir, upload_room_image1_name)
        );
        docNames.upload_room_image1_name = upload_room_image1_name;
      }
      if (files.upload_room_image2) {
        let upload_room_image2_Obj = JSON.parse(JSON.stringify(files)).upload_room_image2;
        let upload_room_image2_name = `${data.no_of_avail_rooms}_${new Date().getTime()}_${
          upload_room_image2_Obj.originalFilename
        }`;
        fs.renameSync(
          upload_room_image2_Obj.filepath,
          path.join(form.uploadDir, upload_room_image2_name)
        );
        docNames.upload_room_image2_name = upload_room_image2_name;
      }
      if (files.upload_room_image3) {
        let upload_room_image3_Obj = JSON.parse(JSON.stringify(files)).upload_room_image3;
        let upload_room_image3_name = `${data.no_of_avail_rooms}_${new Date().getTime()}_${
          upload_room_image3_Obj.originalFilename
        }`;
        fs.renameSync(
          upload_room_image3_Obj.filepath,
          path.join(form.uploadDir, upload_room_image3_name)
        );
        docNames.upload_room_image3_name = upload_room_image3_name;
      }
      if (files.upload_room_image4) {
        let upload_room_image4_Obj = JSON.parse(JSON.stringify(files)).upload_room_image4;
        let upload_room_image4_name = `${data.no_of_avail_rooms}_${new Date().getTime()}_${
          upload_room_image4_Obj.originalFilename
        }`;
        fs.renameSync(
          upload_room_image4_Obj.filepath,
          path.join(form.uploadDir, upload_room_image4_name)
        );
        docNames.upload_room_image4_name = upload_room_image4_name;
      }
      if (files.upload_room_image5) {
        let upload_room_image5_Obj = JSON.parse(JSON.stringify(files)).upload_room_image5;
        let upload_room_image5_name = `${data.no_of_avail_rooms}_${new Date().getTime()}_${
          upload_room_image5_Obj.originalFilename
        }`;
        fs.renameSync(
          upload_room_image5_Obj.filepath,
          path.join(form.uploadDir, upload_room_image5_name)
        );
        docNames.upload_room_image5_name = upload_room_image5_name;
      }
      res.json(await equipmentPartner.createPropertyRoomDetails(fields,files,docNames,ipAddress));
    });
  } catch (err) {
    console.error(`Error while creating room details`, err.message);
    next(err);
  }
});
router.put("/updatePropertyPartnerDetails/:txn_id", async function (req, res, next) {
  try {
    res.json(
      await equipmentPartner.updatePartnerDetails(
        req.params.txn_id,
        req.body
      )
    );
  } catch (err) {
    console.error(`Error while updating Property Data`, err.message);
    next(err);
  }
});
router.put(
  "/updateRoomsPropertyDetails/:txn_id/:partner_id/:partner_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.updatePropertyRoomsData(
          req.params.txn_id,
          req.params.partner_id,
          req.params.partner_sub_id,
          req.body
        )
      );
    } catch (err) {
      console.error(`Error while updating Property Data`, err.message);
      next(err);
    }
  });
  
router.get(
  "/loadfoodDetails/:account_id/:agent_id/:agent_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.loadFoodDetails(
          req.params.account_id,
          req.params.agent_id,
          req.params.agent_sub_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Food Details `, err.message);
      next(err);
    }
  }
);
router.get("/loadTravelDetails/:account_id/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.loadTravelDetails(req.params.account_id,req.params.agent_id,req.params.transport_sub_id));
  } catch (err) {
    console.error(
      `Error while getting Add Travel Details Registration`,
      err.message
    );
    next(err);
  }
});
router.put(
  "/travelPartnerUpdating/:txn_id/:agent_id/:transport_sub_id",
  async function (req, res, next) {

    try {
      res.json(
        await equipmentPartner.travelPartnerUpdating(
          req.params.txn_id,
          req.params.agent_id,
          req.params.transport_sub_id,
          req.body
        )
      );
    } catch (err) {
      console.error(
        `Error while updating Transport Registration`,
        err.message
      );
      next(err);
    }
  }
);
router.get("/getMedicalStoresData/:account_id/:equipment_id/:equipment_sub_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getMedicalStoresData(req.params.account_id,req.params.equipment_id, req.params.equipment_sub_id));
  } catch (err) {
    console.error(`Error while getting Medical Stores Data`, err.message);
    next(err);
  }
});
router.put(
  "/addFoodDetailsUpdating/:item_txn_id/:agent_id/:agent_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.addFoodDetailsUpdating(
          
        )
      );
    } catch (err) {
      console.error(
        `Error while updating Food Registration Master`,
        err.message
      );
      next(err);
    }
  }
);
router.post("/EqpRestaurantSaving", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let food_partner_documents_loc = dir.food_partner_documents;
    form.uploadDir = food_partner_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.restaurant_details);
      if (files.upload_fssai) {
        let upload_fssai = JSON.parse(JSON.stringify(files)).upload_fssai;
        let upload_fssai_name = `${data.name_of_kitchen}_${new Date().getTime()}_${files.upload_fssai.originalFilename}`;
        fs.renameSync(upload_fssai.filepath, path.join(form.uploadDir, upload_fssai_name));
        docNames.upload_fssai_name = upload_fssai_name;
      }
      if (files.upload_image1) {
        let upload_image1 = JSON.parse(JSON.stringify(files)).upload_image1;
        let upload_image1_name = `${data.name_of_kitchen}_${new Date().getTime()}_${files.upload_image1.originalFilename}`;
        fs.renameSync(upload_image1.filepath, path.join(form.uploadDir, upload_image1_name));
        docNames.upload_image1_name = upload_image1_name;
      }
      if (files.upload_image2) {
        let upload_image2 = JSON.parse(JSON.stringify(files)).upload_image2;
        let upload_image2_name = `${data.name_of_kitchen}_${new Date().getTime()}_${files.upload_image2.originalFilename}`;
        fs.renameSync(upload_image2.filepath, path.join(form.uploadDir, upload_image2_name)
        );
        docNames.upload_image2_name = upload_image2_name;
      }
      if (files.upload_image3) {
        let upload_image3 = JSON.parse(JSON.stringify(files)).upload_image3;
        let upload_image3_name = `${data.name_of_kitchen}_${new Date().getTime()}_${files.upload_image3.originalFilename}`;
        fs.renameSync(upload_image3.filepath, path.join(form.uploadDir, upload_image3_name));
        docNames.upload_image3_name = upload_image3_name;
      }
      
     
      // console.log("LLL", docNames)
      res.json(await equipmentPartner.createEqpRestaurantSaving(fields, docNames, ipAddress)
      );
    });
  } catch (err) {
    console.error(`Error while creating Medicalrestaurant Details`, err.message);
    next(err);
  }
});
router.get("/getEqpRestaurantDetails/medical/:account_id/:equipment_id/:equipment_sub_id", async function (req, res, next) {
  try {
    res.send(await equipmentPartner.getEqpRestaurantDetails(req.params.account_id, req.params.equipment_id, req.params.equipment_sub_id));
  } catch (err) {
    console.error(`Error while getting Equipment Restaurant Data `, err.message);
    next(err);
  }
}
);
router.put("/updateEqpRestaurantDetails/:txn_id", async function (req, res, next) {
  try {
    res.json(
      await equipmentPartner.updateEqpRestaurantDetails(
        req.params.txn_id,
        req.body
      )
    );
  } catch (err) {
    console.error(`Error while updating restaurant Data`, err.message);
    next(err);
  }
});

router.post("/savingMedicalStoreDetails", async function (req, res, next) {
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
      // console.log("FIELDS", fields)
      // console.log("files", files)
      let data = JSON.parse(fields.addMedStoresData);
      if (files.upload_image_1) {
        let equipmentImageObj1 = JSON.parse(JSON.stringify(files)).upload_image_1;
        let equipmentImageName = `${data.medical_store_name.medical_store_name}_${new Date().getTime()}_${equipmentImageObj1.originalFilename}`;
        fs.renameSync(equipmentImageObj1.filepath, path.join(form.uploadDir, equipmentImageName));
        docNames.equipmentImageName_1 = equipmentImageName;
      }
      if (files.upload_image_2) {
        let equipmentImageObj2 = JSON.parse(JSON.stringify(files)).upload_image_2;
        let equipmentImageName = `${data.medical_store_name.medical_store_name}_${new Date().getTime()}_${equipmentImageObj2.originalFilename}`;
        fs.renameSync(equipmentImageObj2.filepath, path.join(form.uploadDir, equipmentImageName));
        docNames.equipmentImageName_2 = equipmentImageName;
      }
      if (files.upload_image_3) {
        let equipmentImageObj3 = JSON.parse(JSON.stringify(files)).upload_image_3;
        let equipmentImageName = `${data.medical_store_name.medical_store_name}_${new Date().getTime()}_${equipmentImageObj3.originalFilename}`;
        fs.renameSync(equipmentImageObj3.filepath, path.join(form.uploadDir, equipmentImageName));
        docNames.equipmentImageName_3 = equipmentImageName;
      }
      res.json(await equipmentPartner.createMedicalStoreDetails(data, docNames, ipAddress));
    });
  } catch (err) {
    console.error(`Error while Adding Equipment Stores Details,err.message`);
    next(err);
  }
});


router.get("/getAccMedicalStoresData/:account_id/:partner_id/:partner_sub_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getAccMedicalStoresData(req.params.account_id,req.params.partner_id,req.params.partner_sub_id));
    
  } catch (err) {
    console.error(
      `Error while getting Add Medical Details Registration`,
      err.message
    );
    next(err);
  }
});
router.put(
  "/editAccMedicalStoreDetails/:equipment_id/:equipment_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.updateAccMedicalStoreDetails(
          req.params.equipment_id,
          req.params.equipment_sub_id,
          req.params.txn_id,
          req.body
        )
      );
      //console.log(req.params)
    } catch (err) {
      console.error(
        `Error while updating Medical Store Details`,
        err.message
      );
      next(err);
    }
  }
);


router.post("/savingFoodMedicalStoreDetails", async function (req, res, next) {
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
      // console.log("FIELDS", fields)
      // console.log("files", files)
      let data = JSON.parse(fields.addMedStoresData);
      if (files.upload_image_1) {
        let equipmentImageObj1 = JSON.parse(JSON.stringify(files)).upload_image_1;
        let equipmentImageName = `${data.medical_store_name.medical_store_name}${new Date().getTime()}${equipmentImageObj1.originalFilename}`;
        fs.renameSync(equipmentImageObj1.filepath, path.join(form.uploadDir, equipmentImageName));
        docNames.equipmentImageName_1 = equipmentImageName;
      }
      if (files.upload_image_2) {
        let equipmentImageObj2 = JSON.parse(JSON.stringify(files)).upload_image_2;
        let equipmentImageName = `${data.medical_store_name.medical_store_name}${new Date().getTime()}${equipmentImageObj2.originalFilename}`;
        fs.renameSync(equipmentImageObj2.filepath, path.join(form.uploadDir, equipmentImageName));
        docNames.equipmentImageName_2 = equipmentImageName;
      }
      if (files.upload_image_3) {
        let equipmentImageObj3 = JSON.parse(JSON.stringify(files)).upload_image_3;
        let equipmentImageName = `${data.medical_store_name.medical_store_name}${new Date().getTime()}${equipmentImageObj3.originalFilename}`;
        fs.renameSync(equipmentImageObj3.filepath, path.join(form.uploadDir, equipmentImageName));
        docNames.equipmentImageName_3 = equipmentImageName;
      }
      res.json(await equipmentPartner.createFoodMedicalStoreDetails(data, docNames, ipAddress));
    });
  } catch (err) {
    console.error(`Error while Adding Equipment Stores Details,err.message`);
    next(err);
  }
});

router.get("/getFoodMedicalStoresData/:account_id/:agent_id/:agent_sub_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getFoodMedicalStoresData(req.params.account_id,req.params.agent_id,req.params.agent_sub_id));
    
  } catch (err) {
    console.error(
      `Error while getting Add Medical Details Registration`,
      err.message
    );
    next(err);
  }
});
router.put(
  "/editFoodMedicalStoreDetails/:equipment_id/:equipment_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.updateFoodMedicalStoreDetails(
          req.params.equipment_id,
          req.params.equipment_sub_id,
          req.params.txn_id,
          req.body
        )
      );
      //console.log(req.params)
    } catch (err) {
      console.error(
        `Error while updating Medical Store Details`,
        err.message
      );
      next(err);
    }
  }
);

router.post("/savingTravelMedicalStoreDetails", async function (req, res, next) {
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
      // console.log("FIELDS", fields)
      // console.log("files", files)
      let data = JSON.parse(fields.addMedStoresData);
      if (files.upload_image_1) {
        let equipmentImageObj1 = JSON.parse(JSON.stringify(files)).upload_image_1;
        let equipmentImageName = `${data.medical_store_name}_${new Date().getTime()}_${equipmentImageObj1.originalFilename}`;
        fs.renameSync(equipmentImageObj1.filepath, path.join(form.uploadDir, equipmentImageName));
        docNames.equipmentImageName_1 = equipmentImageName;
      }
      if (files.upload_image_2) {
        let equipmentImageObj2 = JSON.parse(JSON.stringify(files)).upload_image_2;
        let equipmentImageName = `${data.medical_store_name}_${new Date().getTime()}_${equipmentImageObj2.originalFilename}`;
        fs.renameSync(equipmentImageObj2.filepath, path.join(form.uploadDir, equipmentImageName));
        docNames.equipmentImageName_2 = equipmentImageName;
      }
      if (files.upload_image_3) {
        let equipmentImageObj3 = JSON.parse(JSON.stringify(files)).upload_image_3;
        let equipmentImageName = `${data.medical_store_name}_${new Date().getTime()}_${equipmentImageObj3.originalFilename}`;
        fs.renameSync(equipmentImageObj3.filepath, path.join(form.uploadDir, equipmentImageName));
        docNames.equipmentImageName_3 = equipmentImageName;
      }
      res.json(await equipmentPartner.createTravelMedicalStoreDetails(data, docNames, ipAddress));
    });
  } catch (err) {
    console.error(`Error while Adding Equipment Stores Details,err.message`);
    next(err);
  }
});

router.get("/getTravelMedicalStoresData/:account_id/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.json(await equipmentPartner.getTravelMedicalStoresData(req.params.account_id,req.params.agent_id,req.params.transport_sub_id));
    
  } catch (err) {
    console.error(
      `Error while getting Add Medical Details Registration`,
      err.message
    );
    next(err);
  }
});

router.put(
  "/editTravelMedicalStoreDetails/:equipment_id/:equipment_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.updateTravelMedicalStoreDetails(
          req.params.equipment_id,
          req.params.equipment_sub_id,
          req.params.txn_id,
          req.body
        )
      );
      //console.log(req.params)
    } catch (err) {
      console.error(
        `Error while updating Medical Store Details`,
        err.message
      );
      next(err);
    }
  }
);

router.put(
  "/editMedicalStoreDetails/:equipment_id/:equipment_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await equipmentPartner.updateMedicalStoreDetails(
          req.params.equipment_id,
          req.params.equipment_sub_id,
          req.params.txn_id,
          req.body
        )
      );
    } catch (err) {
      console.error(
        `Error while updating Medical Store Details`,
        err.message
      );
      next(err);
    }
  }
);

module.exports = router;