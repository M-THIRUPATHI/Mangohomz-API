const express = require("express");
const router = express.Router();
const foodPartner = require("../services/foodPartnerReg.services");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const dir = require("../resources/filepath");
const { LOADIPHLPAPI } = require("dns");

//Get all food details

router.get(
  "/foodDetails/:agent_id/:agent_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.getFoodDetails(
         
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
router.get(
  "/getBookingFoodTypes/:txn_id/:agent_id/:agent_sub_id/:account_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.getBookingFoodTypes(
          req.params.txn_id,
          req.params.agent_id,
          req.params.agent_sub_id,
          req.params.account_id,
        )
      );
    } catch (err) {
      console.error(`Error while getting Food Item Details `, err.message);
      next(err);
    }
  }
);
router.get(
  "/addFoodItemDetails/:agent_id/:agent_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.addFoodItemDetails(
          req.params.agent_id,
          req.params.agent_sub_id,
          req.params.txn_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Food Item Details `, err.message);
      next(err);
    }
  }
);
router.get("/loadPartnerNames/:account_id", async function (req, res, next) {
  try {
    res.json(await foodPartner.loadPartnerNames(req.params.account_id));
  } catch (err) {
    console.error(`Error while getting Food Details `, err.message);
    next(err);
  }
});

router.get(
  "/loadSubPartnerNames/:account_id/:agent_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.loadSubPartnerNames(
          req.params.account_id,
          req.params.agent_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Food Details `, err.message);
      next(err);
    }
  }
);
router.get(
  "/loadaccfoodSubPartnerNames/:account_id/:partner_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.loadaccfoodSubPartnerNames(
          req.params.account_id,
          req.params.partner_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Food Details `, err.message);
      next(err);
    }
  }
);

router.get(
  "/loadEquipmentfoodSubpartnerNames/:account_id/:equipment_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.loadEquipmentfoodSubpartnerNames(
          req.params.account_id,
          req.params.equipment_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Food Details `, err.message);
      next(err);
    }
  }
);
router.get(
  "/mainFoodPartnerDetails/:account_id/:agent_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.getMainFoodPartnerDetails(
          req.params.account_id,
          req.params.agent_id,
          req.params.txn_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Food Details `, err.message);
      next(err);
    }
  }
);
router.get(
  "/foodTypeDetails/:account_id/:agent_id/:agent_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.getFoodTypeDetails(
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
router.get("/loadFoodPartnerData/:account_id", async function (req, res, next) {
  try {
    res.json(await foodPartner.loadFoodPartnerData(req.params.account_id));
  } catch (err) {
    console.error(`Error while getting Food Registration Master `, err.message);
    next(err);
  }
});

router.get("/getBookingFoodDetails/bookingDetails/:city_id", async function (req, res, next) {
  try {
    res.json(await foodPartner.getBookingFoodDetails(req.params.city_id));
  } catch (err) {
    console.error(`Error while getting Food Partner Details `, err.message);
    next(err);
  }
});
router.get(
  "/foodItemDetails/:account_id/:agent_id/:agent_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.getFoodItemDetails(
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
/* GET All  Food Registration Master. */
router.get("/:account_id", async function (req, res, next) {
  try {
    res.json(await foodPartner.getMultiple(req.params.account_id));
  } catch (err) {
    console.error(`Error while getting Food Registration Master `, err.message);
    next(err);
  }
});

router.get("/foodPartnersForAdmin/pendingPartners", async function (req, res, next) {
    try {
      res.json(await foodPartner.getFoodPartnersForAdmin()); 
    } catch (err) {
      console.error(
        `Error while getting Food Partners Data `,
        err.message
      );
      next(err);
    }
  }
);
router.get(
  "/foodDetailsForAdmin/:agent_id/:agent_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.getFoodDetailsForAdmin(
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

router.put("/approveFoodRegDetails/:agent_id/:agent_sub_id", async function (req, res, next) {
  try {
    res.json(await foodPartner.approveFoodRegDetails(req.params.agent_id,req.params.agent_sub_id,req.body));
  } catch (err) {
    console.error(`Error while Approving Food Data`, err.message);
     next(err);
  }
});
router.put("/approveRestaurantDetails/:txn_id/:agent_id/:agent_sub_id", async function (req, res, next) {
  try {
    res.json(await foodPartner.approveRestaurantDetails(req.params.txn_id,req.params.agent_id,req.params.agent_sub_id,req.body));
    // console.log("req.params",req.params);
  } catch (err) {
    console.error(`Error while Approving Food Data`, err.message);
    next(err);
  }
});
router.put("/approvefoodItemApprove/:item_txn_id/:txn_id/:agent_id/:agent_sub_id", async function (req, res, next) {
  try {
    res.json(await foodPartner.approvefoodItemApprove(req.params.item_txn_id,req.params.txn_id,req.params.agent_id,req.params.agent_sub_id,req.body));
    // console.log("req.params",req.params);
  } catch (err) {
    console.error(`Error while Approving Food Data`, err.message);
    next(err);
  }
});
router.put("/rejectFoodRegDetails/:agent_id/:agent_sub_id", async function (req, res, next) {
  try {
    res.json(await foodPartner.rejectFoodRegDetails(req.params.agent_id,req.params.agent_sub_id,req.body));
  } catch (err) {
    console.error(`Error while Rejecting Food Data`, err.message);
    next(err);
  }
});
router.put("/rejectRestaurantDetails/:txn_id/:agent_id/:agent_sub_id", async function (req, res, next) {
  // console.log("req.params",req.params);
  try {
    res.json(await foodPartner.rejectRestaurantDetails(req.params.txn_id,req.params.agent_id,req.params.agent_sub_id,req.body));
  } catch (err) {
    console.error(`Error while Approving Food Data`, err.message);
    next(err);
  }
});
router.put("/rejectfoodItemReject/:item_txn_id/:txn_id/:agent_id/:agent_sub_id", async function (req, res, next) {
  try {
    res.json(await foodPartner.rejectfoodItemReject(req.params.item_txn_id,req.params.txn_id,req.params.agent_id,req.params.agent_sub_id,req.body));
    // console.log("req.params",req.params);
  } catch (err) {
    console.error(`Error while Approving Food Data`, err.message);
    next(err);
  }
});
router.get("/getFoodPartnerRegApprovalStatus/adminApprovals/:status", async function (req, res) {
  try {
    res.json(await foodPartner.getFoodPartnerApproveData(req.params.status));
  } 
  catch (err) {
    console.error(
      `Error while loading Food Registration`,
      err.message
    );
    next(err);
  }
});
// GET EXISTING USER FOOD PARTNER
router.get(
  "/existingUserFoodPartner/:agent_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.getExistingUserFoodPartner(req.params.agent_id)
      );
    } catch (err) {
      console.error(
        `Error while getting Food Registration Master `,
        err.message 
      );
      next(err);
    }
  }
);
/* GET FOOD STATUS COUNT */
router.get(
  "/foodRegistrationMasterStatusCount",
  async function (req, res, next) {
    try {
      res.json(await foodPartner.getStatusCount());
    } catch (err) {
      console.error(
        `Error while getting Food Registration Master `,
        err.message
      );
      next(err);
    }
  }
);
router.get(
  "/getFoodDataOnStatus/:status/:account_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.getFoodDataOnStatus(
          req.params.status,
          req.params.account_id
        )
      );
    } catch (err) {
      console.error(
        `Error while getting Food Registration Master `,
        err.message
      );
      next(err);
    }
  }
);

/* GET single Food Registration Master. */
router.get("/:id", async function (req, res, next) {
  try {
    res.send(await foodPartner.getSingleParentTypeDetail(req.params.id));
  } catch (err) {
    console.error(`Error while getting Food Registration Master `, err.message);
    next(err);
  }
});
/* POST create a new Food Registration Master */
router.post("/", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let food_doc = dir.food_partner_documents;
    form.uploadDir = food_doc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.foodPartnerDetails);
      if (files.pan_card_file) {
        let panCardObj = JSON.parse(JSON.stringify(files)).pan_card_file;
        let panCardName = `${data.name}_${new Date().getTime()}_${
          panCardObj.originalFilename
        }`;
        fs.renameSync(
          panCardObj.filepath,
          path.join(form.uploadDir, panCardName)
        );
        docNames.panCardName = panCardName;
      }
      if (files.addhaar_no) {
        let addhaarObj = JSON.parse(JSON.stringify(files)).addhaar_no;
        let addhaarName = `${data.name}_${new Date().getTime()}_${
          addhaarObj.originalFilename
        }`;
        fs.renameSync(
          addhaarObj.filepath,
          path.join(form.uploadDir, addhaarName)
        );
        docNames.addhaarName = addhaarName;
      }
      if (files.gst_tin) {
        let gstInObj = JSON.parse(JSON.stringify(files)).gst_tin;
        let gstInName = `${data.name}_${new Date().getTime()}_${
          gstInObj.originalFilename
        }`;
        fs.renameSync(gstInObj.filepath, path.join(form.uploadDir, gstInName));
        docNames.gstInName = gstInName;
      }
      if (files.mh_agreement) {
        let mhAgreementObj = JSON.parse(JSON.stringify(files)).mh_agreement;
        let mhAgreementName = `${data.name}_${new Date().getTime()}_${
          mhAgreementObj.originalFilename
        }`;
        fs.renameSync(
          mhAgreementObj.filepath,
          path.join(form.uploadDir, mhAgreementName)
        );
        docNames.mhAgreementName = mhAgreementName;
      }
      if (files.mb_certificate) {
        let mbCertificateObj = JSON.parse(JSON.stringify(files)).mb_certificate;
        let mbCertificateName = `${data.name}_${new Date().getTime()}_${
          mbCertificateObj.originalFilename
        }`;
        fs.renameSync(
          mbCertificateObj.filepath,
          path.join(form.uploadDir, mbCertificateName)
        );
        docNames.mbCertificateName = mbCertificateName;
      }
      if (files.food_safety) {
        let foodSafetyObj = JSON.parse(JSON.stringify(files)).food_safety;
        let foodSafetyName = `${data.name}_${new Date().getTime()}_${
          foodSafetyObj.originalFilename
        }`;
        fs.renameSync(
          foodSafetyObj.filepath,
          path.join(form.uploadDir, foodSafetyName)
        );
        docNames.foodSafetyName = foodSafetyName;
      }

      if (files.food_tax) {
        let foodTaxObj = JSON.parse(JSON.stringify(files)).food_tax;
        let foodTaxName = `${data.name}_${new Date().getTime()}_${
          foodTaxObj.originalFilename
        }`;
        fs.renameSync(
          foodTaxObj.filepath,
          path.join(form.uploadDir, foodTaxName)
        );
        docNames.foodTaxName = foodTaxName;
      }

      if (files.file_upload5) {
        let cancelledCheckObj = JSON.parse(JSON.stringify(files)).file_upload5;
        let cancelledCheckName = `${data.name}_${new Date().getTime()}_${
          cancelledCheckObj.originalFilename
        }`;
        fs.renameSync(
          cancelledCheckObj.filepath,
          path.join(form.uploadDir, cancelledCheckName)
        );
        docNames.cancelledCheckName = cancelledCheckName;
      }

      if (data.agent_id == "") {
        res.json(await foodPartner.create(fields, files, docNames, ipAddress)); 
      } else {
        res.json(
          await foodPartner.FoodExistingUserCreate(fields, files, docNames,ipAddress)
        );
      }
    });
  } catch (err) {
    console.error(`Error while creating Food Registration Master`, err.message);
    next(err);
  }
});
router.post("/saveFoodRegDetails", async function (req, res, next) {
  try {
    res.json(await foodPartner.create(req.body));
  } catch (err) {
    console.error(`Error while creating Food Registration Master`, err.message);
    next(err);
  }
});
router.post("/ledgerFoodDetails", async function (req, res, next) {
  try {
    res.json(await foodPartner.ledgerFoodDetails(req.body));
  } catch (err) {
    console.error(`Error while updating the food status count`, err.message);
    next(err);
  }
});
router.post("/getMultipleFoodDetails", async function (req, res, next) {
  try {
    res.json(await foodPartner.getMultipleFoodDetails(req.body));
  } catch (err) {
    console.error(`Error while creating Food Registration Master`, err.message);
    next(err);
  }
});

// SAVING FOOD DETAILS
router.post("/savingFoodDetails", async function (req, res, next) {
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

      // console.log(JSON.parse(JSON.stringify(files)))

      if (files.food_image) {
        let foodImg_obj = JSON.parse(JSON.stringify(files)).food_image;
        let foodImg_name = `${data.foodPartner_sub_name}_${new Date().getTime()}_${
          foodImg_obj.originalFilename
        }`;
        fs.renameSync(
          foodImg_obj.filepath,
          path.join(form.uploadDir, foodImg_name)
        );
        docNames.foodImg_name = foodImg_name;
      }
      res.json(await foodPartner.createFoodDetails(fields, files, docNames, ipAddress));
    });
  } catch (err) {
    console.error(`Error while creating Food Details`, err.message);
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
        let foodImg_name = `${data.sub_Name}_${new Date().getTime()}_${
          foodImg_obj.originalFilename
        }`;
        fs.renameSync(
          foodImg_obj.filepath,
          path.join(form.uploadDir, foodImg_name)
        );
        docNames.foodImg_name = foodImg_name;
      }
      res.json(await foodPartner.createOtherFood(fields, files, docNames, ipAddress));
    });
  } catch (err) {
    console.error(`Error while creating Food Details`, err.message);
    next(err);
  }
});

// Updating FOOD DETAILS
router.put(
  "/fooditemdetailsUpdating/:item_txn_id/:agent_id/:agent_sub_id",
  async function (req, res, next) {
    try {
      const form = new formidable.IncomingForm();
      formidable.keepExtensions = true;
      let food_partner_documents_loc = dir.food_partner_documents;
      form.uploadDir = food_partner_documents_loc;
      if (!fs.existsSync(form.uploadDir)) {
        fs.mkdirSync(food_partner_documents_loc, { recursive: true });
      }
      let docNames = {};
      form.parse(req, async (_, fields, files) => {
        let data = JSON.parse(fields.updatefood_details);
       
        if (files.food_image) {
          let food_image_Obj = JSON.parse(JSON.stringify(files)).food_image;
          if (food_image_Obj) {
            let food_image_name = `${
              data.name_of_kitchen
            }${new Date().getTime()}${food_image_Obj.originalFilename}`;
            
            fs.renameSync(
              food_image_Obj.filepath,
              path.join(form.uploadDir,food_image_name)
             
            );
            docNames.food_image_name = food_image_name;
          } else {
            docNames.food_image_name = data.food_image_name;
          }
        } else {
          docNames.food_image_name = data.food_image;
        }
    
        try {
          const result = await foodPartner.fooditemdetailsUpdating(
            data.item_txn_id,
            data.agent_id,
            data.agent_sub_id,
            data,
            docNames,
            req.body
          );
          // console.log("route", data, docNames);
          res.json(result);
        } catch (err) {
          console.error(`Error while updating Food Registration:`, err.message);
          return next(err);
        }
      });
    } catch (err) {
      console.error(`Error while updating Food  Registration:`, err.message);
      next(err);
    }
  }
);
router.put(
  "/loadFoodStatus/:agent_id/:agent_sub_id/:txn_id/:item_txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.loadFoodStatus(
          req.params.agent_id,
          req.params.agent_sub_id,
          req.params.txn_id,
          req.params.item_txn_id,
          req.body
        )
      );
    } catch (err) {
      console.error(
        `"Error while updating the food details status Data`,
        err.message
      );
      next(err);
    }
  }
);
/* PUT Food Registration Master */
router.put(
  "/:user_id/:agent_id/:agent_sub_id/:name/:partner_sub_name",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.update(
          req.params.user_id,
          req.params.agent_id,
          req.params.agent_sub_id,
          req.params.name,
          req.params.partner_sub_name,
          req.body
        )
      );
    } catch (err) {
      console.error(
        `Error while updating Food Details Registration`,
        err.message
      );
      next(err);
    }
  }
);
/* DELETE  a Food Registration Master */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await foodPartner.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Food Registration Master`, err.message);
    next(err);
  }
});

/* POST create other Partner  a new Property Registration Master */
router.post("/savingOtherFoodPropertyDetails", async function (req, res, next) {
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
      res.json(await foodPartner.createOtherFoodPropertyDetails(fields, files, docNames, ipAddress)
      );
    });
  } catch (err) {
    console.error(`Error while creating Property Details`, err.message);
    next(err);
  }
});


router.post("/savingOtherFoodMedical", async function (req, res, next) {
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
        await foodPartner.createOtherFoodMedical(fields, files, docNames, ipAddress)
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


router.post("/savingOtherFoodPartner", async function (req, res, next) {
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
        res.json(await foodPartner.createOtherFoodTravelParter(fields, files, docNames, ipAddress));     
      
    });
  } catch (err) {
    console.error(
      `Error while creating Travel Details`,
      err.message
    );
    next(err);
  }
});


router.get("/loadPropertyData/:account_id/:agent_id/:agent_sub_id", async function (req, res, next) {
    try {
      res.send(await foodPartner.loadPropertyData(req.params.account_id, req.params.agent_id, req.params.agent_sub_id));
    } catch (err) {
      console.error(`Error while getting Property Data `, err.message);
      next(err);
    }
  }
);

router.get("/loadRoomsData/:account_id/:partner_id/:partner_sub_id/:txn_id",async function (req, res, next) {
  try {
    res.send(
      await foodPartner.loadRoomsData(req.params.account_id, req.params.partner_id, req.params.partner_sub_id, req.params.txn_id));
  } catch (err) {
    console.error(`Error while getting Rooms Data `, err.message);
    next(err);
  }
}
);
router.get("/loadMedicalEqpData/:account_id/:equipment_id/:equipment_sub_id", async function (req, res, next) {
  try {
    res.json(await foodPartner.loadMedicalEqpData(req.params.account_id, req.params.equipment_id, req.params.equipment_sub_id));
  } catch (err) {
    console.error(
      `Error while Loading the Equipment Partner Details`,
      err.message
    );
    next(err);
  }
});


router.get("/othertravelLocationDetails/:account_id/:agent_id/:transport_sub_id", async function (req, res, next) {
  try {
    res.json(await foodPartner.otherTravelLocation(req.params.account_id,req.params.agent_id,req.params.transport_sub_id));
  } catch (err) {
    console.error(
      `Error while getting Add Travel Details Registration`,
      err.message
    );
    next(err);
  }
});

router.put(
  "/updatingOtherTravelDetails/:txn_id/:agent_id/:transport_sub_id",
  async function (req, res, next) {

    try {
      res.json(
        await foodPartner.updateOtherTravelDetails(
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


router.put("/updateOtherPropertyData/:txn_id", async function (req, res, next) {
  try {
    res.json(
      await foodPartner.updateOtherPropertyData(
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
  "/updateOtherRoomsData/:txn_id/:partner_id/:partner_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.updateOtherRoomsData(
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

  
router.put("/updatingOtherEquipment/:equipment_id/:equipment_sub_id/:txn_id", async function (req, res, next) {
  try {
    res.json(await foodPartner.putOtherEquipmentDetails(req.params.equipment_id, req.params.equipment_sub_id, req.params.txn_id, req.body));
  } catch (err) {
    console.error(`Error while updating Equipment Details`, err.message);
    next(err);
  }
});



router.post("/savingOtherRoomDetails", async function (req, res, next) {
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
        let upload_room_image1_name = `${data.no_of_avail_rooms.no_of_avail_rooms}${new Date().getTime()}${
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
        let upload_room_image2_name = `${data.no_of_avail_rooms.no_of_avail_rooms}${new Date().getTime()}${
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
        let upload_room_image3_name = `${data.no_of_avail_rooms.no_of_avail_rooms}${new Date().getTime()}${
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
        let upload_room_image4_name = `${data.no_of_avail_rooms.no_of_avail_rooms}${new Date().getTime()}${
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
        let upload_room_image5_name = `${data.no_of_avail_rooms.no_of_avail_rooms}${new Date().getTime()}${
          upload_room_image5_Obj.originalFilename
        }`;
        fs.renameSync(
          upload_room_image5_Obj.filepath,
          path.join(form.uploadDir, upload_room_image5_name)
        );
        docNames.upload_room_image5_name = upload_room_image5_name;
      }
      res.json(await foodPartner.createOtherRoomDetails(fields,files,docNames,ipAddress));
    });
  } catch (err) {
    console.error(`Error while creating room details`, err.message);
    next(err);
  }
});
router.post("/foodRestaurantDetailsSaving", async function (req, res, next) {
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
      // console.log("fields", fields)
      // console.log("files", files)
      let data = JSON.parse(fields.restaurant_details);
      // console.log("data", data)
       
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
      res.json(await foodPartner.createFoodRestaurantDetails(fields, docNames, ipAddress)
      );
    });
  } catch (err) {
    console.error(`Error while creating restaurant Details`, err.message);
    next(err);
  }
});
router.get("/getFoodRestaurantDetails/:agent_id/:agent_sub_id", async function (req, res, next) {
  try {
    res.send(await foodPartner.getFoodRestaurantDetails( req.params.agent_id, req.params.agent_sub_id));
  } catch (err) {
    console.error(`Error while getting Restaurant Data `, err.message); 
    next(err);
  }
}
);
router.get("/getFoodRestaurantDetailsadmin/:txn_id/:agent_id/:agent_sub_id", async function (req, res, next) {
  try {
    res.send(await foodPartner.getFoodRestaurantDetailsadmin(req.params.txn_id,req.params.agent_id, req.params.agent_sub_id));
    // console.log("req.params",req.params)
  } catch (err) {
    console.error(`Error while getting Restaurant Data `, err.message);
    next(err);
  }
}
);
router.put("/updateFoodRestaurant/:txn_id", async function (req, res, next) {
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let food_partner_documents_loc = dir.food_partner_documents;
    form.uploadDir = food_partner_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(food_partner_documents_loc, { recursive: true });
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.updateresturant_details);
      // console.log("dataaaaaa",data);
      if (files.upload_Image) {
        let upload_Image_Obj = JSON.parse(JSON.stringify(files)).upload_Image;
        if (upload_Image_Obj) {
          let upload_Image_name = `${
            data.name_of_kitchen
          }${new Date().getTime()}${upload_Image_Obj.originalFilename}`;
          
          fs.renameSync(
            upload_Image_Obj.filepath,
            path.join(form.uploadDir, upload_Image_name)
           
          );
          docNames.upload_Image_name = upload_Image_name;
        } else {
          docNames.upload_Image_name = data.upload_Image_name;
        }
      } else {
        docNames.upload_Image_name = data.upload_image;
      }
      //second image//
      if (files.upload_Image1) {
        let upload_Image1_Obj = JSON.parse(JSON.stringify(files)).upload_Image1;
        if (upload_Image1_Obj) {
          let upload_Image1_name = `${
            data.name_of_kitchen
          }${new Date().getTime()}${upload_Image1_Obj.originalFilename}`;
  
       
          fs.renameSync(
            upload_Image1_Obj.filepath,
            path.join(form.uploadDir, upload_Image1_name)
          );

          docNames.upload_Image1_name = upload_Image1_name;
        } else {
          docNames.upload_Image1_name = data.upload_Image1_name;
        }
      } else {
        docNames.upload_Image1_name = data.upload_image1;
      }
       //third image//
       if (files.upload_Image2) {
        let upload_Image2_Obj = JSON.parse(JSON.stringify(files)).upload_Image2;
        if (upload_Image2_Obj) {
          let upload_Image2_name = `${
            data.name_of_kitchen
          }${new Date().getTime()}${upload_Image2_Obj.originalFilename}`;
  
      
          fs.renameSync(
            upload_Image2_Obj.filepath,
            path.join(form.uploadDir, upload_Image2_name)
          );

           
          docNames.upload_Image2_name = upload_Image2_name;
        } else {
          docNames.upload_Image2_name = data.upload_Image2_name;
        }
      } else {
        docNames.upload_Image2_name = data.upload_image2;
      }

      // console.log("route", data);

      // console.log("route123", docNames);


    res.json(
      await foodPartner.updateFoodRestaurant(
        data.txn_id,
        data,
        docNames,
        req.body
      )
    );
  });
  } catch (err) {
    console.error(`Error while updating restaurant Data`, err.message);
    next(err);
  }
});
router.get(
  "/getTravelSubPartnerNames/:account_id/:agent_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartner.getTravelSubPartnerNames(
          req.params.account_id,
          req.params.agent_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Travel Food Details `, err.message);
      next(err);
    }
  }
);
module.exports = router;
