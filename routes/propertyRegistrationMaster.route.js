const express = require("express");
const router = express.Router();
const propertyRegistrationMaster = require("../services/propertyRegistrationMaster.services");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const dir = require("../resources/filepath");
/* GET All  Property Registration Master. */
router.get("/:account_id", async function (req, res, next) {
  try {
    res.json(
      await propertyRegistrationMaster.getMultiple(req.params.account_id)
    );
  } catch (err) {
    console.error(
      `Error while getting Property Registration Master `,
      err.message
    );
    next(err);
  }
});

router.get("/PropertyRegMaster/master", async function (req, res, next) {
  try {
    res.json(await propertyRegistrationMaster.getpropertyReg());
  } catch (err) {
    console.error(
      `Error while getting Property Registration Master `,
      err.message
    );
    next(err);
  }
});
router.get(
  "/existingUserProperty/:partner_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.existingUserProperty(
          req.params.partner_id
        )
      );
    } catch (err) {
      console.error(
        `Error while getting Property Registration Master `,
        err.message
      );
      next(err);
    }
  }
);
router.get(
  "/propertyRegistrationMasterStatusCount",
  async function (req, res, next) {
    try {
      res.json(await propertyRegistrationMaster.getStatusCount());
    } catch (err) {
      console.error(
        `Error while getting Property Registration Master `,
        err.message
      );
      next(err);
    }
  }
);

router.get(
  "/getPropertyDataOnStatus/:status/:account_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.getPropertyDataOnStatus(
          req.params.status,
          req.params.account_id
        )
      );
    } catch (err) {
      console.error(
        `Error while getting Property Registration Master `,
        err.message
      );
      next(err);
    }
  }
);
/* GET single Property Registration Master. */
router.get("/:id", async function (req, res, next) {
  try {
    res.send(
      await propertyRegistrationMaster.getSingleParentTypeDetail(req.params.id)
    );
  } catch (err) {
    console.error(
      `Error while getting Property Registration Master `,
      err.message
    );
    next(err);
  }
});
router.get(
  "/getPropertyData/:account_id/:partner_id/:partner_sub_id",
  async function (req, res, next) {
    try {
      res.send(
        await propertyRegistrationMaster.getPropertyData(
          req.params.account_id,
          req.params.partner_id,
          req.params.partner_sub_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Property Data `, err.message);
      next(err);
    }
  }
);

router.get(
  "/getPropertyDataForAdmin/:account_id/:partner_id/:partner_sub_id",
  async function (req, res, next) {
    try {
      res.send(
        await propertyRegistrationMaster.getPropertyDataForAdmin(
          req.params.account_id,
          req.params.partner_id,
          req.params.partner_sub_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Property Data `, err.message);
      next(err);
    }
  }
);
router.get(
  "/getRoomsData/:account_id/:partner_id/:partner_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.send(
        await propertyRegistrationMaster.getRoomsData(
          req.params.account_id,
          req.params.partner_id,
          req.params.partner_sub_id,
          req.params.txn_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Rooms Data `, err.message);
      next(err);
    }
  }
);
router.get(
  "/getRoomsDataForAdmin/:account_id/:partner_id/:partner_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.send(
        await propertyRegistrationMaster.getRoomsDataForAdmin(
          req.params.account_id,
          req.params.partner_id,
          req.params.partner_sub_id,
          req.params.txn_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Rooms Data `, err.message);
      next(err);
    }
  }
);
/* POST create a new Property Registration Master */
router.post("/", async function (req, res, next) {
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
      let data = JSON.parse(fields.propertyPartnerDetails);
      if (files.pancard) {
        let panCardObj = JSON.parse(JSON.stringify(files)).pancard;
        let panCardName = `${data.name}_${new Date().getTime()}_${
          panCardObj.originalFilename
        }`;
        fs.renameSync(
          panCardObj.filepath,
          path.join(form.uploadDir, panCardName)
        );
        docNames.panCardName = panCardName;
      }
      if (files.addhaar) {
        let addhaarObj = JSON.parse(JSON.stringify(files)).addhaar;
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
      //  if (files.partner_pic) {
      //   let  partnerPicObj = JSON.parse(JSON.stringify(files)).partner_pic;
      //   let partnerPicName =  `${data.name}_${new Date().getTime()}_${partnerPicObj.originalFilename}`;
      //     fs.renameSync( partnerPicObj.filepath,path.join(form.uploadDir,partnerPicName));
      //    docNames.partnerPicName = partnerPicName;
      //  }
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
      if (files.property_tax) {
        let propertyTaxObj = JSON.parse(JSON.stringify(files)).property_tax;
        let propertyTaxName = `${data.name}_${new Date().getTime()}_${
          propertyTaxObj.originalFilename
        }`;
        fs.renameSync(
          propertyTaxObj.filepath,
          path.join(form.uploadDir, propertyTaxName)
        );
        docNames.propertyTaxName = propertyTaxName;
      }
      if (files.fire_safety) {
        let fireSafetyObj = JSON.parse(JSON.stringify(files)).fire_safety;
        let fireSafetyName = `${data.name}_${new Date().getTime()}_${
          fireSafetyObj.originalFilename
        }`;
        fs.renameSync(
          fireSafetyObj.filepath,
          path.join(form.uploadDir, fireSafetyName)
        );
        docNames.fireSafetyName = fireSafetyName;
      }
      if (files.cancelled_cheque) {
        let cancelledChequeObj = JSON.parse(
          JSON.stringify(files)
        ).cancelled_cheque;
        let cancelledChequeName = `${data.name}_${new Date().getTime()}_${
          cancelledChequeObj.originalFilename
        }`;
        fs.renameSync(
          cancelledChequeObj.filepath,
          path.join(form.uploadDir, cancelledChequeName)
        );
        docNames.cancelledChequeName = cancelledChequeName;
      }
      if (data.partner_id == "") {
        res.json(
          await propertyRegistrationMaster.create(
            fields,
            files,
            docNames,
            ipAddress
          )
        );
      } else {
        res.json(
          await propertyRegistrationMaster.exsistingUserCreate(
            fields,
            files,
            docNames,
            ipAddress
          )
        );
      }
    });
  } catch (err) {
    console.error(
      `Error while creating Property Registration Master`,
      err.message
    );
    next(err);
  }
});

/* POST create a new Property Registration Master */
router.post("/savingPropertyDetails", async function (req, res, next) {
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
      if (files.cancelled_cheque) {
        let cancelledChequeObj = JSON.parse(
          JSON.stringify(files)
        ).cancelled_cheque;
        let cancelledChequeName = `${
          data.property_name.property_name
        }_${new Date().getTime()}_${cancelledChequeObj.originalFilename}`;
        fs.renameSync(
          cancelledChequeObj.filepath,
          path.join(form.uploadDir, cancelledChequeName)
        );
        docNames.cancelledChequeName = cancelledChequeName;
      }

      if (files.mh_agreement) {
        let mhagreementObj = JSON.parse(JSON.stringify(files)).mh_agreement;
        let mhagreementName = `${
          data.property_name.property_name
        }_${new Date().getTime()}_${mhagreementObj.originalFilename}`;
        fs.renameSync(
          mhagreementObj.filepath,
          path.join(form.uploadDir, mhagreementName)
        );
        docNames.mhagreementName = mhagreementName;
      }
      if (files.mh_declaration) {
        let declarationObj = JSON.parse(JSON.stringify(files)).mh_declaration;
        let declarationName = `${
          data.property_name.property_name
        }_${new Date().getTime()}_${declarationObj.originalFilename}`;
        fs.renameSync(
          declarationObj.filepath,
          path.join(form.uploadDir, declarationName)
        );
        docNames.declarationName = declarationName;
      }
      if (files.mh_bankmandate) {
        let bankmandateObj = JSON.parse(JSON.stringify(files)).mh_bankmandate;
        let bankmandateName = `${
          data.property_name.property_name
        }_${new Date().getTime()}_${bankmandateObj.originalFilename}`;
        fs.renameSync(
          bankmandateObj.filepath,
          path.join(form.uploadDir, bankmandateName)
        );
        docNames.bankmandateName = bankmandateName;
      }
      if (files.gst_tin) {
        let gst_tinObj = JSON.parse(JSON.stringify(files)).gst_tin;
        let gst_tinName = `${
          data.property_name.property_name
        }_${new Date().getTime()}_${gst_tinObj.originalFilename}`;
        fs.renameSync(
          gst_tinObj.filepath,
          path.join(form.uploadDir, gst_tinName)
        );
        docNames.gst_tinName = gst_tinName;
      }
      res.json(
        await propertyRegistrationMaster.createPropertyDetails(
          fields,
          files,
          docNames,
          ipAddress
        )
      );
    });
  } catch (err) {
    console.error(`Error while creating Property Details`, err.message);
    next(err);
  }
});
/* POST create a new Property Registration Master */
router.post("/savingRoomDetails", async function (req, res, next) {
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
      let data = JSON.parse(fields.room_details);

      if (files.upload_gst_image) {
        let upload_gst_image1_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_gst_image;
        let upload_gst_image1_name = `${
          data.no_of_avail_rooms
        }_${new Date().getTime()}_${upload_gst_image1_Obj.originalFilename}`;
        fs.renameSync(
          upload_gst_image1_Obj.filepath,
          path.join(form.uploadDir, upload_gst_image1_name)
        );
        docNames.upload_gst_image1_name = upload_gst_image1_name;
      }
      if (files.upload_room_image1) {
        let upload_room_image1_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_room_image1;
        let upload_room_image1_name = `${
          data.no_of_avail_rooms
        }_${new Date().getTime()}_${upload_room_image1_Obj.originalFilename}`;
        fs.renameSync(
          upload_room_image1_Obj.filepath,
          path.join(form.uploadDir, upload_room_image1_name)
        );
        docNames.upload_room_image1_name = upload_room_image1_name;
      }
      if (files.upload_room_image2) {
        let upload_room_image2_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_room_image2;
        let upload_room_image2_name = `${
          data.no_of_avail_rooms
        }_${new Date().getTime()}_${upload_room_image2_Obj.originalFilename}`;
        fs.renameSync(
          upload_room_image2_Obj.filepath,
          path.join(form.uploadDir, upload_room_image2_name)
        );
        docNames.upload_room_image2_name = upload_room_image2_name;
      }
      if (files.upload_room_image3) {
        let upload_room_image3_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_room_image3;
        let upload_room_image3_name = `${
          data.no_of_avail_rooms
        }_${new Date().getTime()}_${upload_room_image3_Obj.originalFilename}`;
        fs.renameSync(
          upload_room_image3_Obj.filepath,
          path.join(form.uploadDir, upload_room_image3_name)
        );
        docNames.upload_room_image3_name = upload_room_image3_name;
      }
      if (files.upload_room_image4) {
        let upload_room_image4_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_room_image4;
        let upload_room_image4_name = `${
          data.no_of_avail_rooms
        }_${new Date().getTime()}_${upload_room_image4_Obj.originalFilename}`;
        fs.renameSync(
          upload_room_image4_Obj.filepath,
          path.join(form.uploadDir, upload_room_image4_name)
        );
        docNames.upload_room_image4_name = upload_room_image4_name;
      }
      if (files.upload_room_image5) {
        let upload_room_image5_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_room_image5;
        let upload_room_image5_name = `${
          data.no_of_avail_rooms
        }_${new Date().getTime()}_${upload_room_image5_Obj.originalFilename}`;
        fs.renameSync(
          upload_room_image5_Obj.filepath,
          path.join(form.uploadDir, upload_room_image5_name)
        );
        docNames.upload_room_image5_name = upload_room_image5_name;
      }
      // console.log("LLL", docNames)

      res.json(
        await propertyRegistrationMaster.createRoomDetails(
          fields,
          files,
          docNames,
          ipAddress
        )
      );
    });
  } catch (err) {
    console.error(`Error while creating room details`, err.message);
    next(err);
  }
});

router.post("/savePropertyRegDetails", async function (req, res, next) {
  try {
    res.json(await propertyRegistrationMaster.create(req.body));
  } catch (err) {
    console.error(
      `Error while creating Property Registration Master`,
      err.message
    );
    next(err);
  }
});
router.post("/getMultiplePropertyDetails", async function (req, res, next) {
  try {
    res.json(
      await propertyRegistrationMaster.getMultiplePropertyDetails(req.body)
    );
  } catch (err) {
    console.error(
      `Error while creating Property Registration Master`,
      err.message
    );
    next(err);
  }
});
// router.post("/saveRoomStatusData", async function (req, res, next) {
//   try {
//     res.json(
//       await propertyRegistrationMaster.saveRoomStatusData(req.body)
//     );
//   } catch (err) {
//     console.error(
//       `Error while Saving Room Status Data`,
//       err.message
//     );
//     next(err);
//   }
// });
/* PUT Property Registration Master */
router.put(
  "/:account_id/:partner_id/:partner_sub_id/:name/:partner_sub_name",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.update(
          req.params.account_id,
          req.params.partner_id,
          req.params.partner_sub_id,
          req.params.name,
          req.params.partner_sub_name,
          req.body
        )
      );
    } catch (err) {
      console.error(
        `Error while updating Property Registration Master`,
        err.message
      );
      next(err);
    }
  }
);
router.put("/updatePropertyData/:txn_id", async function (req, res, next) {
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
      let data = JSON.parse(fields.updateproperty_details);
      if (files.upload_image1) {
        let upload_image1_Obj = JSON.parse(JSON.stringify(files)).upload_image1;
        if (upload_image1_Obj) {
          let upload_image1_name = `${
            data.property_name
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
      if (files.upload_image2) {
        let upload_image2_Obj = JSON.parse(JSON.stringify(files)).upload_image2;
        if (upload_image2_Obj) {
          let upload_image2_name = `${
            data.property_name
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
        docNames.upload_image2_name = data.upload_image1;
      }
      if (files.upload_image3) {
        let upload_image3_Obj = JSON.parse(JSON.stringify(files)).upload_image3;
        if (upload_image3_Obj) {
          let upload_image3_name = `${
            data.property_name
          }_${new Date().getTime()}_${upload_image3_Obj.originalFilename}`;
          fs.renameSync(
            upload_image3_Obj.filepath,
            path.join(form.uploadDir, upload_image3_name)
          );
          docNames.upload_image3_name = upload_image3_name;
        } else {
          docNames.upload_image3_name = data.upload_image3_name;
        }
      } else {
        docNames.upload_image3_name = data.upload_image2;
      }
      if (files.upload_image4) {
        let upload_image4_Obj = JSON.parse(JSON.stringify(files)).upload_image4;
        if (upload_image4_Obj) {
          let upload_image4_name = `${
            data.property_name
          }_${new Date().getTime()}_${upload_image4_Obj.originalFilename}`;
          fs.renameSync(
            upload_image4_Obj.filepath,
            path.join(form.uploadDir, upload_image4_name)
          );
          docNames.upload_image4_name = upload_image4_name;
        } else {
          docNames.upload_image4_name = data.upload_image4_name;
        }
      } else {
        docNames.upload_image4_name = data.upload_image3;
      }
      if (files.upload_image5) {
        let upload_image5_Obj = JSON.parse(JSON.stringify(files)).upload_image5;
        if (upload_image5_Obj) {
          let upload_image5_name = `${
            data.property_name
          }_${new Date().getTime()}_${upload_image5_Obj.originalFilename}`;
          fs.renameSync(
            upload_image5_Obj.filepath,
            path.join(form.uploadDir, upload_image5_name)
          );
          docNames.upload_image5_name = upload_image5_name;
        } else {
          docNames.upload_image5_name = data.upload_image5_name;
        }
      } else {
        docNames.upload_image5_name = data.upload_image4;
      }

      //console.log("route", data, docNames);
      res.json(
        await propertyRegistrationMaster.updatePropertyData(
          data.txn_id,
          data,
          docNames
        )
      );
    });
  } catch (err) {
    console.error(`Error while updating Property Data`, err.message);
    next(err);
  }
});
router.put(
  "/updateRoomsData/:txn_id/:partner_id/:partner_sub_id",
  async function (req, res, next) {
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
        let data = JSON.parse(fields.updateroom_details);

        if (files.upload_room_image1) {
          let upload_room_image1_Obj = JSON.parse(
            JSON.stringify(files)
          ).upload_room_image1;
          if (upload_room_image1_Obj) {
            let upload_room_image1_name = `${
              data.sub_property_name
            }_${new Date().getTime()}_${
              upload_room_image1_Obj.originalFilename
            }`;
            fs.renameSync(
              upload_room_image1_Obj.filepath,
              path.join(form.uploadDir, upload_room_image1_name)
            );
            docNames.upload_room_image1_name = upload_room_image1_name;
          } else {
            docNames.upload_room_image1_name = data.upload_room_image1_name;
          }
        } else {
          docNames.upload_room_image1_name = data.room_image_1;
        }
        if (files.upload_room_image2) {
          let upload_room_image2_Obj = JSON.parse(
            JSON.stringify(files)
          ).upload_room_image2;
          if (upload_room_image2_Obj) {
            let upload_room_image2_name = `${
              data.sub_property_name
            }_${new Date().getTime()}_${
              upload_room_image2_Obj.originalFilename
            }`;
            fs.renameSync(
              upload_room_image2_Obj.filepath,
              path.join(form.uploadDir, upload_room_image2_name)
            );
            docNames.upload_room_image2_name = upload_room_image2_name;
          } else {
            docNames.upload_room_image2_name = data.upload_room_image2_name;
          }
        } else {
          docNames.upload_room_image2_name = data.room_image_2;
        }
        if (files.upload_room_image3) {
          let upload_room_image3_Obj = JSON.parse(
            JSON.stringify(files)
          ).upload_room_image3;
          if (upload_room_image3_Obj) {
            let upload_room_image3_name = `${
              data.sub_property_name
            }_${new Date().getTime()}_${
              upload_room_image3_Obj.originalFilename
            }`;
            fs.renameSync(
              upload_room_image3_Obj.filepath,
              path.join(form.uploadDir, upload_room_image3_name)
            );
            docNames.upload_room_image3_name = upload_room_image3_name;
          } else {
            docNames.upload_room_image3_name = data.upload_room_image3_name;
          }
        } else {
          docNames.upload_room_image3_name = data.room_image_3;
        }
        if (files.upload_room_image4) {
          let upload_room_image4_Obj = JSON.parse(
            JSON.stringify(files)
          ).upload_room_image4;
          if (upload_room_image4_Obj) {
            let upload_room_image4_name = `${
              data.sub_property_name
            }_${new Date().getTime()}_${
              upload_room_image4_Obj.originalFilename
            }`;
            fs.renameSync(
              upload_room_image4_Obj.filepath,
              path.join(form.uploadDir, upload_room_image4_name)
            );
            docNames.upload_room_image4_name = upload_room_image4_name;
          } else {
            docNames.upload_room_image4_name = data.upload_room_image4_name;
          }
        } else {
          docNames.upload_room_image4_name = data.room_image_4;
        }
        if (files.upload_room_image5) {
          let upload_room_image5_Obj = JSON.parse(
            JSON.stringify(files)
          ).upload_room_image5;
          if (upload_room_image5_Obj) {
            let upload_room_image5_name = `${
              data.sub_property_name
            }_${new Date().getTime()}_${
              upload_room_image5_Obj.originalFilename
            }`;
            fs.renameSync(
              upload_room_image5_Obj.filepath,
              path.join(form.uploadDir, upload_room_image5_name)
            );
            docNames.upload_room_image5_name = upload_room_image5_name;
          } else {
            docNames.upload_room_image5_name = data.upload_room_image5_name;
          }
        } else {
          docNames.upload_room_image5_name = data.room_image_5;
        }
        // console.log("roomupdate",data,docNames)
        res.json(
          await propertyRegistrationMaster.updateRoomsData(
            data.txn_id,
            data.partner_id,
            data.partner_sub_id,
            data,
            docNames
          )
        );
      });
    } catch (err) {
      console.error(`Error while updating Property Data`, err.message);
      next(err);
    }
  }
);
router.put(
  "/updateRoomStatus/:account_id/:partner_id/:partner_sub_id/:property_txn_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.updateRoomStatus(
          req.params.account_id,
          req.params.partner_id,
          req.params.partner_sub_id,
          req.params.property_txn_id,
          req.params.txn_id,
          req.body
        )
      );
    } catch (err) {
      console.error(`Error while updating Property Data`, err.message);
      next(err);
    }
  }
);
router.get("/gethotels/:account_id", async function (req, res, next) {
  try {
    res.json(
      await propertyRegistrationMaster.gethotelData(req.params.account_id)
    );
  } catch (err) {
    console.error(`Error while getting Hotel Data `, err.message);
    next(err);
  }
});
router.get(
  "/getHotelInfo/:account_id/:property_txn_id/:partner_id/:partner_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.getHotelInfo(
          req.params.account_id,
          req.params.property_txn_id,
          req.params.partner_id,
          req.params.partner_sub_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Hotels Details `, err.message);
      next(err);
    }
  }
);
router.get(
  "/getfoodHotelInfo/:account_id/:property_txn_id/:agent_id/:agent_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.getfoodHotelInfo(
          req.params.account_id,
          req.params.property_txn_id,
          req.params.agent_id,
          req.params.agent_sub_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Hotels Details `, err.message);
      next(err);
    }
  }
);

router.get(
  "/gettravelHotelInfo/:account_id/:property_txn_id/:partner_id/:partner_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.gettravelHotelInfo(
          req.params.account_id,
          req.params.property_txn_id,
          req.params.partner_id,
          req.params.partner_sub_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Hotels Details `, err.message);
      next(err);
    }
  }
);

router.get(
  "/getmedicalHotelInfo/:account_id/:property_txn_id/:partner_id/:partner_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.getmedicalHotelInfo(
          req.params.account_id,
          req.params.property_txn_id,
          req.params.partner_id,
          req.params.partner_sub_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Hotels Details `, err.message);
      next(err);
    }
  }
);
router.get(
  "/getAllRoomAvailCountDates/:account_id/:partner_id/:partner_sub_id/:property_txn_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.getAllRoomAvailCountDates(
          req.params.account_id,
          req.params.partner_id,
          req.params.partner_sub_id,
          req.params.property_txn_id,
          req.params.txn_id
        )
      );
    } catch (err) {
      console.error(
        `Error while getting Room Availability Details `,
        err.message
      );
      next(err);
    }
  }
);
router.put(
  "/approveAccPartnersData/:partner_id/:partner_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.approveAccPartnersData(
          req.params.partner_id,
          req.params.partner_sub_id,
          req.body
        )
      );
    } catch (err) {
      console.error(`Error while Approving Property Data`, err.message);
      next(err);
    }
  }
);

router.put(
  "/approveAccPropertyData/:partner_id/:partner_sub_id/:txn_id",
  async function (req, res, next) {
    //  console.log("routes",req.params)
    try {
      res.json(
        await propertyRegistrationMaster.approveAccPropertyData(
          req.params.partner_id,
          req.params.partner_sub_id,
          req.params.txn_id,

          req.body
        )
      );
    } catch (err) {
      console.error(`Error while Approving Property Data`, err.message);
      next(err);
    }
  }
);
router.put(
  "/rejectAccPartnersData/:partner_id/:partner_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.rejectAccPartnersData(
          req.params.partner_id,
          req.params.partner_sub_id,
          req.body
        )
      );
    } catch (err) {
      console.error(`Error while Approving Property Data`, err.message);
      next(err);
    }
  }
);

router.put(
  "/approveAccRoomData/:partner_id/:partner_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.approveAccRoomData(
          req.params.partner_id,
          req.params.partner_sub_id,
          req.params.txn_id,

          req.body
        )
      );
    } catch (err) {
      console.error(`Error while Approving Room Data`, err.message);
      next(err);
    }
  }
);

router.put(
  "/rejectAccRoomData/:partner_id/:partner_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.rejectAccRoomData(
          req.params.partner_id,
          req.params.partner_sub_id,
          req.params.txn_id,
          req.body
        )
      );
    } catch (err) {
      console.error(`Error while Approving Room Data`, err.message);
      next(err);
    }
  }
);

router.get(
  "/getDateAvailability/:account_id/:property_txn_id/:partner_id/:partner_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.getDateAvailability(
          req.params.account_id,
          req.params.property_txn_id,
          req.params.partner_id,
          req.params.partner_sub_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Hotels Details `, err.message);
      next(err);
    }
  }
);
router.get("/getHotelsNames/:account_id", async function (req, res, next) {
  try {
    res.json(
      await propertyRegistrationMaster.getHotelsNames(req.params.account_id)
    );
  } catch (err) {
    console.error(`Error while getting Hotels Details `, err.message);
    next(err);
  }
});
/* DELETE  a Property Registration Master */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await propertyRegistrationMaster.remove(req.params.id));
  } catch (err) {
    console.error(
      `Error while deleting Property Registration Master`,
      err.message
    );
    next(err);
  }
});

router.post("/roomAvailability", async function (req, res, next) {
  try {
    res.json(await propertyRegistrationMaster.saveRoomAvailData(req.body));
  } catch (err) {
    console.error(`Error while Saving Room Availability Dates`, err.message);
    next(err);
  }
});
//other partners saving
router.post("/savingTravelPartner", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
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
        let vehicleImageName = `${data.agent_name}_${new Date().getTime()}_${
          vehicleImageObj.originalFilename
        }`;
        fs.renameSync(
          vehicleImageObj.filepath,
          path.join(form.uploadDir, vehicleImageName)
        );
        docNames.vehicleImageName = vehicleImageName;
      }
      res.json(
        await propertyRegistrationMaster.createTravelDetails(
          fields,
          files,
          docNames,
          ipAddress
        )
      );
    });
  } catch (err) {
    console.error(`Error while creating Travel Details`, err.message);
    next(err);
  }
});
router.post("/accFoodsaving", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
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
      // console.log("route",data)
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
        await propertyRegistrationMaster.createAccFood(
          fields,
          files,
          docNames,
          ipAddress
        )
      );
    });
  } catch (err) {
    console.error(`Error while creating Food Details`, err.message);
    next(err);
  }
});
router.post("/medicalAccSaving", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
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
      // console.log(data)
      if (files.equipment_image) {
        let equipmentImageObj = JSON.parse(
          JSON.stringify(files)
        ).equipment_image;
        let equipmentImageName = `${data.agent_name}_${new Date().getTime()}_${
          equipmentImageObj.originalFilename
        }`;
        fs.renameSync(
          equipmentImageObj.filepath,
          path.join(form.uploadDir, equipmentImageName)
        );
        docNames.equipmentImageName = equipmentImageName;
      }
      res.json(
        await propertyRegistrationMaster.createAccMedical(
          fields,
          files,
          docNames,
          ipAddress
        )
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
router.get(
  "/getAccFoodDetails/:account_id/:agent_id/:agent_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.getAccFoodDetails(
          req.params.account_id,
          req.params.agent_id,
          req.params.agent_sub_id,
          req.params.txn_id
        )
      );
      // console.log("rote",req.params);
    } catch (err) {
      console.error(`Error while getting Food Details `, err.message);
      next(err);
    }
  }
);
router.put(
  "/accFoodUpdating/:item_txn_id/:agent_id/:agent_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.accFoodUpdate(
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
router.get(
  "/loadAccTravel/:account_id/:agent_id/:transport_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.loadAccTravel(
          req.params.account_id,
          req.params.agent_id,
          req.params.transport_sub_id
        )
      );
    } catch (err) {
      console.error(
        `Error while getting Add Travel Details Registration`,
        err.message
      );
      next(err);
    }
  }
);
router.put(
  "/accTravelUpdating/:txn_id/:agent_id/:transport_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.accTravelUpdating(
          req.params.txn_id,
          req.params.agent_id,
          req.params.transport_sub_id,
          req.body
        )
      );
    } catch (err) {
      console.error(`Error while updating Transport Registration`, err.message);
      next(err);
    }
  }
);
router.get(
  "/getAccMedical/:account_id/:equipment_id/:equipment_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.getAccMedical(
          req.params.account_id,
          req.params.equipment_id,
          req.params.equipment_sub_id
        )
      );
    } catch (err) {
      console.error(
        `Error while getting Add Equipment Details Registration`,
        err.message
      );
      next(err);
    }
  }
);
router.put(
  "/accUpdatingmedical/:equipment_id/:equipment_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.accUpdatingmedical(
          req.params.equipment_id,
          req.params.equipment_sub_id,
          req.params.txn_id,
          req.body
        )
      );
    } catch (err) {
      console.error(`Error while updating Equipment Details`, err.message);
      next(err);
    }
  }
);
router.get("/getaccomodationdetails/acc", async function (req, res, next) {
  try {
    res.json(await propertyRegistrationMaster.getaccomodationdetails());
  } catch (err) {
    console.error(`Error while getting Hotels Details `, err.message);
    next(err);
  }
});
/* POST create a new Restaurant Registration Master */
router.post("/savingRestaurantDetails", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
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
        let upload_fssai_name = `${
          data.name_of_kitchen
        }_${new Date().getTime()}_${files.upload_fssai.originalFilename}`;
        fs.renameSync(
          upload_fssai.filepath,
          path.join(form.uploadDir, upload_fssai_name)
        );
        docNames.upload_fssai_name = upload_fssai_name;
      }
      if (files.upload_image1) {
        let upload_image1 = JSON.parse(JSON.stringify(files)).upload_image1;
        let upload_image1_name = `${
          data.name_of_kitchen
        }_${new Date().getTime()}_${files.upload_image1.originalFilename}`;
        fs.renameSync(
          upload_image1.filepath,
          path.join(form.uploadDir, upload_image1_name)
        );
        docNames.upload_image1_name = upload_image1_name;
      }
      if (files.upload_image2) {
        let upload_image2 = JSON.parse(JSON.stringify(files)).upload_image2;
        let upload_image2_name = `${
          data.name_of_kitchen
        }_${new Date().getTime()}_${files.upload_image2.originalFilename}`;
        fs.renameSync(
          upload_image2.filepath,
          path.join(form.uploadDir, upload_image2_name)
        );
        docNames.upload_image2_name = upload_image2_name;
      }
      if (files.upload_image3) {
        let upload_image3 = JSON.parse(JSON.stringify(files)).upload_image3;
        let upload_image3_name = `${
          data.name_of_kitchen
        }_${new Date().getTime()}_${files.upload_image3.originalFilename}`;
        fs.renameSync(
          upload_image3.filepath,
          path.join(form.uploadDir, upload_image3_name)
        );
        docNames.upload_image3_name = upload_image3_name;
      }

      // console.log("LLL", docNames)
      res.json(
        await propertyRegistrationMaster.createRestaurantDetails(
          fields,
          docNames,
          ipAddress
        )
      );
    });
  } catch (err) {
    console.error(`Error while creating restaurant Details`, err.message);
    next(err);
  }
});
router.get(
  "/getRestaurantDetails/:account_id/:agent_id/:agent_sub_id",
  async function (req, res, next) {
    try {
      res.send(
        await propertyRegistrationMaster.getRestaurantDetails(
          req.params.account_id,
          req.params.agent_id,
          req.params.agent_sub_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Restaurant Data `, err.message);
      next(err);
    }
  }
);
router.put("/updateRestaurantDetails/:txn_id", async function (req, res, next) {
  try {
    res.json(
      await propertyRegistrationMaster.updateRestaurantDetails(
        req.params.txn_id,
        req.body
      )
    );
  } catch (err) {
    console.error(`Error while updating restaurant Data`, err.message);
    next(err);
  }
});
// save method for update room details//
// router.post("/updateRoomdataSaving", async function (req, res, next) {
//   let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
//   try {
//     const form = new formidable.IncomingForm();

//     form.parse(req, async (_, fields, files) => {
//     let data = JSON.parse(fields.editedRoomItem);

//     console.log("LLL", data);

//       res.json(await propertyRegistrationMaster.updateRoomdataSaving(fields, ipAddress)
//       );
//     });
//   } catch (err) {
//     console.error(`Error while reach us Details`, err.message);
//     next(err);
//   }
// });
router.get("/getupdateroomDetails/:txn_id", async function (req, res, next) {
  try {
    res.send(
      await propertyRegistrationMaster.getupdateroomDetails(
        req.params.txn_id,
        req.body
      )
    );
  } catch (err) {
    console.error(`Error while getting Property Data `, err.message);
    next(err);
  }
  // console.log("route")
});
router.put(
  "/updatePropertyoperationroomDetails/:txn_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.updatePropertyoperationroomDetails(
          req.params.txn_id,
          req.body
        )
      );
    } catch (err) {
      console.error(`Error while updating Property Data`, err.message);
      next(err);
    }
  }
);
router.get(
  "/getroomsavailabilitiespricestable/:payload",
  async function (req, res, next) {
    try {
      res.send(
        await propertyRegistrationMaster.getroomsavailabilitiespricestable(
          req.params
        )
      );
    } catch (err) {
      console.error(
        `Error while getting rooms availabilities prices table `,
        err.message
      );
      next(err);
    }
    //console.log("routes",req.params);
  }
);
router.put(
  "/updateRoomPriceAndAvaliability/:room_id",
  async function (req, res, next) {
    try {
      res.json(
        await propertyRegistrationMaster.updateRoomPriceAndAvaliabilityData(
          req.params.room_id,
          req.body
        )
      );
      // console.log("req.body",req.params,req.body)
    } catch (err) {
      console.error(
        `Error while updating Price and Avaliability Data`,
        err.message
      );
      next(err);
    }
  }
);
router.post("/updatingFoodPriceForm", async function (req, res, next) {
  try {
    res.json(await propertyRegistrationMaster.updatingFoodPriceForm(req.body));
  } catch (err) {
    console.error(`Error while submitting the Food Update Data`, err.message);
    next(err);
  }
});

router.post("/savingAccomadationDetails", async function (req, res, next) {
  //console.log('rk')
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let partner_visits_documents_loc = dir.partner_visits_documents;
    form.uploadDir = partner_visits_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.accomadation_details);
      let ratesData = JSON.parse(fields.accomadation_rates);
      //console.log(ratesData)
      //  console.log('rk',data)
      //console.log('rk', files)

      if (files.upload_pan_card) {
        let upload_pan_card_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_pan_card;
        let upload_pan_card_name = `${
          data.propertyName
        }_${new Date().getTime()}_${upload_pan_card_Obj.originalFilename}`;
        fs.renameSync(
          upload_pan_card_Obj.filepath,
          path.join(form.uploadDir, upload_pan_card_name)
        );
        docNames.upload_pan_card_name = upload_pan_card_name;
      }
      if (files.upload_gst) {
        let upload_gst_Obj = JSON.parse(JSON.stringify(files)).upload_gst;
        let upload_gst_name = `${data.propertyName}_${new Date().getTime()}_${
          upload_gst_Obj.originalFilename
        }`;
        fs.renameSync(
          upload_gst_Obj.filepath,
          path.join(form.uploadDir, upload_gst_name)
        );
        docNames.upload_gst_name = upload_gst_name;
      }
      if (files.upload_cancel_cheque) {
        let upload_cancel_cheque_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_cancel_cheque;
        let upload_cancel_cheque_name = `${
          data.propertyName
        }_${new Date().getTime()}_${upload_cancel_cheque_Obj.originalFilename}`;
        fs.renameSync(
          upload_cancel_cheque_Obj.filepath,
          path.join(form.uploadDir, upload_cancel_cheque_name)
        );
        docNames.upload_cancel_cheque_name = upload_cancel_cheque_name;
      }
      if (files.upload_facade) {
        let upload_facade_Obj = JSON.parse(JSON.stringify(files)).upload_facade;
        let upload_facade_name = `${
          data.propertyName
        }_${new Date().getTime()}_${upload_facade_Obj.originalFilename}`;
        fs.renameSync(
          upload_facade_Obj.filepath,
          path.join(form.uploadDir, upload_facade_name)
        );
        docNames.upload_facade_name = upload_facade_name;
      }
      if (files.upload_facade2) {
        let upload_facade2_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_facade2;
        let upload_facade2_name = `${
          data.propertyName
        }_${new Date().getTime()}_${upload_facade2_Obj.originalFilename}`;
        fs.renameSync(
          upload_facade2_Obj.filepath,
          path.join(form.uploadDir, upload_facade2_name)
        );
        docNames.upload_facade2_name = upload_facade2_name;
      }
      if (files.upload_lobby1) {
        let upload_lobby1_Obj = JSON.parse(JSON.stringify(files)).upload_lobby1;
        let upload_lobby1_name = `${
          data.propertyName
        }_${new Date().getTime()}_${upload_lobby1_Obj.originalFilename}`;
        fs.renameSync(
          upload_lobby1_Obj.filepath,
          path.join(form.uploadDir, upload_lobby1_name)
        );
        docNames.upload_lobby1_name = upload_lobby1_name;
      }
      if (files.upload_lobby2) {
        let upload_lobby2_Obj = JSON.parse(JSON.stringify(files)).upload_lobby2;
        let upload_lobby2_name = `${
          data.propertyName
        }_${new Date().getTime()}_${upload_lobby2_Obj.originalFilename}`;
        fs.renameSync(
          upload_lobby2_Obj.filepath,
          path.join(form.uploadDir, upload_lobby2_name)
        );
        docNames.upload_lobby2_name = upload_lobby2_name;
      }
      if (files.upload_restaurant) {
        let uploadRestaurantObj = JSON.parse(
          JSON.stringify(files)
        ).upload_restaurant;
        let upload_restaurant_name = `${
          data.propertyName
        }_${new Date().getTime()}_${uploadRestaurantObj.originalFilename}`;
        fs.renameSync(
          uploadRestaurantObj.filepath,
          path.join(form.uploadDir, upload_restaurant_name)
        );
        docNames.upload_restaurant_name = upload_restaurant_name;
      }

      if (files.upload_self_kitchen) {
        let uploadSelfKitchenObj = JSON.parse(
          JSON.stringify(files)
        ).upload_self_kitchen;
        let upload_self_kitchen_name = `${
          data.propertyName
        }_${new Date().getTime()}_${uploadSelfKitchenObj.originalFilename}`;
        fs.renameSync(
          uploadSelfKitchenObj.filepath,
          path.join(form.uploadDir, upload_self_kitchen_name)
        );
        docNames.upload_self_kitchen_name = upload_self_kitchen_name;
      }

      if (files.upload_room1) {
        let uploadRoom1Obj = JSON.parse(JSON.stringify(files)).upload_room1;
        let room1_name = `${data.propertyName}_${new Date().getTime()}_${
          uploadRoom1Obj.originalFilename
        }`;
        fs.renameSync(
          uploadRoom1Obj.filepath,
          path.join(form.uploadDir, room1_name)
        );
        docNames.room1_name = room1_name;
      }

      if (files.upload_room1Bathroom) {
        let uploadRoom1BathroomObj = JSON.parse(
          JSON.stringify(files)
        ).upload_room1Bathroom;
        let upload_room1_bathroom_name = `${
          data.propertyName
        }_${new Date().getTime()}_${uploadRoom1BathroomObj.originalFilename}`;
        fs.renameSync(
          uploadRoom1BathroomObj.filepath,
          path.join(form.uploadDir, upload_room1_bathroom_name)
        );
        docNames.upload_room1_bathroom_name = upload_room1_bathroom_name;
      }

      if (files.upload_room2) {
        let uploadRoom2Obj = JSON.parse(JSON.stringify(files)).upload_room2;
        let room2_name = `${data.propertyName}_${new Date().getTime()}_${
          uploadRoom2Obj.originalFilename
        }`;
        fs.renameSync(
          uploadRoom2Obj.filepath,
          path.join(form.uploadDir, room2_name)
        );
        docNames.room2_name = room2_name;
      }

      if (files.upload_room2Bathroom) {
        let uploadRoom2BathroomObj = JSON.parse(
          JSON.stringify(files)
        ).upload_room2Bathroom;
        let upload_room2_bathroom_name = `${
          data.propertyName
        }_${new Date().getTime()}_${uploadRoom2BathroomObj.originalFilename}`;
        fs.renameSync(
          uploadRoom2BathroomObj.filepath,
          path.join(form.uploadDir, upload_room2_bathroom_name)
        );
        docNames.upload_room2_bathroom_name = upload_room2_bathroom_name;
      }

      if (files.upload_room3) {
        let uploadRoom3Obj = JSON.parse(JSON.stringify(files)).upload_room3;
        let room3_name = `${data.propertyName}_${new Date().getTime()}_${
          uploadRoom3Obj.originalFilename
        }`;
        fs.renameSync(
          uploadRoom3Obj.filepath,
          path.join(form.uploadDir, room3_name)
        );
        docNames.room3_name = room3_name;
      }

      if (files.upload_room3Bathroom) {
        let uploadRoom3BathroomObj = JSON.parse(
          JSON.stringify(files)
        ).upload_room3Bathroom;
        let upload_room3_bathroom_name = `${
          data.propertyName
        }_${new Date().getTime()}_${uploadRoom3BathroomObj.originalFilename}`;
        fs.renameSync(
          uploadRoom3BathroomObj.filepath,
          path.join(form.uploadDir, upload_room3_bathroom_name)
        );
        docNames.upload_room3_bathroom_name = upload_room3_bathroom_name;
      }

      res.json(
        await propertyRegistrationMaster.createAccomadationVisitDetails(
          fields,
          files,
          docNames,
          ipAddress
        )
      );
    });
  } catch (err) {
    console.error(
      `Error while creating Accomadation Partner Visit Details`,
      err.message
    );
    next(err);
  }
});

router.post("/savingTravelVisitDetails", async function (req, res, next) {
  //console.log('rk')
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let partner_visits_documents_loc = dir.partner_visits_documents;
    form.uploadDir = partner_visits_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.travel_visit_details);
      // console.log('rk',data)
      //console.log('rk', files)

      if (files.upload_pan_card) {
        let upload_pan_card_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_pan_card;
        let upload_pan_card_name = `${
          data.propertyName
        }_${new Date().getTime()}_${upload_pan_card_Obj.originalFilename}`;
        fs.renameSync(
          upload_pan_card_Obj.filepath,
          path.join(form.uploadDir, upload_pan_card_name)
        );
        docNames.upload_pan_card_name = upload_pan_card_name;
      }
      if (files.upload_gst) {
        let upload_gst_Obj = JSON.parse(JSON.stringify(files)).upload_gst;
        let upload_gst_name = `${data.propertyName}_${new Date().getTime()}_${
          upload_gst_Obj.originalFilename
        }`;
        fs.renameSync(
          upload_gst_Obj.filepath,
          path.join(form.uploadDir, upload_gst_name)
        );
        docNames.upload_gst_name = upload_gst_name;
      }
      if (files.upload_cancel_cheque) {
        let upload_cancel_cheque_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_cancel_cheque;
        let upload_cancel_cheque_name = `${
          data.propertyName
        }_${new Date().getTime()}_${upload_cancel_cheque_Obj.originalFilename}`;
        fs.renameSync(
          upload_cancel_cheque_Obj.filepath,
          path.join(form.uploadDir, upload_cancel_cheque_name)
        );
        docNames.upload_cancel_cheque_name = upload_cancel_cheque_name;
      }

      res.json(
        await propertyRegistrationMaster.createTravelVisitDetails(
          fields,
          files,
          docNames,
          ipAddress
        )
      );
    });
  } catch (err) {
    console.error(
      `Error while creating Accomadation Partner Visit Details`,
      err.message
    );
    next(err);
  }
});

router.post("/savingFoodVisitDetails", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let partner_visits_documents_loc = dir.partner_visits_documents;
    form.uploadDir = partner_visits_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.food_visit_details);

      if (files.upload_pan_card) {
        let upload_pan_card_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_pan_card;
        let upload_pan_card_name = `${
          data.restaurantName
        }_${new Date().getTime()}_${upload_pan_card_Obj.originalFilename}`;
        fs.renameSync(
          upload_pan_card_Obj.filepath,
          path.join(form.uploadDir, upload_pan_card_name)
        );
        docNames.upload_pan_card_name = upload_pan_card_name;
      }
      if (files.upload_gst) {
        let upload_gst_Obj = JSON.parse(JSON.stringify(files)).upload_gst;
        let upload_gst_name = `${data.restaurantName}_${new Date().getTime()}_${
          upload_gst_Obj.originalFilename
        }`;
        fs.renameSync(
          upload_gst_Obj.filepath,
          path.join(form.uploadDir, upload_gst_name)
        );
        docNames.upload_gst_name = upload_gst_name;
      }
      if (files.upload_cancel_cheque) {
        let upload_cancel_cheque_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_cancel_cheque;
        let upload_cancel_cheque_name = `${
          data.restaurantName
        }_${new Date().getTime()}_${upload_cancel_cheque_Obj.originalFilename}`;
        fs.renameSync(
          upload_cancel_cheque_Obj.filepath,
          path.join(form.uploadDir, upload_cancel_cheque_name)
        );
        docNames.upload_cancel_cheque_name = upload_cancel_cheque_name;
      }
      if (files.upload_fssai_certificate) {
        let upload_fssai_certificate_obj = JSON.parse(
          JSON.stringify(files)
        ).upload_fssai_certificate;
        let upload_fssai_certificate_name = `${
          data.restaurantName
        }_${new Date().getTime()}_${
          upload_fssai_certificate_obj.originalFilename
        }`;
        fs.renameSync(
          upload_fssai_certificate_obj.filepath,
          path.join(form.uploadDir, upload_fssai_certificate_name)
        );
        docNames.upload_fssai_certificate_name = upload_fssai_certificate_name;
      }
      if (files.upload_restaurant1) {
        let upload_restaurant1_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_restaurant1;
        let upload_restaurant1_name = `${
          data.restaurantName
        }_${new Date().getTime()}_${upload_restaurant1_Obj.originalFilename}`;
        fs.renameSync(
          upload_restaurant1_Obj.filepath,
          path.join(form.uploadDir, upload_restaurant1_name)
        );
        docNames.upload_restaurant1_name = upload_restaurant1_name;
      }

      if (files.upload_restaurant2) {
        let upload_restaurant2_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_restaurant2;
        let upload_restaurant2_name = `${
          data.restaurantName
        }_${new Date().getTime()}_${upload_restaurant2_Obj.originalFilename}`;
        fs.renameSync(
          upload_restaurant2_Obj.filepath,
          path.join(form.uploadDir, upload_restaurant2_name)
        );
        docNames.upload_restaurant2_name = upload_restaurant2_name;
      }

      if (files.upload_restaurant3) {
        let upload_restaurant3_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_restaurant3;
        let upload_restaurant3_name = `${
          data.restaurantName
        }_${new Date().getTime()}_${upload_restaurant3_Obj.originalFilename}`;
        fs.renameSync(
          upload_restaurant3_Obj.filepath,
          path.join(form.uploadDir, upload_restaurant3_name)
        );
        docNames.upload_restaurant3_name = upload_restaurant3_name;
      }

      if (files.upload_restaurant4) {
        let upload_restaurant4_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_restaurant4;
        let upload_restaurant4_name = `${
          data.restaurantName
        }_${new Date().getTime()}_${upload_restaurant4_Obj.originalFilename}`;
        fs.renameSync(
          upload_restaurant4_Obj.filepath,
          path.join(form.uploadDir, upload_restaurant4_name)
        );
        docNames.upload_restaurant4_name = upload_restaurant4_name;
      }

      res.json(
        await propertyRegistrationMaster.createFoodVisitDetails(
          fields,
          files,
          docNames,
          ipAddress
        )
      );
    });
  } catch (err) {
    console.error(
      `Error while creating Food Partner Visit Details`,
      err.message
    );
    next(err);
  }
});

router.post("/savingEquipmentVisitDetails", async function (req, res, next) {
  //console.log('rk')
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let partner_visits_documents_loc = dir.partner_visits_documents;
    form.uploadDir = partner_visits_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.equipment_visit_details);
      // console.log('rk',data)
      //console.log('rk', files)

      if (files.upload_pan_card) {
        let upload_pan_card_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_pan_card;
        let upload_pan_card_name = `${
          data.equipmentName
        }_${new Date().getTime()}_${upload_pan_card_Obj.originalFilename}`;
        fs.renameSync(
          upload_pan_card_Obj.filepath,
          path.join(form.uploadDir, upload_pan_card_name)
        );
        docNames.upload_pan_card_name = upload_pan_card_name;
      }
      if (files.upload_gst) {
        let upload_gst_Obj = JSON.parse(JSON.stringify(files)).upload_gst;
        let upload_gst_name = `${data.equipmentName}_${new Date().getTime()}_${
          upload_gst_Obj.originalFilename
        }`;
        fs.renameSync(
          upload_gst_Obj.filepath,
          path.join(form.uploadDir, upload_gst_name)
        );
        docNames.upload_gst_name = upload_gst_name;
      }
      if (files.upload_cancel_cheque) {
        let upload_cancel_cheque_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_cancel_cheque;
        let upload_cancel_cheque_name = `${
          data.equipmentName
        }_${new Date().getTime()}_${upload_cancel_cheque_Obj.originalFilename}`;
        fs.renameSync(
          upload_cancel_cheque_Obj.filepath,
          path.join(form.uploadDir, upload_cancel_cheque_name)
        );
        docNames.upload_cancel_cheque_name = upload_cancel_cheque_name;
      }
      if (files.upload_wheel_chair_pic) {
        let upload_wheel_chair_pic_obj = JSON.parse(
          JSON.stringify(files)
        ).upload_wheel_chair_pic;
        let upload_wheel_chair_pic_name = `${
          data.equipmentName
        }_${new Date().getTime()}_${
          upload_wheel_chair_pic_obj.originalFilename
        }`;
        fs.renameSync(
          upload_wheel_chair_pic_obj.filepath,
          path.join(form.uploadDir, upload_wheel_chair_pic_name)
        );
        docNames.upload_wheel_chair_pic_name = upload_wheel_chair_pic_name;
      }
      if (files.upload_cylinder_pic) {
        let upload_cylinder_pic_obj = JSON.parse(
          JSON.stringify(files)
        ).upload_cylinder_pic;
        let upload_cylinder_pic_name = `${
          data.equipmentName
        }_${new Date().getTime()}_${upload_cylinder_pic_obj.originalFilename}`;
        fs.renameSync(
          upload_cylinder_pic_obj.filepath,
          path.join(form.uploadDir, upload_cylinder_pic_name)
        );
        docNames.upload_cylinder_pic_name = upload_cylinder_pic_name;
      }

      if (files.upload_stick_pic) {
        let upload_stick_pic_obj = JSON.parse(
          JSON.stringify(files)
        ).upload_stick_pic;
        let upload_stick_pic_name = `${
          data.equipmentName
        }_${new Date().getTime()}_${upload_stick_pic_obj.originalFilename}`;
        fs.renameSync(
          upload_stick_pic_obj.filepath,
          path.join(form.uploadDir, upload_stick_pic_name)
        );
        docNames.upload_stick_pic_name = upload_stick_pic_name;
      }

      res.json(
        await propertyRegistrationMaster.createEquipmentVisitDetails(
          fields,
          files,
          docNames,
          ipAddress
        )
      );
    });
  } catch (err) {
    console.error(
      `Error while creating Accomadation Partner Visit Details`,
      err.message
    );
    next(err);
  }
});

//Ravi Kiran Update method for Accomadation
router.put("/updateAccomadationDetails", async function (req, res, next) {
  // let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  //console.log(field_visit_id)

  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let partner_visits_documents_loc = dir.partner_visits_documents;
    form.uploadDir = partner_visits_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};

    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.update_accomadation_details);
      let ratesData = JSON.parse(fields.update_accomadation_Rates);

      let visitId = data.fieldVisitId;
      //console.log(data)
      //console.log(ratesData)

      if (files.update_pan_card == undefined) {
        let panCardName = data.pan_card_upt;
        docNames.panCardName = panCardName;
      } else {
        if (files.update_pan_card.originalFilename == data.pan_card_upt) {
          let panCardObj = JSON.parse(JSON.stringify(files)).update_pan_card;
          let panCardName = panCardObj.originalFilename;
          docNames.panCardName = panCardName;
        } else {
          let panCardObj = JSON.parse(JSON.stringify(files)).update_pan_card;
          let panCardName = `${data.propertyName}_${new Date().getTime()}_${
            panCardObj.originalFilename
          }`;
          docNames.panCardName = panCardName;
          fs.renameSync(
            panCardObj.filepath,
            path.join(form.uploadDir, panCardName)
          );
        }
      }

      if (files.update_gst == undefined) {
        let gstName = data.gst_upt;
        docNames.gstName = gstName;
      } else {
        if (files.update_gst.originalFilename == data.gst_upt) {
          let gstObj = JSON.parse(JSON.stringify(files)).update_gst;
          let gstName = gstObj.originalFilename;
          docNames.gstName = gstName;
        } else {
          let gstObj = JSON.parse(JSON.stringify(files)).update_gst;
          let gstName = `${data.propertyName}_${new Date().getTime()}_${
            gstObj.originalFilename
          }`;
          docNames.gstName = gstName;
          fs.renameSync(gstObj.filepath, path.join(form.uploadDir, gstName));
        }
      }

      if (files.update_cancel_cheque == undefined) {
        let cancelChequeName = data.cancel_cheque_upt;
        docNames.cancelChequeName = cancelChequeName;
      } else {
        if (
          files.update_cancel_cheque.originalFilename == data.cancel_cheque_upt
        ) {
          let cancelObj = JSON.parse(
            JSON.stringify(files)
          ).update_cancel_cheque;
          let cancelChequeName = cancelObj.originalFilename;
          docNames.cancelChequeName = cancelChequeName;
        } else {
          let cancelObj = JSON.parse(
            JSON.stringify(files)
          ).update_cancel_cheque;
          let cancelChequeName = `${
            data.propertyName
          }_${new Date().getTime()}_${cancelObj.originalFilename}`;
          docNames.cancelChequeName = cancelChequeName;
          fs.renameSync(
            cancelObj.filepath,
            path.join(form.uploadDir, cancelChequeName)
          );
        }
      }

      if (files.update_facade == undefined) {
        let facadeName = data.facade_upt;
        docNames.facadeName = facadeName;
      } else {
        if (files.update_facade.originalFilename == data.facade_upt) {
          let facadeObj = JSON.parse(JSON.stringify(files)).update_facade;
          let facadeName = facadeObj.originalFilename;
          docNames.facadeName = facadeName;
        } else {
          let facadeObj = JSON.parse(JSON.stringify(files)).update_facade;
          let facadeName = `${data.propertyName}_${new Date().getTime()}_${
            facadeObj.originalFilename
          }`;
          docNames.facadeName = facadeName;
          fs.renameSync(
            facadeObj.filepath,
            path.join(form.uploadDir, facadeName)
          );
        }
      }

      if (files.update_facade2 == undefined) {
        let facadeName2 = data.facade2_upt;
        docNames.facadeName2 = facadeName2;
      } else {
        if (files.update_facade2.originalFilename == data.facade2_upt) {
          let facade2Obj = JSON.parse(JSON.stringify(files)).update_facade2;
          let facadeName2 = facade2Obj.originalFilename;
          docNames.facadeName2 = facadeName2;
        } else {
          let facade2Obj = JSON.parse(JSON.stringify(files)).update_facade2;
          let facadeName2 = `${data.propertyName}_${new Date().getTime()}_${
            facade2Obj.originalFilename
          }`;
          docNames.facadeName2 = facadeName2;
          fs.renameSync(
            facade2Obj.filepath,
            path.join(form.uploadDir, facadeName2)
          );
        }
      }

      if (files.update_lobby1 == undefined) {
        let lobby1Name = data.lobby1_upt;
        docNames.lobby1Name = lobby1Name;
      } else {
        if (files.update_lobby1.originalFilename == data.lobby1_upt) {
          let lobby1Obj = JSON.parse(JSON.stringify(files)).update_lobby1;
          let lobby1Name = lobby1Obj.originalFilename;
          docNames.lobby1Name = lobby1Name;
        } else {
          let lobby1Obj = JSON.parse(JSON.stringify(files)).update_lobby1;
          let lobby1Name = `${data.propertyName}_${new Date().getTime()}_${
            lobby1Obj.originalFilename
          }`;
          docNames.lobby1Name = lobby1Name;
          fs.renameSync(
            lobby1Obj.filepath,
            path.join(form.uploadDir, lobby1Name)
          );
        }
      }

      if (files.update_lobby2 == undefined) {
        let lobby2Name = data.lobby2_upt;
        docNames.lobby2Name = lobby2Name;
      } else {
        if (files.update_lobby2.originalFilename == data.lobby2_upt) {
          let lobby2Obj = JSON.parse(JSON.stringify(files)).update_lobby2;
          let lobby2Name = lobby2Obj.originalFilename;
          docNames.lobby2Name = lobby2Name;
        } else {
          let lobby2Obj = JSON.parse(JSON.stringify(files)).update_lobby2;
          let lobby2Name = `${data.propertyName}_${new Date().getTime()}_${
            lobby2Obj.originalFilename
          }`;
          docNames.lobby2Name = lobby2Name;
          fs.renameSync(
            lobby2Obj.filepath,
            path.join(form.uploadDir, lobby2Name)
          );
        }
      }

      if (files.update_restaurant == undefined) {
        let restaurantName = data.restaurant_upt;
        docNames.restaurantName = restaurantName;
      } else {
        if (files.update_restaurant.originalFilename == data.restaurant_upt) {
          let restaurantObj = JSON.parse(
            JSON.stringify(files)
          ).update_restaurant;
          let restaurantName = restaurantObj.originalFilename;
          docNames.restaurantName = restaurantName;
        } else {
          let restaurantObj = JSON.parse(
            JSON.stringify(files)
          ).update_restaurant;
          let restaurantName = `${data.propertyName}_${new Date().getTime()}_${
            restaurantObj.originalFilename
          }`;
          docNames.restaurantName = restaurantName;
          fs.renameSync(
            restaurantObj.filepath,
            path.join(form.uploadDir, restaurantName)
          );
        }
      }

      if (files.update_self_kitchen == undefined) {
        let selfKitchenName = data.self_kitchen_upt;
        docNames.selfKitchenName = selfKitchenName;
      } else {
        if (
          files.update_self_kitchen.originalFilename == data.self_kitchen_upt
        ) {
          let selfKitchenObj = JSON.parse(
            JSON.stringify(files)
          ).update_self_kitchen;
          let selfKitchenName = selfKitchenObj.originalFilename;
          docNames.selfKitchenName = selfKitchenName;
        } else {
          let selfKitchenObj = JSON.parse(
            JSON.stringify(files)
          ).update_self_kitchen;
          let selfKitchenName = `${data.propertyName}_${new Date().getTime()}_${
            selfKitchenObj.originalFilename
          }`;
          docNames.selfKitchenName = selfKitchenName;
          fs.renameSync(
            selfKitchenObj.filepath,
            path.join(form.uploadDir, selfKitchenName)
          );
        }
      }

      if (files.update_room1 == undefined) {
        let room1Name = data.room1_upt;
        docNames.room1Name = room1Name;
      } else {
        if (files.update_room1.originalFilename == data.room1_upt) {
          let room1Obj = JSON.parse(JSON.stringify(files)).update_room1;
          let room1Name = room1Obj.originalFilename;
          docNames.room1Name = room1Name;
        } else {
          let room1Obj = JSON.parse(JSON.stringify(files)).update_room1;
          let room1Name = `${data.propertyName}_${new Date().getTime()}_${
            room1Obj.originalFilename
          }`;
          docNames.room1Name = room1Name;
          fs.renameSync(
            room1Obj.filepath,
            path.join(form.uploadDir, room1Name)
          );
        }
      }

      if (files.update_room1Bathroom == undefined) {
        let room1BathroomName = data.room1_bathroom_upt;
        docNames.room1BathroomName = room1BathroomName;
      } else {
        if (
          files.update_room1Bathroom.originalFilename == data.room1_bathroom_upt
        ) {
          let room1BathroomObj = JSON.parse(
            JSON.stringify(files)
          ).update_room1Bathroom;
          let room1BathroomName = room1BathroomObj.originalFilename;
          docNames.room1BathroomName = room1BathroomName;
        } else {
          let room1BathroomObj = JSON.parse(
            JSON.stringify(files)
          ).update_room1Bathroom;
          let room1BathroomName = `${
            data.propertyName
          }_${new Date().getTime()}_${room1BathroomObj.originalFilename}`;
          docNames.room1BathroomName = room1BathroomName;
          fs.renameSync(
            room1BathroomObj.filepath,
            path.join(form.uploadDir, room1BathroomName)
          );
        }
      }

      if (files.update_room2 == undefined) {
        let room2Name = data.room1_upt;
        docNames.room2Name = room2Name;
      } else {
        if (files.update_room2.originalFilename == data.room2_upt) {
          let room2Obj = JSON.parse(JSON.stringify(files)).update_room2;
          let room2Name = room2Obj.originalFilename;
          docNames.room2Name = room2Name;
        } else {
          let room2Obj = JSON.parse(JSON.stringify(files)).update_room2;
          let room2Name = `${data.propertyName}_${new Date().getTime()}_${
            room2Obj.originalFilename
          }`;
          docNames.room2Name = room2Name;
          fs.renameSync(
            room2Obj.filepath,
            path.join(form.uploadDir, room2Name)
          );
        }
      }

      if (files.update_room2Bathroom == undefined) {
        let room2BathroomName = data.room2_bathroom_upt;
        docNames.room2BathroomName = room2BathroomName;
      } else {
        if (
          files.update_room2Bathroom.originalFilename == data.room2_bathroom_upt
        ) {
          let room2BathroomObj = JSON.parse(
            JSON.stringify(files)
          ).update_room2Bathroom;
          let room2BathroomName = room2BathroomObj.originalFilename;
          docNames.room2BathroomName = room2BathroomName;
        } else {
          let room2BathroomObj = JSON.parse(
            JSON.stringify(files)
          ).update_room2Bathroom;
          let room2BathroomName = `${
            data.propertyName
          }_${new Date().getTime()}_${room2BathroomObj.originalFilename}`;
          docNames.room2BathroomName = room2BathroomName;
          fs.renameSync(
            room2BathroomObj.filepath,
            path.join(form.uploadDir, room2BathroomName)
          );
        }
      }

      if (files.update_room3 == undefined) {
        let room3Name = data.room1_upt;
        docNames.room3Name = room3Name;
      } else {
        if (files.update_room3.originalFilename == data.room3_upt) {
          let room3Obj = JSON.parse(JSON.stringify(files)).update_room3;
          let room3Name = room3Obj.originalFilename;
          docNames.room3Name = room3Name;
        } else {
          let room3Obj = JSON.parse(JSON.stringify(files)).update_room3;
          let room3Name = `${data.propertyName}_${new Date().getTime()}_${
            room3Obj.originalFilename
          }`;
          docNames.room3Name = room3Name;
          fs.renameSync(
            room3Obj.filepath,
            path.join(form.uploadDir, room3Name)
          );
        }
      }

      if (files.update_room3Bathroom == undefined) {
        let room3BathroomName = data.room3_bathroom_upt;
        docNames.room3BathroomName = room3BathroomName;
      } else {
        if (
          files.update_room3Bathroom.originalFilename == data.room3_bathroom_upt
        ) {
          let room3BathroomObj = JSON.parse(
            JSON.stringify(files)
          ).update_room3Bathroom;
          let room3BathroomName = room3BathroomObj.originalFilename;
          docNames.room3BathroomName = room3BathroomName;
        } else {
          let room3BathroomObj = JSON.parse(
            JSON.stringify(files)
          ).update_room3Bathroom;
          let room3BathroomName = `${
            data.propertyName
          }_${new Date().getTime()}_${room3BathroomObj.originalFilename}`;
          docNames.room3BathroomName = room3BathroomName;
          fs.renameSync(
            room3BathroomObj.filepath,
            path.join(form.uploadDir, room3BathroomName)
          );
        }
      }

      let value = data;
      //console.log("route1111111", value,docNames);
      res.json(
        await propertyRegistrationMaster.updateAccomadationVisitDetails(
          fields,
          value,
          docNames,
          visitId
        )
      );
    });
  } catch (err) {
    console.error(`Error while updating Accomadation Visit Data`, err.message);
    next(err);
  }
});

router.put("/updateTravelDetails", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;

  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let partner_visits_documents_loc = dir.partner_visits_documents;
    form.uploadDir = partner_visits_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    //console.log(form)
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.update_travel_details);
      //let update_pan_card = JSON.parse(fields.update_pan_card);
      // console.log('data',data)
      //console.log('files',fields.update_facade)

      if (files.update_pan_card == undefined) {
        let panCardName = data.pan_card_upt;
        docNames.panCardName = panCardName;
      } else {
        if (files.update_pan_card.originalFilename == data.pan_card_upt) {
          let panCardObj = JSON.parse(JSON.stringify(files)).update_pan_card;
          let panCardName = panCardObj.originalFilename;
          docNames.panCardName = panCardName;
        } else {
          let panCardObj = JSON.parse(JSON.stringify(files)).update_pan_card;
          let panCardName = `${data.travelAgencyName}${new Date().getTime()}${
            panCardObj.originalFilename
          }`;
          docNames.panCardName = panCardName;
          fs.renameSync(
            panCardObj.filepath,
            path.join(form.uploadDir, panCardName)
          );
        }
      }

      if (files.update_gst == undefined) {
        let gstName = data.gst_upt;
        docNames.gstName = gstName;
      } else {
        if (files.update_gst.originalFilename == data.gst_upt) {
          let gstObj = JSON.parse(JSON.stringify(files)).update_gst;
          let gstName = gstObj.originalFilename;
          docNames.gstName = gstName;
        } else {
          let gstObj = JSON.parse(JSON.stringify(files)).update_gst;
          let gstName = `${data.travelAgencyName}${new Date().getTime()}${
            gstObj.originalFilename
          }`;
          docNames.gstName = gstName;
          fs.renameSync(gstObj.filepath, path.join(form.uploadDir, gstName));
        }
      }

      if (files.update_cancel_cheque == undefined) {
        let cancelChequeName = data.cancel_cheque_upt;
        docNames.cancelChequeName = cancelChequeName;
      } else {
        if (
          files.update_cancel_cheque.originalFilename == data.cancel_cheque_upt
        ) {
          let cancelObj = JSON.parse(
            JSON.stringify(files)
          ).update_cancel_cheque;
          let cancelChequeName = cancelObj.originalFilename;
          docNames.cancelChequeName = cancelChequeName;
        } else {
          let cancelObj = JSON.parse(
            JSON.stringify(files)
          ).update_cancel_cheque;
          let cancelChequeName = `${
            data.travelAgencyName
          }${new Date().getTime()}${cancelObj.originalFilename}`;
          docNames.cancelChequeName = cancelChequeName;
          fs.renameSync(
            cancelObj.filepath,
            path.join(form.uploadDir, cancelChequeName)
          );
        }
      }

      res.json(
        await propertyRegistrationMaster.updateTravelVisitDetails(
          data,
          files,
          docNames,
          data.field_visit_id,
          ipAddress
        )
      );
    });
  } catch (err) {
    console.error(`Error while updating Accomadation Visit Data`, err.message);
    next(err);
  }
});

router.put("/updateFoodDetails", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;

  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let partner_visits_documents_loc = dir.partner_visits_documents;
    form.uploadDir = partner_visits_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};

    //console.log("roouter",form)
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.update_food_details);
      //let update_pan_card = JSON.parse(fields.update_pan_card);
      // console.log('data',data)

      if (files.update_pan_card == undefined) {
        let panCardName = data.pan_card_upt;
        docNames.panCardName = panCardName;
      } else {
        if (files.update_pan_card.originalFilename == data.pan_card_upt) {
          let panCardObj = JSON.parse(JSON.stringify(files)).update_pan_card;
          let panCardName = panCardObj.originalFilename;
          docNames.panCardName = panCardName;
        } else {
          let panCardObj = JSON.parse(JSON.stringify(files)).update_pan_card;
          let panCardName = `${data.restaurantName}${new Date().getTime()}${
            panCardObj.originalFilename
          }`;
          docNames.panCardName = panCardName;
          fs.renameSync(
            panCardObj.filepath,
            path.join(form.uploadDir, panCardName)
          );
        }
      }

      if (files.update_gst == undefined) {
        let gstName = data.gst_upt;
        docNames.gstName = gstName;
      } else {
        if (files.update_gst.originalFilename == data.gst_upt) {
          let gstObj = JSON.parse(JSON.stringify(files)).update_gst;
          let gstName = gstObj.originalFilename;
          docNames.gstName = gstName;
        } else {
          let gstObj = JSON.parse(JSON.stringify(files)).update_gst;
          let gstName = `${data.restaurantName}${new Date().getTime()}${
            gstObj.originalFilename
          }`;
          docNames.gstName = gstName;
          fs.renameSync(gstObj.filepath, path.join(form.uploadDir, gstName));
        }
      }

      if (files.update_cancel_cheque == undefined) {
        let cancelChequeName = data.cancel_cheque_upt;
        docNames.cancelChequeName = cancelChequeName;
      } else {
        if (
          files.update_cancel_cheque.originalFilename == data.cancel_cheque_upt
        ) {
          let cancelObj = JSON.parse(
            JSON.stringify(files)
          ).update_cancel_cheque;
          let cancelChequeName = cancelObj.originalFilename;
          docNames.cancelChequeName = cancelChequeName;
        } else {
          let cancelObj = JSON.parse(
            JSON.stringify(files)
          ).update_cancel_cheque;
          let cancelChequeName = `${
            data.restaurantName
          }${new Date().getTime()}${cancelObj.originalFilename}`;
          docNames.cancelChequeName = cancelChequeName;
          fs.renameSync(
            cancelObj.filepath,
            path.join(form.uploadDir, cancelChequeName)
          );
        }
      }

      if (files.update_fssai_certificate == undefined) {
        let fssaiName = data.fssai_upt;
        docNames.fssaiName = fssaiName;
      } else {
        if (files.update_fssai_certificate.originalFilename == data.fssai_upt) {
          let cancelObj = JSON.parse(
            JSON.stringify(files)
          ).update_fssai_certificate;
          let fssaiName = cancelObj.originalFilename;
          docNames.fssaiName = fssaiName;
        } else {
          let cancelObj = JSON.parse(
            JSON.stringify(files)
          ).update_fssai_certificate;
          let fssaiName = `${data.restaurantName}${new Date().getTime()}${
            cancelObj.originalFilename
          }`;
          docNames.fssaiName = fssaiName;
          fs.renameSync(
            cancelObj.filepath,
            path.join(form.uploadDir, fssaiName)
          );
        }
      }
      res.json(
        await propertyRegistrationMaster.updateFoodVisitDetails(
          data,
          files,
          docNames,
          data.s_no,
          ipAddress
        )
      );
    });
  } catch (err) {
    console.error(`Error while updating Food Visit Data`, err.message);
    next(err);
  }
});

router.put("/updateEquipmentDetails", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;

  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let partner_visits_documents_loc = dir.partner_visits_documents;
    form.uploadDir = partner_visits_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    //console.log(form)
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.update_equipment_details);
      //let update_pan_card = JSON.parse(fields.update_pan_card);
      // console.log('data',data)
      // console.log('files',files)

      if (files.update_pan_card == undefined) {
        let panCardName = data.pan_card_upt;
        docNames.panCardName = panCardName;
      } else {
        if (files.update_pan_card.originalFilename == data.pan_card_upt) {
          let panCardObj = JSON.parse(JSON.stringify(files)).update_pan_card;
          let panCardName = panCardObj.originalFilename;
          docNames.panCardName = panCardName;
        } else {
          let panCardObj = JSON.parse(JSON.stringify(files)).update_pan_card;
          let panCardName = `${data.equipmentName}${new Date().getTime()}${
            panCardObj.originalFilename
          }`;
          docNames.panCardName = panCardName;
          fs.renameSync(
            panCardObj.filepath,
            path.join(form.uploadDir, panCardName)
          );
        }
      }

      if (files.update_gst == undefined) {
        let gstName = data.gst_upt;
        docNames.gstName = gstName;
      } else {
        if (files.update_gst.originalFilename == data.gst_upt) {
          let gstObj = JSON.parse(JSON.stringify(files)).update_gst;
          let gstName = gstObj.originalFilename;
          docNames.gstName = gstName;
        } else {
          let gstObj = JSON.parse(JSON.stringify(files)).update_gst;
          let gstName = `${data.travelAgencyName}${new Date().getTime()}${
            gstObj.originalFilename
          }`;
          docNames.gstName = gstName;
          fs.renameSync(gstObj.filepath, path.join(form.uploadDir, gstName));
        }
      }

      if (files.update_cancel_cheque == undefined) {
        let cancelChequeName = data.cancel_cheque_upt;
        docNames.cancelChequeName = cancelChequeName;
      } else {
        if (
          files.update_cancel_cheque.originalFilename == data.cancel_cheque_upt
        ) {
          let cancelObj = JSON.parse(
            JSON.stringify(files)
          ).update_cancel_cheque;
          let cancelChequeName = cancelObj.originalFilename;
          docNames.cancelChequeName = cancelChequeName;
        } else {
          let cancelObj = JSON.parse(
            JSON.stringify(files)
          ).update_cancel_cheque;
          let cancelChequeName = `${
            data.travelAgencyName
          }${new Date().getTime()}${cancelObj.originalFilename}`;
          docNames.cancelChequeName = cancelChequeName;
          fs.renameSync(
            cancelObj.filepath,
            path.join(form.uploadDir, cancelChequeName)
          );
        }
      }

      if (files.update_wheel_pic == undefined) {
        let whelChairName = data.wheel_chair_upt;
        docNames.whelChairName = whelChairName;
      } else {
        if (files.update_wheel_pic.originalFilename == data.wheel_chair_upt) {
          let wheelChairObj = JSON.parse(
            JSON.stringify(files)
          ).update_wheel_pic;
          let whelChairName = wheelChairObj.originalFilename;
          docNames.whelChairName = whelChairName;
        } else {
          let wheelChairObj = JSON.parse(
            JSON.stringify(files)
          ).update_wheel_pic;
          let whelChairName = `${data.equipmentName}${new Date().getTime()}${
            wheelChairObj.originalFilename
          }`;
          docNames.whelChairName = whelChairName;
          fs.renameSync(
            wheelChairObj.filepath,
            path.join(form.uploadDir, whelChairName)
          );
        }
      }

      if (files.update_oxygen_pic == undefined) {
        let oxygenName = data.oxygen_upt;
        docNames.oxygenName = oxygenName;
      } else {
        if (files.update_oxygen_pic.originalFilename == data.oxygen_upt) {
          let oxygenObj = JSON.parse(JSON.stringify(files)).update_oxygen_pic;
          let oxygenName = oxygenObj.originalFilename;
          docNames.oxygenName = oxygenName;
        } else {
          let oxygenObj = JSON.parse(JSON.stringify(files)).update_oxygen_pic;
          let oxygenName = `${data.equipmentName}${new Date().getTime()}${
            oxygenObj.originalFilename
          }`;
          docNames.oxygenName = oxygenName;
          fs.renameSync(
            oxygenObj.filepath,
            path.join(form.uploadDir, oxygenName)
          );
        }
      }

      if (files.update_tripod_pic == undefined) {
        let tripodWalkingstickName = data.tripod_upt;
        docNames.tripodWalkingstickName = tripodWalkingstickName;
      } else {
        if (files.update_tripod_pic.originalFilename == data.tripod_upt) {
          let tripodObj = JSON.parse(JSON.stringify(files)).update_tripod_pic;
          let tripodWalkingstickName = tripodObj.originalFilename;
          docNames.tripodWalkingstickName = tripodWalkingstickName;
        } else {
          let tripodObj = JSON.parse(JSON.stringify(files)).update_tripod_pic;
          let tripodWalkingstickName = `${
            data.equipmentName
          }${new Date().getTime()}${tripodObj.originalFilename}`;
          docNames.tripodWalkingstickName = tripodWalkingstickName;
          fs.renameSync(
            tripodObj.filepath,
            path.join(form.uploadDir, tripodWalkingstickName)
          );
        }
      }

      res.json(
        await propertyRegistrationMaster.updateEquipmentVisitDetails(
          data,
          files,
          docNames,
          data.field_visit_id,
          ipAddress
        )
      );
    });
  } catch (err) {
    console.error(`Error while updating Equipment Visit Data`, err.message);
    next(err);
  }
});

router.put("/verifyEquipmentDetails/:id", async function (req, res, next) {
  // console.log("routers")
  let s_no = req.params.id;
  //  console.log("no",s_no)

  try {
    res.json(await propertyRegistrationMaster.verifyEquipmentDetails(s_no));
  } catch (err) {
    console.log("error");
  }
});

//Ravi kiran PUT method for verify Accomdation Details by Staff
router.put("/verifyAccomadationDetails/:s_no", async function (req, res, next) {
  let s_no = req.params.s_no;
  //console.log(s_no);

  try {
    res.json(await propertyRegistrationMaster.verifyAccomadationDetails(s_no));
  } catch (err) {
    console.error(`Error while updating Accomadation Visit Data`, err.message);
    next(err);
  }
});

router.get(
  "/loadRoomCategoriesListTable/:visitId",
  async function (req, res, next) {
    //console.log(req.params.visitId)
    try {
      res.json(
        await propertyRegistrationMaster.loadRoomCategoriesListTable(
          req.params.visitId
        )
      );
    } catch (err) {
      console.error(`Error while getting Field Visit Rates  `, err.message);
      next(err);
    }
  }
);

router.delete(
  "/deleteParticularRowDetails/:field_visit_id/:s_no",
  async function (req, res, next) {
    //console.log('1',req.params.field_visit_id)
    //console.log('2',req.params.s_no)
    try {
      res.json(
        await propertyRegistrationMaster.deleteParticularRowDetails(
          req.params.field_visit_id,
          req.params.s_no
        )
      );
    } catch (err) {
      console.error(
        `Error while deleting Property Registration Master`,
        err.message
      );
      next(err);
    }
  }
);

//Ravi Kiran POST MEthod for Hospital Partner Visit Details
router.post("/savingHospitalDetails", async function (req, res, next) {
  //console.log('rk')
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let partner_visits_documents_loc = dir.partner_visits_documents;
    form.uploadDir = partner_visits_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.hosptial_fieldvisit_details);
      let ratesData = JSON.parse(fields.hosptial_fieldvisit_key_details);

      if (files.upload_hospital_image_1) {
        let upload_hospital_image_1_obj = JSON.parse(
          JSON.stringify(files)
        ).upload_hospital_image_1;
        let upload_hospital_image_1_Name = `${
          data.hospitalName
        }_${new Date().getTime()}_${
          upload_hospital_image_1_obj.originalFilename
        }`;
        fs.renameSync(
          upload_hospital_image_1_obj.filepath,
          path.join(form.uploadDir, upload_hospital_image_1_Name)
        );
        docNames.upload_hospital_image_1_Name = upload_hospital_image_1_Name;
      }

      if (files.upload_hospital_image_2) {
        let upload_hospital_image_2_obj = JSON.parse(
          JSON.stringify(files)
        ).upload_hospital_image_2;
        let upload_hospital_image_2_Name = `${
          data.hospitalName
        }_${new Date().getTime()}_${
          upload_hospital_image_2_obj.originalFilename
        }`;
        fs.renameSync(
          upload_hospital_image_2_obj.filepath,
          path.join(form.uploadDir, upload_hospital_image_2_Name)
        );
        docNames.upload_hospital_image_2_Name = upload_hospital_image_2_Name;
      }
      if (files.upload_hospital_image_3) {
        let upload_hospital_image_3_obj = JSON.parse(
          JSON.stringify(files)
        ).upload_hospital_image_3;
        let upload_hospital_image_3_Name = `${
          data.hospitalName
        }_${new Date().getTime()}_${
          upload_hospital_image_3_obj.originalFilename
        }`;
        fs.renameSync(
          upload_hospital_image_3_obj.filepath,
          path.join(form.uploadDir, upload_hospital_image_3_Name)
        );
        docNames.upload_hospital_image_3_Name = upload_hospital_image_3_Name;
      }

      res.json(
        await propertyRegistrationMaster.createHospitalVisitDetails(
          fields,
          files,
          docNames,
          ipAddress
        )
      );
    });
  } catch (err) {
    console.error(
      `Error while creating Accomadation Partner Visit Details`,
      err.message
    );
    next(err);
  }
});

//Ravi kiran Get method for hospitals
router.get(
  "/loadHospitalpartnerData/:city/:userName",
  async function (req, res, next) {
    //console.log('rk',req.params)
    try {
      const city = req.params.city;
      const userName = req.params.userName;
      //console.log(city)
      //console.log(userName)
      res.json(
        await propertyRegistrationMaster.loadHospitalpartnerData(city, userName)
      );
    } catch (err) {
      console.error(
        `Error while getting Accomadation Field Visits `,
        err.message
      );
      next(err);
    }
  }
);

//Ravi kiran PUT Method for Hospital Field Visit
router.put("/updateHospitalDetails", async function (req, res, next) {
  //let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  //console.log(field_visit_id)

  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let partner_visits_documents_loc = dir.partner_visits_documents;
    form.uploadDir = partner_visits_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};

    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.update_hospital_details);
      //let ratesData = JSON.parse(fields.update_accomadation_Rates);

      let visitId = data.fieldVisitId;
      //console.log(data)
      //console.log(ratesData)

      if (files.update_image_1 == undefined) {
        let imageName1 = data.image_upt1;
        docNames.imageName1 = imageName1;
      } else {
        if (files.update_image_1.originalFilename == data.image_upt1) {
          let imageObj1 = JSON.parse(JSON.stringify(files)).update_image_1;
          let imageName1 = imageObj1.originalFilename;
          docNames.imageName1 = imageName1;
        } else {
          let imageObj1 = JSON.parse(JSON.stringify(files)).update_image_1;
          let imageName1 = `${data.hospitalName}_${new Date().getTime()}_${
            imageObj1.originalFilename
          }`;
          docNames.imageName1 = imageName1;
          fs.renameSync(
            imageObj1.filepath,
            path.join(form.uploadDir, imageName1)
          );
        }
      }

      if (files.update_image_2 == undefined) {
        let imageName2 = data.image_upt2;
        docNames.imageName2 = imageName2;
      } else {
        if (files.update_image_2.originalFilename == data.image_upt2) {
          let imageObj2 = JSON.parse(JSON.stringify(files)).update_image_2;
          let imageName2 = imageObj2.originalFilename;
          docNames.imageName2 = imageName2;
        } else {
          let imageObj2 = JSON.parse(JSON.stringify(files)).update_image_2;
          let imageName2 = `${data.hospitalName}_${new Date().getTime()}_${
            imageObj2.originalFilename
          }`;
          docNames.imageName2 = imageName2;
          fs.renameSync(
            imageObj2.filepath,
            path.join(form.uploadDir, imageName2)
          );
        }
      }

      if (files.update_image_3 == undefined) {
        let imageName3 = data.image_upt3;
        docNames.imageName3 = imageName3;
      } else {
        if (files.update_image_3.originalFilename == data.image_upt3) {
          let imageObj3 = JSON.parse(JSON.stringify(files)).update_image_3;
          let imageName3 = imageObj3.originalFilename;
          docNames.imageName3 = imageName3;
        } else {
          let imageObj3 = JSON.parse(JSON.stringify(files)).update_image_3;
          let imageName3 = `${data.hospitalName}_${new Date().getTime()}_${
            imageObj3.originalFilename
          }`;
          docNames.imageName3 = imageName3;
          fs.renameSync(
            imageObj3.filepath,
            path.join(form.uploadDir, imageName3)
          );
        }
      }

      let value = data;
      //console.log("route1111111", value,docNames);
      res.json(
        await propertyRegistrationMaster.updateHospitalVisitDetails(
          fields,
          value,
          docNames,
          visitId
        )
      );
    });
  } catch (err) {
    console.error(`Error while updating Accomadation Visit Data`, err.message);
    next(err);
  }
});

//Ravi kiran Load Departments Table
router.get("/loadDepartmentsTable/:visitId", async function (req, res, next) {
  //console.log(req.params.visitId)
  try {
    res.json(
      await propertyRegistrationMaster.loadDepartmentsTable(req.params.visitId)
    );
  } catch (err) {
    console.error(`Error while getting Field Visit Rates  `, err.message);
    next(err);
  }
});

//Ravi kiran Delete Particulatar Dept Details of Hospital FIeld Visit
router.delete(
  "/deleteParticularRowDetailsForHospital/:field_visit_id/:s_no",
  async function (req, res, next) {
    //console.log('1',req.params.field_visit_id)
    //console.log('2',req.params.s_no)
    try {
      res.json(
        await propertyRegistrationMaster.deleteParticularRowDetailsForHospital(
          req.params.field_visit_id,
          req.params.s_no
        )
      );
    } catch (err) {
      console.error(
        `Error while deleting Property Registration Master`,
        err.message
      );
      next(err);
    }
  }
);

//Ravi kiran PUT Method for verification of Hospital Field Visit
//Ravi kiran PUT method for verify Accomdation Details by Staff
router.put("/verifyHospitalDetails/:s_no", async function (req, res, next) {
  let s_no = req.params.s_no;
  //console.log(s_no);

  try {
    res.json(await propertyRegistrationMaster.verifyHospitalDetails(s_no));
  } catch (err) {
    console.error(`Error while updating Accomadation Visit Data`, err.message);
    next(err);
  }
});

//Ravi kiran put method for verification of Travel

router.put("/verifyTravelDetails/:id", async function (req, res, next) {
  // console.log("routers")
  let s_no = req.params.id;
  //  console.log("no",s_no)

  try {
    res.json(await propertyRegistrationMaster.verifyTravelVisitDetails(s_no));
  } catch (err) {
    console.log("error");
  }
});

//Ravi Kiran POST MEthod for Agent Partner Visit Details
router.post("/savingAgentDetails", async function (req, res, next) {
  //console.log('rk')
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let partner_visits_documents_loc = dir.partner_visits_documents;
    form.uploadDir = partner_visits_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.agent_details);

      //console.log(ratesData)
      // console.log('rk',data)
      //console.log('rk', files)

      if (files.upload_pan_card) {
        let upload_pan_card_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_pan_card;
        let upload_pan_card_name = `${
          data.first_name
        }_${new Date().getTime()}_${upload_pan_card_Obj.originalFilename}`;
        fs.renameSync(
          upload_pan_card_Obj.filepath,
          path.join(form.uploadDir, upload_pan_card_name)
        );
        docNames.upload_pan_card_name = upload_pan_card_name;
      }
      if (files.upload_passport) {
        let upload_passport_obj = JSON.parse(
          JSON.stringify(files)
        ).upload_passport;
        let upload_passport_name = `${
          data.first_name
        }_${new Date().getTime()}_${upload_passport_obj.originalFilename}`;
        fs.renameSync(
          upload_passport_obj.filepath,
          path.join(form.uploadDir, upload_passport_name)
        );
        docNames.upload_passport_name = upload_passport_name;
      }
      if (files.upload_cancel_cheque) {
        let upload_cancel_cheque_Obj = JSON.parse(
          JSON.stringify(files)
        ).upload_cancel_cheque;
        let upload_cancel_cheque_name = `${
          data.first_name
        }_${new Date().getTime()}_${upload_cancel_cheque_Obj.originalFilename}`;
        fs.renameSync(
          upload_cancel_cheque_Obj.filepath,
          path.join(form.uploadDir, upload_cancel_cheque_name)
        );
        docNames.upload_cancel_cheque_name = upload_cancel_cheque_name;
      }
      if (files.upload_driving_license) {
        let upload_driving_license_obj = JSON.parse(
          JSON.stringify(files)
        ).upload_driving_license;
        let upload_driving_license_name = `${
          data.propertyName
        }_${new Date().getTime()}_${
          upload_driving_license_obj.originalFilename
        }`;
        fs.renameSync(
          upload_driving_license_obj.filepath,
          path.join(form.uploadDir, upload_driving_license_name)
        );
        docNames.upload_driving_license_name = upload_driving_license_name;
      }

      res.json(
        await propertyRegistrationMaster.createAgentDetails(
          fields,
          files,
          docNames,
          ipAddress
        )
      );
    });
  } catch (err) {
    console.error(
      `Error while creating Accomadation Partner Visit Details`,
      err.message
    );
    next(err);
  }
});

//Ravi kiran Get method for Agent Field Visit
router.get(
  "/loadAgentPartnerVisitDetails/:city/:userName",
  async function (req, res, next) {
    //console.log('rk',req.params)
    try {
      const city = req.params.city;
      const userName = req.params.userName;
      //console.log(city)
      //console.log(userName)
      res.json(
        await propertyRegistrationMaster.loadAgentPartnerVisitDetails(
          city,
          userName
        )
      );
    } catch (err) {
      console.error(
        `Error while getting Accomadation Field Visits `,
        err.message
      );
      next(err);
    }
  }
);

router.get("/loadFoodPartnerData/:payload", async function (req, res, next) {
  // console.log('rkrkrkrkrkrk')
  try {
    const city = req.params.payload;
    res.json(await propertyRegistrationMaster.loadFoodPartnerData(city));
  } catch (err) {
    console.error(`Error while getting Partner Field Visits `, err.message);
    next(err);
  }
});

module.exports = router;
