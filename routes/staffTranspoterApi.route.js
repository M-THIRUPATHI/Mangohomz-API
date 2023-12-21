const express = require("express");
const router = express.Router();
const staffTransportRegistrationMaster = require("../services/staffTranspoterApi.services");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const dir = require("../resources/filepath");


/* GET All  Transport Registration  Master. */
router.get("/transportAccomodation", async function (req, res, next) {
  try {
    res.json(await staffTransportRegistrationMaster.getMultiple());
  } catch (err) {
    console.error(
      `Error while getting Transport Registration  Master `,
      err.message
    );
    next(err);
  }
});
router.get("/travelLocationDetails/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.json(await staffTransportRegistrationMaster.getTravelLocation(req.params.agent_id,req.params.transport_sub_id));
  } catch (err) {
    console.error(
      `Error while getting Add Travel Details Registration`,
      err.message
    );
    next(err);
  }
});
router.get("/transportRegistrationMasterStatusCount", async function (req, res, next) {
    try {
        res.json(await staffTransportRegistrationMaster.getStatusCount());
    } catch (err) {
        console.error(
        `Error while getting Transport Registration Master `,
        err.message
        );
        next(err);
  }
});
router.get("/transportExistingUser/:agent_id", async function (req, res, next) {
  try {
    res.json(await staffTransportRegistrationMaster.transportExistingUser(req.params.agent_id));
  } catch (err) {
    console.error(
      `Error while getting Transport Registration Master `,
      err.message
    );
    next(err);
  }
});
/* GET single Transport Registration  Master. */
router.get("/:id", async function (req, res, next) {
  try {
    res.send(
      await staffTransportRegistrationMaster.getSingleParentTypeDetail(req.params.id)
    );
  } catch (err) {
    console.error(
      `Error while getting Transport Registration  Master `,
      err.message
    );
    next(err);
  }
});
router.get("/getTransportDataOnStatus/:status", async function (req, res, next) {
  try {
    res.json(await staffTransportRegistrationMaster.getTransportDataOnStatus(req.params.status));
  } catch (err) {
    console.error(
      `Error while getting Transport Registration Master `,
      err.message
    );
    next(err);
  }
});
/* POST create a new Transport Registration  Master */
// router.post("/saveTravelLocationData", async function (req, res, next){

//   try{
//     const form = new formidable.IncomingForm();
//     formidable.keepExtensions = true;
//     let transport_doc = dir.transport_partner_documents;
//     form.uploadDir = transport_doc;
//     if (!fs.existsSync(form.uploadDir)) {
//       fs.mkdirSync(form.uploadDir);
//     }

//     form.parse(req, async (_, fields, files) => {
//       let data = fields
     
//       res.json(await staffTransportRegistrationMaster.saveTravelLoc(data));
    
//     });
//   } catch (err) {
//     console.error(`Error while getting Travel Location Registration `, err.message);
//     next(err);
//   }
// });
/* POST create a new Travel Registration  */
router.get("/TravelpartnerNames/partnerNames", async function (req, res, next) {
  try {
    res.json(await staffTransportRegistrationMaster.getTravelpartnerNames());
  } catch (err) {
    console.error(`Error while getting Transort PARTNERS NAMES `, err.message);
    next(err);
  }
});
router.get(
  "/SubTravelpartnerNames/:agent_id/:travel_status", async function (req, res, next){
    try {
      res.json(
        await staffTransportRegistrationMaster.getSubTravelpartnerNames(
         req.params.agent_id,req.params.travel_status));
    } catch (err) {
      console.error(`Error while getting SUBPARTNERS NAMES `, err.message);
      next(err);
    }
  }
);
router.get("/travelItemDetails/:agent_id/:transport_sub_id/:travel_status", async function (req, res, next) {
  try {
    res.json(await staffTransportRegistrationMaster.getTravelDetails(req.params.agent_id,req.params.transport_sub_id,req.params.travel_status));
  } catch (err) {
    console.error(
      `Error while getting Add Travel Details Registration`,
      err.message
    );
    next(err);
  }
});
router.post("/ledgertravelDetails", async function (req, res, next) {

  try {
    res.json(await staffTransportRegistrationMaster.ledgertravelDetails(req.body));
  } catch (err) {
    console.error(`Error while updating the travel status `, err.message);
    next(err);
  }
});
router.put(
  "/loadTravelStatus/:agent_id/:transport_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await staffTransportRegistrationMaster.loadTravelStatus(
          req.params.agent_id,req.params.transport_sub_id,req.params.txn_id,req.body)
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
router.post("/savingTravelDetails", async function (req, res, next) {
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
      let data = JSON.parse(fields.travelLocation);
      if (files.vehicle_image) {
        let vehicleImageObj = JSON.parse(JSON.stringify(files)).vehicle_image;
        let vehicleImageName =  `${data.agent_name}_${new Date().getTime()}_${vehicleImageObj.originalFilename}`;
          fs.renameSync( vehicleImageObj.filepath,path.join(form.uploadDir,vehicleImageName));
         docNames.vehicleImageName = vehicleImageName;
       }
        res.json(await staffTransportRegistrationMaster.createTravelDetails(fields, files, docNames,ipAddress));     
      
    });
  } catch (err) {
    console.error(
      `Error while creating Travel Details`,
      err.message
    );
    next(err);
  }
});

router.put("/updatetransportPartnerForm/:agent_id/:transport_sub_id", async function (req, res, next) {
  
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
    let data = JSON.parse(fields.updatetransport);
    
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
        
        res.json(await staffTransportRegistrationMaster.updatetransportPartnerForm( data.agent_id, data.transport_sub_id,data,docNames,fields));
    
  });
  } catch (err) {
    console.error(
      `Error while updating Transport Registration  Master`,
      err.message
    );
    next(err);
  }
});
/* PUT Transport Registration  Master */
router.put("/:agent_id/:transport_sub_id", async function (req, res, next) {
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
      let data = JSON.parse(fields.updatetransport);
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
      res.json(await staffTransportRegistrationMaster.update(fields, files, docNames, ipAddress));
      
    });

  } catch (err) {
    console.error(
      `Error while updating Transport Registration  Master`,
      err.message
    );
    next(err);
  }
});
router.get("/transportDetails/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.json(await staffTransportRegistrationMaster.getTrasportDetails( req.params.agent_id, req.params.transport_sub_id));
    

  } catch (err) {
    console.error(
      `Error while getting Add Travel Details Registration`,
      err.message
    );
    next(err);
  }
});

router.put(
  "/editTransportDetails/:agent_id/:transport_sub_id/:tnx_id",
  async function (req, res, next) {
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
      let data = JSON.parse(fields.transportedited);
      if (files.upload_image1) {
        let upload_image1Obj = JSON.parse(JSON.stringify(files)).upload_image1;
        if(upload_image1Obj) {
          let upload_image1Name = `${data.agent_name}${new Date().getTime()}${upload_image1Obj.originalFilename}`;
          fs.renameSync(upload_image1Obj.filepath, path.join(form.uploadDir, upload_image1Name));
          docNames.upload_image1Name = upload_image1Name;
        } else {
          docNames.upload_image1Name = data.upload_image1Name;
        }
      } else {
        docNames.upload_image1Name = data.uploadImage_update1;
      }
      if (files.upload_image2) {
        let upload_image2Obj = JSON.parse(JSON.stringify(files)).upload_image2;
        if(upload_image2Obj) {
          let upload_image2Name = `${data.agent_name}${new Date().getTime()}${upload_image2Obj.originalFilename}`;
          fs.renameSync(upload_image2Obj.filepath, path.join(form.uploadDir, upload_image2Name));
          docNames.upload_image2Name = upload_image2Name;
        } else {
          docNames.upload_image2Name = data.upload_image2Name;
        }
      } else {
        docNames.upload_image2Name = data.uploadImage_update2;
      }
      
      // console.log("890",docNames);

      res.json(
        await staffTransportRegistrationMaster.updateTransportDetails(
          data.agent_id,
          data.transport_sub_id,
          data.tnx_id,data,docNames,fields
          
        )
      );
    });
    } catch (err) {
      console.error(
        `Error while updating Transport Details`,
        err.message
      );
      next(err);
    }
  }
);

router.put(
  "/updatingTravelDetails/:txn_id/:agent_id/:transport_sub_id",
  async function (req, res, next) {
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
        let data = JSON.parse(fields.travelLocation);
  
        if (files.vehicle_image) {
          let vehicle_imageObj = JSON.parse(JSON.stringify(files)).vehicle_image;
          let vehicle_imageName = `${data.agent_name}_${new Date().getTime()}_${vehicle_imageObj.originalFilename}`;
          fs.renameSync(vehicle_imageObj.filepath, path.join(form.uploadDir, vehicle_imageName));
          docNames.vehicle_imageName = vehicle_imageName;
        }
        // console.log("mmmmmm",data);
        // console.log("llllllll",docNames);
        res.json(
          await staffTransportRegistrationMaster.updateTravelDetails(data.txn_id,data.agent_id, data.transport_sub_id,data,docNames,fields)
        );
      });
    } catch (err) {
      console.error(
        `Error while updating Transport Registration`,
        err.message
      );
      next(err);
    }
  }
);

/* DELETE  a Transport Registration  Master */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await staffTransportRegistrationMaster.remove(req.params.id));
  } catch (err) {
    console.error(
      `Error while deleting Transport Registration  Master`,
      err.message
    );
    next(err);
  }
});
router.get("/getAdminTravelData", async function (req, res, next) {
  try {
    res.json(await staffTransportRegistrationMaster.getAdminTravelData(req.params.account_id));
  } catch (err) {
    console.error(
      `Error while getting Transport Registration  Master `,
      err.message
    );
    next(err);
  }
});
router.get("/getTransportAllDisplayForStaff/:status", async function (req, res, next) {
  try {
    res.json(await staffTransportRegistrationMaster.getTransportAllDisplayForStaff(req.params.status));
  } catch (err) {
    console.error(
      `Error while getting Transport Registration  Master `,
      err.message
    );
    next(err);
  }
});
module.exports = router;
