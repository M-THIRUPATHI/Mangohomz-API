const express = require("express");
const router = express.Router();
const transportRegistrationMaster = require("../services/transportPartnerReg.services");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const dir = require("../resources/filepath");
/* GET All  Transport Registration  Master. */
router.get("/getTransportRegAdminMaster", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getTransportRegAdminMaster());
  } catch (err) {
    console.error(
      `Error while getting Transport Registration  Master `,
      err.message
    );
    next(err);
  }
});
router.get("/:account_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getMultiple(req.params.account_id));
  } catch (err) {
    console.error(
      `Error while getting Transport Registration  Master `,
      err.message
    );
    next(err);
  }
});
router.get("/TravelpartnerNames/:account_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getTravelpartnerNames(req.params.account_id));
  } catch (err) {
    console.error(`Error while getting PARTNERS NAMES `, err.message);
    next(err);
  }
});
router.get(
  "/SubTravelpartnerNames/:account_id/:agent_id", async function (req, res, next) {
    try {
      res.json(
        await transportRegistrationMaster.getSubTravelpartnerNames(
          req.params.account_id, req.params.agent_id));
    } catch (err) {
      console.error(`Error while getting SUBPARTNERS NAMES `, err.message);
      next(err);
    }
  }
);
router.get(
  "/loadAccTravelSubpartnerNames/:account_id/:partner_id", async function (req, res, next) {
    try {
      res.json(
        await transportRegistrationMaster.loadAccTravelSubpartnerNames(
          req.params.account_id, req.params.partner_id));
    } catch (err) {
      console.error(`Error while getting SUBPARTNERS NAMES `, err.message);
      next(err);
    }
  }
);
router.get(
  "/loadFoodTravelSubpartnerNames/:account_id/:agent_id",
  async function (req, res, next) {
    try {
      res.json(
        await transportRegistrationMaster.loadFoodTravelSubpartnerNames(
          req.params.account_id,
          req.params.agent_id
        )
      );
    } catch (err) {
      console.error(`Error while getting SUBPARTNERS NAMES `, err.message);
      next(err);
    }
  }
);


router.get(
  "/loadEquipmentTravelSubpartnerNames/:account_id/:equipment_id", async function (req, res, next) {
    try {
      res.json(
        await transportRegistrationMaster.loadEquipmentTravelSubpartnerNames(
          req.params.account_id, req.params.equipment_id));
    } catch (err) {
      console.error(`Error while getting SUBPARTNERS NAMES `, err.message);
      next(err);
    }
  }
);
// router.put(
//   "/updatingTravelDetails/:txn_id/:agent_id/:transport_sub_id",
//   async function (req, res, next) {

//     try {
//       res.json(
//         await transportRegistrationMaster.updateTravelDetails(
//           req.params.txn_id,
//           req.params.agent_id,
//           req.params.transport_sub_id,
//           req.body
//         )
//       );
//     } catch (err) {
//       console.error(
//         `Error while updating Transport Registration`,
//         err.message
//       );
//       next(err);
//     }
//   }
// );
router.put(
  "/updatingTravellocationDetails/:txn_id/:agent_id/:transport_sub_id",
  async function (req, res, next) {
    try {
      const form = new formidable.IncomingForm();
      formidable.keepExtensions = true;
      let transport_partner_documents_loc = dir.transport_partner_documents;
      form.uploadDir = transport_partner_documents_loc;
      if (!fs.existsSync(form.uploadDir)) {
        fs.mkdirSync(transport_partner_documents_loc, { recursive: true });
      }
      let docNames = {};
      
      form.parse(req, async (err, fields, files) => {
        
        
        let data = JSON.parse(fields.updatetransport_details);
        if (files.vehicle_image) {
          let vehicle_image_Obj = JSON.parse(JSON.stringify(files)).vehicle_image;
          if (vehicle_image_Obj) {
            let vehicle_image_name = `${data.transport_sub_name}_${new Date().getTime()}_${vehicle_image_Obj.originalFilename}`;
    
            fs.renameSync(
              vehicle_image_Obj.filepath,
              path.join(form.uploadDir, vehicle_image_name)
            );
  
            docNames.vehicle_image_name = vehicle_image_name;
          } else {
            docNames.vehicle_image_name = data.vehicle_image_name;
          }
        } else {
          docNames.vehicle_image_name = data.vehicle_image;
        }
        
       // console.log("route", data, docNames);
        try {
          const result = await transportRegistrationMaster.updatingTravellocationDetails(
            data.txn_id,
            data.agent_id,
            data.transport_sub_id,
            data,
            docNames,
            req.body
          );
          res.json(result);
        } catch (err) {
          console.error(`Error while updating Transport Registration:`, err.message);
          return next(err);
        }
      });
    } catch (err) {
      console.error(`Error while updating Transport Registration:`, err.message);
      next(err);
    }
  }
);

router.get("/travelLocationDetails/:account_id/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getTravelLocation(req.params.account_id, req.params.agent_id, req.params.transport_sub_id));
  } catch (err) {
    console.error(
      `Error while getting Add Travel Details Registration`,
      err.message
    );
    next(err);
  }
});

router.get("/travelLocationData/:agent_id/:transport_sub_id/:time", async function (req, res, next) {
  // console.log(req.params);
  try {
    res.json(await transportRegistrationMaster.getTravelData(req.params.agent_id, req.params.transport_sub_id, req.params.time));
  } catch (err) {
    console.error(
      `Error while getting Add Travel Details Registration`,
      err.message
    );
    next(err);
  }
});
router.get("/travelLocationCartData/:agent_id/:transport_sub_id/:txn_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getTravelCartData(req.params.agent_id, req.params.transport_sub_id, req.params.txn_id));
  } catch (err) {
    console.error(
      `Error while getting Add Travel Details Registration`,
      err.message
    );
    next(err);
  }
}
);
router.get

("/travelItemDetails/:account_id/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getTravelDetails(req.params.account_id, req.params.agent_id, req.params.transport_sub_id));
  } catch (err) {
    console.error(
      `Error while getting Add Travel Details Registration`,
      err.message
    );
    next(err);
  }
});
router.get("/getTravelDetailsForAdmin/:account_id/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getTravelDetailsForAdmin(req.params.account_id, req.params.agent_id, req.params.transport_sub_id));
  } catch (err) {
    console.error(`Error while getting Travel Vehicle Details`, err.message);
    next(err);
  }
});
// router.get("/travelLocationbookingDetails", async function (req, res, next) {
//   try {
//     res.json(await transportRegistrationMaster.getTravelbookingDetails());
//   } catch (err) {
//     console.error(
//       `Error while getting Travel Details Registration`,
//       err.message
//     );
//     next(err);
//   }
// });
router.get("/travelLocationbookingDetails/booking/:time/:city_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getTravelbookingDetails(req.params.time, req.params.city_id));
  } catch (err) {
    console.error(
      `Error while getting Travel Details Registration`,
      err.message
    );
    next(err);
  }
});

router.get("/getPartnersDataForAdmin/pendingPartners", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getPartnersDataForAdmin());
  }
  catch (err) {
    console.error(
      `Error while getting Transport Partners Data`,
      err.message
    );
    next(err);
  }
});

router.get("/getAllTravelDetailsForAdmin/:status", async function (req, res) {
  try {
    res.json(await transportRegistrationMaster.getAllTravelDetailsForAdmin(req.params.status));
  }
  catch (err) {
    console.error(
      `Error while getting Transport Registration`,
      err.message
    );
    next(err);
  }
});
router.get("/getTravelDisplayCountOfPartner/:status", async function (req, res) {
  try {
    res.json(await transportRegistrationMaster.getTravelDisplayCountOfPartner(req.params.status));
  }
  catch (err) {
    console.error(
      `Error while getting Transport Registration`,
      err.message
    );
    next(err);
  }
});
router.get("/getTransportPartnerApproveData/approvedData", async function (req, res) {
  try {
    res.json(await transportRegistrationMaster.getTransportPartnerApproveData());
  }
  catch (err) {
    console.error(
      `Error while getting Transport Registration`,
      err.message
    );
    next(err);
  }
});

router.get("/transportRegistrationMasterStatusCount", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getStatusCount());
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
    res.json(await transportRegistrationMaster.transportExistingUser(req.params.agent_id));
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
      await transportRegistrationMaster.getSingleParentTypeDetail(req.params.id)
    );
  } catch (err) {
    console.error(
      `Error while getting Transport Registration  Master `,
      err.message
    );
    next(err);
  }
});
router.get("/getTransportDataOnStatus/:status/:account_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getTransportDataOnStatus(req.params.status, req.params.account_id));
  } catch (err) {
    console.error(
      `Error while getting Transport Registration Master `,
      err.message
    );
    next(err);
  }
});
router.get("/getTransportAdminBasedOnStatus/:status", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getTransportAdminBasedOnStatus(req.params.status));
  } catch (err) {
    console.error(
      `Error while getting Transport Registration Master `,
      err.message
    );
    next(err);
  }
});
router.get("/TravelcityNames/city", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.TravelcityNames(req.body));
  } catch (err) {
    console.error(
      `Error while getting Cities `,
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

//       res.json(await transportRegistrationMaster.saveTravelLoc(data));

//     });
//   } catch (err) {
//     console.error(`Error while getting Travel Location Registration `, err.message);
//     next(err);
//   }
// });
/* POST create a new Travel Registration  */
router.post("/ledgertravelDetails", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.ledgertravelDetails(req.body));
  } catch (err) {
    console.error(`Error while updating the travel status `, err.message);
    next(err);
  }
});
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
        let vehicleImageName = `${data.agent_name}_${new Date().getTime()}_${vehicleImageObj.originalFilename}`;
        fs.renameSync(vehicleImageObj.filepath, path.join(form.uploadDir, vehicleImageName));
        docNames.vehicleImageName = vehicleImageName;
      }
      res.json(await transportRegistrationMaster.createTravelDetails(fields, files, docNames, ipAddress));

    });
  } catch (err) {
    console.error(
      `Error while creating Travel Details`,
      err.message
    );
    next(err);
  }
});
router.post("/", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let transport_doc = dir.transport_partner_documents;
    form.uploadDir = transport_doc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.transportPartnerForm);
      let docNames = {};
      if (files.pancard) {
        let panObj = JSON.parse(JSON.stringify(files)).pancard;
        let pan = `${data.name}_${new Date().getTime()}_${panObj.originalFilename
          }`;
        fs.renameSync(panObj.filepath, path.join(form.uploadDir, pan));
        docNames.pan = pan;
      };
      if (files.addhaar) {
        let addhaarObj = JSON.parse(JSON.stringify(files)).addhaar;
        let addhaar = `${data.name}_${new Date().getTime()}_${addhaarObj.originalFilename
          }`;
        fs.renameSync(addhaarObj.filepath, path.join(form.uploadDir, addhaar));
        docNames.addhaar = addhaar;
      };
      if (files.gst_tin) {

        let gst_tinObj = JSON.parse(JSON.stringify(files)).gst_tin;
        let gst_tin = `${data.name}_${new Date().getTime()}_${gst_tinObj.originalFilename
          }`;
        fs.renameSync(gst_tinObj.filepath, path.join(form.uploadDir, gst_tin));
        docNames.gst = gst_tin;
      };
      if (files.mh_agreement) {
        let mh_agreementObj = JSON.parse(JSON.stringify(files)).mh_agreement;
        let mh_agreement = `${data.name}_${new Date().getTime()}_${mh_agreementObj.originalFilename
          }`;
        fs.renameSync(mh_agreementObj.filepath, path.join(form.uploadDir, mh_agreement));
        docNames.mh_agreement = mh_agreement;
      };

      if (files.undertaking_certificate) {
        let undertaking_certificateObj = JSON.parse(JSON.stringify(files)).undertaking_certificate;
        let undertaking_certificate = `${data.name}_${new Date().getTime()}_${undertaking_certificateObj.originalFilename
          }`;
        fs.renameSync(undertaking_certificateObj.filepath, path.join(form.uploadDir, undertaking_certificate));
        docNames.undertaking_certificate = undertaking_certificate;
      };
      if (files.property_tax) {
        let property_taxObj = JSON.parse(JSON.stringify(files)).property_tax;
        let property_tax = `${data.name}_${new Date().getTime()}_${property_taxObj.originalFilename
          }`;
        fs.renameSync(property_taxObj.filepath, path.join(form.uploadDir, property_tax));
        docNames.property_tax = property_tax;
      };
      if (files.fire_safety) {
        let fire_safetyObj = JSON.parse(JSON.stringify(files)).fire_safety;
        let fire_safety = `${data.name}_${new Date().getTime()}_${fire_safetyObj.originalFilename
          }`;
        fs.renameSync(fire_safetyObj.filepath, path.join(form.uploadDir, fire_safety));
        docNames.fire_safety = fire_safety;
      };
      if (files.cancelled_cheque) {
        let cancelled_chequeObj = JSON.parse(JSON.stringify(files)).cancelled_cheque;
        let cancelled_cheque = `${data.name}_${new Date().getTime()}_${cancelled_chequeObj.originalFilename
          }`;
        fs.renameSync(cancelled_chequeObj.filepath, path.join(form.uploadDir, cancelled_cheque));
        docNames.cancelled_cheque = cancelled_cheque;
      };
      if (data.agent_id == "") {
        res.json(await transportRegistrationMaster.create(fields, files, docNames, ipAddress));
      } else {
        res.json(await transportRegistrationMaster.createTransportExistingUser(fields, files, docNames, ipAddress))
      }
    });
  } catch (err) {
    console.error(
      `Error while creating Transport Registration  Master`,
      err.message
    );
    next(err);
  }
});
// router.get("/transportRegistrationMasterStatusCount", async function (req, res, next) {
//   try {
//     res.json(await transportRegistrationMaster.getStatusCount());
//   } catch (err) {
//     console.error(
//       `Error while getting Transport Registration Master `,
//       err.message
//     );
//     next(err);
//   }
// });
/* PUT Transport Registration  Master */
router.put(
  "/loadTravelStatus/:agent_id/:transport_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await transportRegistrationMaster.loadTravelStatus(
          req.params.agent_id, req.params.transport_sub_id, req.params.txn_id, req.body)
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
router.put("/:user_id/:agent_id/:transport_sub_id/:name/:partner_sub_name", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.update(req.params.user_id, req.params.agent_id, req.params.transport_sub_id, req.params.name,
      req.params.partner_sub_name, req.body));
  } catch (err) {
    console.error(
      `Error while updating Transport Registration  Master`,
      err.message
    );
    next(err);
  }
});
/* DELETE  a Transport Registration  Master */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.remove(req.params.id));
  } catch (err) {
    console.error(
      `Error while deleting Transport Registration  Master`,
      err.message
    );
    next(err);
  }
});
router.put("/approveTravelRegDetails/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.approveTravelRegDetails(req.params.agent_id, req.params.transport_sub_id, req.body));
  } catch (err) {
    console.error(`Error while Approving Transport Data`, err.message);
    next(err);
  }
});

router.put("/rejectTravelRegDetails/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.rejectTravelRegDetails(req.params.agent_id, req.params.transport_sub_id, req.body));
  } catch (err) {
    console.error(`Error while Rejecting Transport Data`, err.message);
    next(err);
  }
});
/* TRANSPORT DETAILS APPROVE */
router.put("/approveTrasnportDetails/:tnx_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.approveTrasnportDetails(req.params.tnx_id, req.body));
  } catch (err) {
    console.error(`Error while Approving Transport Data`, err.message);
    next(err);
  }
});
router.put("/rejectTransportDetails/:tnx_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.rejectTransportDetails(req.params.tnx_id, req.body));
  } catch (err) {
    console.error(`Error while Approving Transport Data`, err.message);
    next(err);
  }
});

/* TRAVEL DETAILS APPROVE */
router.put("/approveTravelDetails/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.approveTravelDetails(req.params.agent_id, req.params.transport_sub_id, req.body));
  } catch (err) {
    console.error(`Error while Approving Transport Data`, err.message);
    next(err);
  }
});
router.put("/rejectTravelDetails/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.rejectTravelDetails(req.params.agent_id, req.params.transport_sub_id, req.body));
  } catch (err) {
    console.error(`Error while Approving Transport Data`, err.message);
    next(err);
  }
});
// other partner details
router.get("/othertravelPropertyDetails/:account_id/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.otherTravelProperty(req.params.account_id, req.params.agent_id, req.params.transport_sub_id));
  } catch (err) {
    console.error(
      `Error while getting Add Travel Details Registration`,
      err.message
    );
    next(err);
  }
});



router.get("/loadTravelRoomsData/:account_id/:partner_id/:partner_sub_id/:txn_id", async function (req, res, next) {
  try {
    res.send(
      await transportRegistrationMaster.loadTravelRoomsData(req.params.account_id, req.params.partner_id, req.params.partner_sub_id, req.params.txn_id));
  } catch (err) {
    console.error(`Error while getting Rooms Data `, err.message);
    next(err);
  }
}
);


router.put(
  "/updateTravelRoomsData/:txn_id/:partner_id/:partner_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await transportRegistrationMaster.updateTravelRoomsData(
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



router.get("/loadTravelMedicalEqpData/:account_id/:equipment_id/:equipment_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.loadTravelMedicalEqpData(req.params.account_id, req.params.equipment_id, req.params.equipment_sub_id));
  } catch (err) {
    console.error(
      `Error while Loading the Equipment Partner Details`,
      err.message
    );
    next(err);
  }
});



router.put("/updatingTravelEquipment/:equipment_id/:equipment_sub_id/:txn_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.putTravelEquipmentDetails(req.params.equipment_id, req.params.equipment_sub_id, req.params.txn_id, req.body));
  } catch (err) {
    console.error(`Error while updating Equipment Details`, err.message);
    next(err);
  }
});

router.get(
  "/travelfoodDetails/:account_id/:agent_id/:agent_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await transportRegistrationMaster.travelfoodDetails(
          req.params.account_id,
          req.params.agent_id,
          req.params.agent_sub_id,
          req.params.txn_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Food Details `, err.message);
      next(err);
    }
  }
);


// Updating FOOD DETAILS
router.put(
  "/updatingTravelFoodDetails/:item_txn_id/:agent_id/:agent_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await transportRegistrationMaster.updateTravelFoodDetails(
          req.params.item_txn_id,
          req.params.agent_id,
          req.params.agent_sub_id,
          req.body
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


router.post("/savingTravelRoomDetails", async function (req, res, next) {
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
        let upload_room_image1_name = `${data.no_of_avail_rooms}_${new Date().getTime()}_${upload_room_image1_Obj.originalFilename
          }`;
        fs.renameSync(
          upload_room_image1_Obj.filepath,
          path.join(form.uploadDir, upload_room_image1_name)
        );
        docNames.upload_room_image1_name = upload_room_image1_name;
      }
      if (files.upload_room_image2) {
        let upload_room_image2_Obj = JSON.parse(JSON.stringify(files)).upload_room_image2;
        let upload_room_image2_name = `${data.no_of_avail_rooms}_${new Date().getTime()}_${upload_room_image2_Obj.originalFilename
          }`;
        fs.renameSync(
          upload_room_image2_Obj.filepath,
          path.join(form.uploadDir, upload_room_image2_name)
        );
        docNames.upload_room_image2_name = upload_room_image2_name;
      }
      if (files.upload_room_image3) {
        let upload_room_image3_Obj = JSON.parse(JSON.stringify(files)).upload_room_image3;
        let upload_room_image3_name = `${data.no_of_avail_rooms}_${new Date().getTime()}_${upload_room_image3_Obj.originalFilename
          }`;
        fs.renameSync(
          upload_room_image3_Obj.filepath,
          path.join(form.uploadDir, upload_room_image3_name)
        );
        docNames.upload_room_image3_name = upload_room_image3_name;
      }
      if (files.upload_room_image4) {
        let upload_room_image4_Obj = JSON.parse(JSON.stringify(files)).upload_room_image4;
        let upload_room_image4_name = `${data.no_of_avail_rooms}_${new Date().getTime()}_${upload_room_image4_Obj.originalFilename
          }`;
        fs.renameSync(
          upload_room_image4_Obj.filepath,
          path.join(form.uploadDir, upload_room_image4_name)
        );
        docNames.upload_room_image4_name = upload_room_image4_name;
      }
      if (files.upload_room_image5) {
        let upload_room_image5_Obj = JSON.parse(JSON.stringify(files)).upload_room_image5;
        let upload_room_image5_name = `${data.no_of_avail_rooms}_${new Date().getTime()}_${upload_room_image5_Obj.originalFilename
          }`;
        fs.renameSync(
          upload_room_image5_Obj.filepath,
          path.join(form.uploadDir, upload_room_image5_name)
        );
        docNames.upload_room_image5_name = upload_room_image5_name;
      }
      res.json(await transportRegistrationMaster.createTravelRoomDetails(fields, files, docNames, ipAddress));
    });
  } catch (err) {
    console.error(`Error while creating room details`, err.message);
    next(err);
  }
});




router.put("/updateTravelPropertyData/:txn_id", async function (req, res, next) {
  try {
    res.json(
      await transportRegistrationMaster.updateTravelPropertyData(
        req.params.txn_id,
        req.body
      )
    );
  } catch (err) {
    console.error(`Error while updating Property Data`, err.message);
    next(err);
  }
});


/* POST create other Partner  a new Property Registration Master */
router.post("/savingOtherPropertyDetails", async function (req, res, next) {
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
      if (files.upload_image1) {
        let upload_image1_Obj = JSON.parse(JSON.stringify(files)).upload_image1;
        let upload_image1_name = `${data.property_name
          }_${new Date().getTime()}_${upload_image1_Obj.originalFilename}`;
        fs.renameSync(
          upload_image1_Obj.filepath,
          path.join(form.uploadDir, upload_image1_name)
        );
        docNames.upload_image1_name = upload_image1_name;
      }
      if (files.upload_image2) {
        let upload_image2_Obj = JSON.parse(JSON.stringify(files)).upload_image2;
        let upload_image2_name = `${data.property_name
          }_${new Date().getTime()}_${upload_image2_Obj.originalFilename}`;
        fs.renameSync(
          upload_image2_Obj.filepath,
          path.join(form.uploadDir, upload_image2_name)
        );
        docNames.upload_image2_name = upload_image2_name;
      }
      if (files.upload_image3) {
        let upload_image3_Obj = JSON.parse(JSON.stringify(files)).upload_image3;
        let upload_image3_name = `${data.property_name
          }_${new Date().getTime()}_${upload_image3_Obj.originalFilename}`;
        fs.renameSync(
          upload_image3_Obj.filepath,
          path.join(form.uploadDir, upload_image3_name)
        );
        docNames.upload_image3_name = upload_image3_name;
      }
      if (files.upload_image4) {
        let upload_image4_Obj = JSON.parse(JSON.stringify(files)).upload_image4;
        let upload_image4_name = `${data.property_name
          }_${new Date().getTime()}_${upload_image4_Obj.originalFilename}`;
        fs.renameSync(
          upload_image4_Obj.filepath,
          path.join(form.uploadDir, upload_image4_name)
        );
        docNames.upload_image4_name = upload_image4_name;
      }
      if (files.upload_image5) {
        let upload_image5_Obj = JSON.parse(JSON.stringify(files)).upload_image5;
        let upload_image5_name = `${data.property_name
          }_${new Date().getTime()}_${upload_image5_Obj.originalFilename}`;
        fs.renameSync(
          upload_image5_Obj.filepath,
          path.join(form.uploadDir, upload_image5_name)
        );
        docNames.upload_image5_name = upload_image5_name;
      }
      res.json(await transportRegistrationMaster.createOtherPropertyDetails(fields, files, docNames, ipAddress)
      );
    });
  } catch (err) {
    console.error(`Error while creating Property Details`, err.message);
    next(err);
  }
});
router.post("/savingOtherMedical", async function (req, res, next) {
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
        let equipmentImageName = `${data.agent_name}_${new Date().getTime()}_${equipmentImageObj.originalFilename}`;
        fs.renameSync(equipmentImageObj.filepath, path.join(form.uploadDir, equipmentImageName));
        docNames.equipmentImageName = equipmentImageName;
      }
      res.json(
        await transportRegistrationMaster.createOtherMedical(fields, files, docNames, ipAddress)
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
router.post("/savingOtherFood", async function (req, res, next) {
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
        let foodImg_name = `${data.sub_Name}_${new Date().getTime()}_${foodImg_obj.originalFilename
          }`;
        fs.renameSync(
          foodImg_obj.filepath,
          path.join(form.uploadDir, foodImg_name)
        );
        docNames.foodImg_name = foodImg_name;
      }
      res.json(await transportRegistrationMaster.createOtherFood(fields, files, docNames, ipAddress));
    });
  } catch (err) {
    console.error(`Error while creating Food Details`, err.message);
    next(err);
  }
});
/* POST create Transport Details  */

router.post("/savingTransportDetails", async function (req, res, next) {
  // console.log(req.body, "ss")
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
      let data = JSON.parse(fields.transport_details);
      if (files.upload_image1) {
        let upload_image1_Obj = JSON.parse(JSON.stringify(files)).upload_image1;
        let upload_image1_name = `${data.agent_name}_${new Date().getTime()}_${upload_image1_Obj.originalFilename
          }`;
        fs.renameSync(
          upload_image1_Obj.filepath,
          path.join(form.uploadDir, upload_image1_name)
        );
        docNames.upload_image1_name = upload_image1_name;
      }
      if (files.upload_image2) {
        let upload_image2_Obj = JSON.parse(JSON.stringify(files)).upload_image2;
        let upload_image2_name = `${data.agent_name}_${new Date().getTime()}_${upload_image2_Obj.originalFilename}`;
        fs.renameSync(upload_image2_Obj.filepath, path.join(form.uploadDir, upload_image2_name));
        docNames.upload_image2_name = upload_image2_name;
      }
      res.json(await transportRegistrationMaster.createTransportDetails(fields, docNames, ipAddress)
      );
    });
  } catch (err) {
    console.error(`Error while creating Transport Details`, err.message);
    next(err);
  }
});


router.get("/transportDetails/:account_id/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    console.log(req.params.account_id,req.params.agent_id,req.params.transport_sub_id);
    res.json(await transportRegistrationMaster.getTransportDetails(req.params.account_id,req.params.agent_id, req.params.transport_sub_id));

  } catch (err) {
    console.error(
      `Error while getting Add Travel Details Registration`,
      err.message
    );
    next(err);
  }
});


// router.put(
//   "/editTransportDetails/:agent_id/:transport_sub_id/:tnx_id",
//   async function (req, res, next) {
//     try {
//       res.json(
//         await transportRegistrationMaster.updateTransportDetails(
//           req.params.agent_id,
//           req.params.transport_sub_id,
//           req.params.tnx_id,
//           req.body
//         )
//       );
//     } catch (err) {
//       console.error(
//         `Error while updating Transport Details`,
//         err.message
//       );
//       next(err);
//     }
//   }
// );
router.put(
  "/editTransportDetails/:agent_id/:transport_sub_id/:tnx_id",
  async function (req, res, next) {
    console.log("error1");
    try {
      const form = new formidable.IncomingForm();
      formidable.keepExtensions = true;
      let transport_partner_documents_loc = dir.transport_partner_documents;
      form.uploadDir = transport_partner_documents_loc;
      if (!fs.existsSync(form.uploadDir)) {
        fs.mkdirSync(transport_partner_documents_loc, { recursive: true });
      }
       let docNames = {};
       form.parse(req, async (_, fields, files) => {
        let data = JSON.parse(fields.updatetransport_details);
        if (files.upload_image1) {
          let upload_image1_Obj = JSON.parse(JSON.stringify(files)).upload_image1;
          if (upload_image1_Obj) {
            let upload_image1_name = `${
              data.transport_sub_name
            }_${new Date().getTime()}_${upload_image1_Obj.originalFilename}`;
    
         
            fs.renameSync(
              upload_image1_Obj.filepath,
              path.join(form.uploadDir, upload_image1_name)
            );
  
             
            docNames.upload_image1_name = upload_image1_name;
          } else {
            docNames.upload_image1_name = data.upload_image1_name;
          }
        } else {
          docNames.upload_image1_name = data.upload_image;
        }
        // second image//
        if (files.upload_image2) {
          let upload_image2_Obj = JSON.parse(JSON.stringify(files)).upload_image2;
          if (upload_image2_Obj) {
            let upload_image2_name = `${
              data.transport_sub_name
            }_${new Date().getTime()}_${upload_image2_Obj.originalFilename}`;
    
         
            fs.renameSync(
              upload_image2_Obj.filepath,
              path.join(form.uploadDir, upload_image2_name)
            );
  
             
            docNames.upload_image2_name = upload_image2_name;
          } else {
            docNames.upload_image2_name = data.upload_image2_name;
          }
        } else {
          docNames.upload_image2_name = data.upload_image;
        }
        
        // if (files.upload_image2) {
        //   let upload_image2_Obj = JSON.parse(JSON.stringify(files)).upload_image1;
        //   if (upload_image2_Obj) {
        //     let upload_image2_name = `${
        //       data.transport_sub_name
        //     }_${new Date().getTime()}_${upload_image2_Obj.originalFilename}`;
        //     console.log("upload_image1_Obj",upload_image2_Obj);
        //     // fs.renameSync(
        //     //   upload_image2_Obj.filepath,
        //     //   path.join(form.uploadDir, upload_image2_name)
        //     // );
        //     docNames.upload_image2_name = upload_image2_name;
        //   } else {
        //     docNames.upload_image2_name = data.upload_image2_name;
        //   }
        // } else {
        //   docNames.upload_image2_name = data.upload_image;
        // }
       
      
      
       
  
       console.log("route", data, docNames);
        res.json(
       await transportRegistrationMaster.updateTransportDetails(
         data.agent_id,
         data.transport_sub_id,
         data.tnx_id,
          data,
          docNames,
          req.body

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
router.post("/accomodationsavingTransportDetails", async function (req, res, next) {
  // console.log(req.body, "ss")
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
      let data = JSON.parse(fields.transport_details);
      if (files.upload_image1) {
        let upload_image1_Obj = JSON.parse(JSON.stringify(files)).upload_image1;
        let upload_image1_name = `${data.agent_name}_${new Date().getTime()}_${upload_image1_Obj.originalFilename
          }`;
        fs.renameSync(
          upload_image1_Obj.filepath,
          path.join(form.uploadDir, upload_image1_name)
        );
        docNames.upload_image1_name = upload_image1_name;
      }
      if (files.upload_image2) {
        let upload_image2_Obj = JSON.parse(JSON.stringify(files)).upload_image2;
        let upload_image2_name = `${data.agent_name}_${new Date().getTime()}_${upload_image2_Obj.originalFilename}`;
        fs.renameSync(upload_image2_Obj.filepath, path.join(form.uploadDir, upload_image2_name));
        docNames.upload_image2_name = upload_image2_name;
      }
      if (files.upload_image3) {
        let upload_image3_Obj = JSON.parse(JSON.stringify(files)).upload_image3;
        let upload_image3_name = `${data.agent_name}_${new Date().getTime()}_${upload_image3_Obj.originalFilename}`;
        fs.renameSync(upload_image3_Obj.filepath, path.join(form.uploadDir, upload_image3_name));
        docNames.upload_image3_name = upload_image3_name;
      }
      res.json(await transportRegistrationMaster.createAccomodationTransportDetails(fields, docNames, ipAddress)
      );
    });
  } catch (err) {
    console.error(`Error while creating Transport Details`, err.message);
    next(err);
  }
});



router.get("/accomodationtransportDetails/:account_id/:partner_id/:partner_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.accomodationtransportDetails(req.params.account_id, req.params.partner_id, req.params.partner_sub_id));

  } catch (err) {
    console.error(
      `Error while getting Add Travel Details Registration`,
      err.message
    );
    next(err);
  }
});

router.put(
  "/editAccoTransportDetails/:agent_id/:transport_sub_id/:tnx_id",
  async function (req, res, next) {
    try {
      res.json(
        await transportRegistrationMaster.updateAccoTransportDetails(
          req.params.agent_id,
          req.params.transport_sub_id,
          req.params.tnx_id,
          req.body
        )
      );
    } catch (err) {
      console.error(
        `Error while updating Transport Details`,
        err.message
      );
      next(err);
    }
  }
);

router.post("/saveFoodTransportDetails", async function (req, res, next) {
  // console.log(req.body, "ss")
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
      let data = JSON.parse(fields.transport_details);
      if (files.upload_image1) {
        let upload_image1_Obj = JSON.parse(JSON.stringify(files)).upload_image1;
        let upload_image1_name = `${data.agent_name}_${new Date().getTime()}_${upload_image1_Obj.originalFilename
          }`;
        fs.renameSync(
          upload_image1_Obj.filepath,
          path.join(form.uploadDir, upload_image1_name)
        );
        docNames.upload_image1_name = upload_image1_name;
      }
      if (files.upload_image2) {
        let upload_image2_Obj = JSON.parse(JSON.stringify(files)).upload_image2;
        let upload_image2_name = `${data.agent_name}_${new Date().getTime()}_${upload_image2_Obj.originalFilename}`;
        fs.renameSync(upload_image2_Obj.filepath, path.join(form.uploadDir, upload_image2_name));
        docNames.upload_image2_name = upload_image2_name;
      }
      if (files.upload_image3) {
        let upload_image3_Obj = JSON.parse(JSON.stringify(files)).upload_image3;
        let upload_image3_name = `${data.agent_name}_${new Date().getTime()}_${upload_image3_Obj.originalFilename}`;
        fs.renameSync(upload_image3_Obj.filepath, path.join(form.uploadDir, upload_image3_name));
        docNames.upload_image3_name = upload_image3_name;
      }
      res.json(await transportRegistrationMaster.saveFoodTransportDetails(fields, docNames, ipAddress)
      );
    });
  } catch (err) {
    console.error(`Error while creating Transport Details`, err.message);
    next(err);
  }
});


router.get("/foodtransportDetails/:account_id/:agent_id/:agent_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.foodtransportDetails(req.params.account_id, req.params.agent_id, req.params.agent_sub_id));

  } catch (err) {
    console.error(
      `Error while getting Add Travel Details Registration`,
      err.message
    );
    next(err);
  }
});

router.put(
  "/editFoodTransportDetails/:agent_id/:transport_sub_id/:tnx_id",
  async function (req, res, next) {
    try {
      res.json(
        await transportRegistrationMaster.editFoodTransportDetails(
          req.params.agent_id,
          req.params.transport_sub_id,
          req.params.tnx_id,
          req.body
        )
      );
    } catch (err) {
      console.error(
        `Error while updating Transport Details`,
        err.message
      );
      next(err);
    }
  }
);


router.post("/saveMedicalTransportDetails", async function (req, res, next) {
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
      let data = JSON.parse(fields.transport_details);
      if (files.upload_image1) {
        let upload_image1_Obj = JSON.parse(JSON.stringify(files)).upload_image1;
        let upload_image1_name = `${data.agent_name}_${new Date().getTime()}_${upload_image1_Obj.originalFilename
          }`;
        fs.renameSync(
          upload_image1_Obj.filepath,
          path.join(form.uploadDir, upload_image1_name)
        );
        docNames.upload_image1_name = upload_image1_name;
      }
      if (files.upload_image2) {
        let upload_image2_Obj = JSON.parse(JSON.stringify(files)).upload_image2;
        let upload_image2_name = `${data.agent_name}_${new Date().getTime()}_${upload_image2_Obj.originalFilename}`;
        fs.renameSync(upload_image2_Obj.filepath, path.join(form.uploadDir, upload_image2_name));
        docNames.upload_image2_name = upload_image2_name;
      }
      res.json(await transportRegistrationMaster.saveMedicalTransportDetails(fields, docNames, ipAddress)
      );
    });
  } catch (err) {
    console.error(`Error while creating Transport Details`, err.message);
    next(err);
  }
});


router.get("/medicaltransportDetails/:account_id/:equipment_id/:equipment_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.medicaltransportDetails(req.params.account_id, req.params.equipment_id, req.params.equipment_sub_id));

  } catch (err) {
    console.error(
      `Error while getting Add Travel Details Registration`,
      err.message
    );
    next(err);
  }
});

router.put(
  "/editMedicalTransportDetails/:agent_id/:transport_sub_id/:tnx_id",
  async function (req, res, next) {
    try {
      res.json(
        await transportRegistrationMaster.editMedicalTransportDetails(
          req.params.agent_id,
          req.params.transport_sub_id,
          req.params.tnx_id,
          req.body
        )
      );
    } catch (err) {
      console.error(
        `Error while updating Transport Details`,
        err.message
      );
      next(err);
    }
  }
);
router.post("/savingTravelRestaurant", async function (req, res, next) {
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
      res.json(await transportRegistrationMaster.createTravelRestaurantDetails(fields, docNames, ipAddress)
      );
    });
  } catch (err) {
    console.error(`Error while creating travel restaurant Details`, err.message);
    next(err);
  }
});
router.get("/getTravelRestaurantDetails/:account_id/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.send(await transportRegistrationMaster.getTravelRestaurantDetails(req.params.account_id, req.params.agent_id, req.params.transport_sub_id));
  } catch (err) {
    console.error(`Error while getting Travel Restaurant Data `, err.message);
    next(err);
  }
}
);
router.put("/updateTravelRestaurantDetails/:txn_id", async function (req, res, next) {
  try {
    res.json(
      await transportRegistrationMaster.updateTravelRestaurantDetails(
        req.params.txn_id,
        req.body
      )
    );
  } catch (err) {
    console.error(`Error while updating Travel restaurant Data`, err.message);
    next(err);
  }
  
});
router.get("/transportOperationDetails/:account_id/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getTransportOperationDetails(req.params.account_id,req.params.agent_id,req.params.transport_sub_id));
  } catch (err) {
    console.error(
      `Error while getting Transport Item Details `,
      err.message
    );
    next(err);
    // console.log(req.params)
  }
});
router.get("/acctransportOperationDetails/:account_id/:partner_id/:partner_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getAccTransportOperationDetails(req.params.account_id,req.params.partner_id,req.params.partner_sub_id));
  } catch (err) {
    console.error(
      `Error while getting Transport Item Details `,
      err.message
    );
    next(err);
    // console.log(req.params)
  }
});
router.get("/FoodtransportOperationDetails/:account_id/:agent_id/:agent_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getFoodTransportOperationDetails(req.params.account_id,req.params.agent_id,req.params.agent_sub_id));
  } catch (err) {
    console.error(
      `Error while getting Transport Item Details `,
      err.message
    );
    next(err);
    // console.log(req.params)
  }
});
router.get("/MedicaltransportOperationDetails/:account_id/:equipment_id/:equipment_sub_id", async function (req, res, next) {
  try {
    res.json(await transportRegistrationMaster.getMedicaltransportOperationDetails(req.params.account_id,req.params.equipment_id,req.params.equipment_sub_id));
  } catch (err) {
    console.error(
      `Error while getting Transport Item Details `,
      err.message
    );
    next(err);
    // console.log(req.params)
  }
});
module.exports = router;
