const express = require("express");
const router = express.Router();
const foodPartnerAccomodation = require("../services/foodPartnerAccomodation.services");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const dir = require("../resources/filepath");
const { LOADIPHLPAPI } = require("dns");

/* GET All  Food Registration Master. */
router.get("/FoodPartnerDetails", async function (req, res, next) {
  try {
    res.json(await foodPartnerAccomodation.getFoodMultiple());
  } catch (err) {
    console.error(`Error while getting Food Registration Master `, err.message);
    next(err);
  }
});

//Get all food details
router.get(
  "/foodDetails/:agent_id/:agent_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartnerAccomodation.getFoodDetails(
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

// GET EXISTING USER FOOD PARTNER
router.get(
  "/existingUserFoodPartner/:agent_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartnerAccomodation.getExistingUserFoodPartner(
          req.params.agent_id
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
/* GET FOOD STATUS COUNT */
router.get(
  "/foodRegistrationMasterStatusCount",
  async function (req, res, next) {
    try {
      res.json(await foodPartnerAccomodation.getStatusCount());
    } catch (err) {
      console.error(
        `Error while getting Food Registration Master `,
        err.message
      );
      next(err);
    }
  }
);
// router.get("/getFoodDataOnStatus/:status", async function (req, res, next) {
//   try {
//     res.json(
//       await foodPartnerAccomodation.getFoodDataOnStatus(req.params.status)
//     );
//   } catch (err) {
//     console.error(`Error while getting Food Registration Master `, err.message);
//     next(err);
//   }
// });
router.get("/loadPartnerNames", async function (req, res, next) {
  try {
    res.json(await foodPartnerAccomodation.loadPartnerNames());
  } catch (err) {
    console.error(`Error while getting Food Details `, err.message);
    next(err);
  }
});
router.get(
  "/loadSubPartnerNames/:agent_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartnerAccomodation.loadSubPartnerNames(
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
  "/mainFoodPartnerDetails/:agent_id/:agent_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartnerAccomodation.getMainFoodPartnerDetails(
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
/* GET single Food Registration Master. */
router.get("/:id", async function (req, res, next) {
  try {
    res.send(
      await foodPartnerAccomodation.getSingleParentTypeDetail(req.params.id)
    );
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
     res.json(await foodPartnerAccomodation.create(fields, files, docNames, ipAddress));     
    });
  } catch (err) {
    console.error(`Error while creating Food Registration Master`, err.message);
    next(err);
  }
});
router.post("/saveFoodRegDetails", async function (req, res, next) {
  try {
    res.json(await foodPartnerAccomodation.create(req.body));
  } catch (err) {
    console.error(`Error while creating Food Registration Master`, err.message);
    next(err);
  }
});
router.post("/getMultipleFoodDetails", async function (req, res, next) {
  try {
    res.json(await foodPartnerAccomodation.getMultipleFoodDetails(req.body));
  } catch (err) {
    console.error(`Error while creating Food Registration Master`, err.message);
    next(err);
  }
});
router.post("/ledgerFoodDetails", async function (req, res, next) {
  try {
    res.json(await foodPartnerAccomodation.ledgerFoodDetails(req.body));
  } catch (err) {
    console.error(`Error while updating the food status count`, err.message);
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
      res.json(
        await foodPartnerAccomodation.createFoodDetails(fields, files, docNames, ipAddress)
      );
    });
  } catch (err) {
    console.error(`Error while creating Food Details`, err.message);
    next(err);
  }
});
/* PUT Food Registration Master */
// router.put(
//   "/:user_id/:agent_id/:agent_sub_id/:agent_name/:agent_sub_name/:status",
//   async function (req, res, next) {
//     try {
//       res.json(
//         await foodPartnerAccomodation.updateDetails(
//           req.params.user_id,
//           req.params.agent_id,
//           req.params.agent_sub_id,
//           req.params.agent_name,
//           req.params.agent_sub_name,
//           req.params.status,
//           req.body
//         )
//       );
//     } catch (err) {
//       console.error(
//         `Error while updating Food Registration Master`,
//         err.message
//       );
//       next(err);
//     }
//   }
// );


router.put(
  "/updateFoodPartnerMaster/:agent_id/:agent_sub_id/:agent_name/:agent_sub_name/:status",
  async function (req, res, next) {
    try {
      const form = new formidable.IncomingForm();
      formidable.keepExtensions = true;
      let food_doc = dir.food_partner_documents;
      form.uploadDir = food_doc;
      if (!fs.existsSync(form.uploadDir)) {
        fs.mkdirSync(form.uploadDir);
      }
      let docNames = {};
      const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      });

      let data = JSON.parse(fields.updateFoodMaster);
      if (files.pancard) {
        let panCardObj = JSON.parse(JSON.stringify(files)).pancard;
        if (panCardObj) {
          let panCardName = `${data.name}_${new Date().getTime()}_${
            panCardObj.originalFilename
          }`;
          fs.renameSync(
            panCardObj.filepath,
            path.join(form.uploadDir, panCardName)
          );
          docNames.panCardName = panCardName;
        } else {
          docNames.panCardName = data.panCardName;
        }
      } else {
        docNames.panCardName = data.pan_card_upt;
      }
      if (files.addhaar) {
        let addhaarObj = JSON.parse(JSON.stringify(files)).addhaar;
        if (addhaarObj) {
          let addhaarName = `${data.name}_${new Date().getTime()}_${
            addhaarObj.originalFilename
          }`;
          fs.renameSync(
            addhaarObj.filepath,
            path.join(form.uploadDir, addhaarName)
          );
          docNames.addhaarName = addhaarName;
        } else {
          docNames.addhaarName = data.addhaarName;
        }
      } else {
        docNames.addhaarName = data.addhaar_no_upt;
      }
      if (files.gst_tin) {
        let gstInObj = JSON.parse(JSON.stringify(files)).gst_tin;
        if (gstInObj) {
          let gstInName = `${data.name}_${new Date().getTime()}_${
            gstInObj.originalFilename
          }`;
          fs.renameSync(
            gstInObj.filepath,
            path.join(form.uploadDir, gstInName)
          );
          docNames.gstInName = gstInName;
        } else {
          docNames.gstInName = data.gstInName;
        }
      } else {
        docNames.gstInName = data.gst_tin_upt;
      }
      if (files.mh_agreement) {
        let mhAgreementObj = JSON.parse(JSON.stringify(files)).mh_agreement;
        if (mhAgreementObj) {
          let mhAgreementName = `${data.name}_${new Date().getTime()}_${
            mhAgreementObj.originalFilename
          }`;
          fs.renameSync(
            mhAgreementObj.filepath,
            path.join(form.uploadDir, mhAgreementName)
          );
          docNames.mhAgreementName = mhAgreementName;
        } else {
          docNames.mhAgreementName = data.mhAgreementName;
        }
      } else {
        docNames.mhAgreementName = data.mh_agreement_upt;
      }
      if (files.mb_certificate) {
        let mbCertificateObj = JSON.parse(JSON.stringify(files)).mb_certificate;
        if (mbCertificateObj) {
          let mbCertificateName = `${data.name}_${new Date().getTime()}_${
            mbCertificateObj.originalFilename
          }`;
          fs.renameSync(
            mbCertificateObj.filepath,
            path.join(form.uploadDir, mbCertificateName)
          );
          docNames.mbCertificateName = mbCertificateName;
        } else {
          docNames.mbCertificateName = data.mbCertificateName;
        }
      } else {
        docNames.mbCertificateName = data.mb_certificate_upt;
      }

      if (files.food_tax) {
        let propertyTaxObj = JSON.parse(JSON.stringify(files)).food_tax;
        if (propertyTaxObj) {
          let propertyTaxName = `${data.name}_${new Date().getTime()}_${
            propertyTaxObj.originalFilename
          }`;
          fs.renameSync(
            propertyTaxObj.filepath,
            path.join(form.uploadDir, propertyTaxName)
          );
          docNames.propertyTaxName = propertyTaxName;
        } else {
          docNames.propertyTaxName = data.propertyTaxName;
        }
      } else {
        docNames.propertyTaxName = data.property_tax_upt;
      }
      if (files.food_safety) {
        let fireSafetyObj = JSON.parse(JSON.stringify(files)).food_safety;
        if (fireSafetyObj) {
          let fireSafetyName = `${data.name}_${new Date().getTime()}_${
            fireSafetyObj.originalFilename
          }`;
          fs.renameSync(
            fireSafetyObj.filepath,
            path.join(form.uploadDir, fireSafetyName)
          );
          docNames.fireSafetyName = fireSafetyName;
        } else {
          docNames.fireSafetyName = data.fireSafetyName;
        }
      } else {
        docNames.fireSafetyName = data.fire_safety_upt;
      }
      if (files.cancelled_cheque) {
        let cancelledChequeObj = JSON.parse(
          JSON.stringify(files)
        ).cancelled_cheque;
        if (cancelledChequeObj) {
          let cancelledChequeName = `${data.name}_${new Date().getTime()}_${
            cancelledChequeObj.originalFilename
          }`;
          fs.renameSync(
            cancelledChequeObj.filepath,
            path.join(form.uploadDir, cancelledChequeName)
          );
          docNames.cancelledChequeName = cancelledChequeName;
        } else {
          docNames.cancelledChequeName = data.cancelledChequeName;
        }
      } else {
        docNames.cancelledChequeName = data.cancelled_cheque_upt;
      }

      // Rest of the code...
      // Update the following line
      const result = await foodPartnerAccomodation.updateFoodMasterForm(
        data.agent_id,
        data.agent_sub_id,
        data.agent_name,
        data.agent_sub_name,
        data.status,
        docNames,
        data
      );
      console.log("docs", docNames);
      res.json(result);
    } catch (err) {
      console.error(`Error while updating Food Data`, err.message);
      next(err);
    }
  }
);



router.put(
  "/updatingFoodDetails/:txn_id/:agent_id/:agent_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartnerAccomodation.updateFoodDetails(
          req.params.txn_id,
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
router.put(
  "/loadFoodStatus/:agent_id/:agent_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await foodPartnerAccomodation.loadFoodStatus(
          req.params.agent_id,
          req.params.agent_sub_id,
          req.params.txn_id,
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
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await foodPartnerAccomodation.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Food Registration Master`, err.message);
    next(err);
  }
});
/* DELETE  a Food Registration Master */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await foodPartnerAccomodation.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Food Registration Master`, err.message);
    next(err);
  }
});
router.get(
  "/getFoodAllDisplayForStaff/:status", 
  async function (req, res, next) {
    try {
      res.json(
        await foodPartnerAccomodation.getFoodAllDisplayForStaff( 
          req.params.status
        )
      );
    } catch (err) {
      console.error(
        `Error while getting Food Registration  Master `,
        err.message
      );
      next(err);
    }
  }
);

module.exports = router;
