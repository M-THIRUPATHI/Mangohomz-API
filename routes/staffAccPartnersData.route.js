const express = require("express");
const router = express.Router();
const staffAccPropertyRegistrationMaster = require("../services/staffAccPartnersData.services");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const dir = require("../resources/filepath");
router.get("/getpartnerRegistrationStatusCount", async function (req, res, next) {
    try {
      res.json(await staffAccPropertyRegistrationMaster.getpartnerStatusCount());
    } catch (err) {
      console.error(
        `Error while getting Property Registration Master `,
        err.message
      );
      next(err);
    }
  });
/* GET All  Property Registration Master. */
router.get("/getStaffPropertRegData", async function (req, res, next) {
  try {
    res.json(await staffAccPropertyRegistrationMaster.getStaffPropertRegData());
  } catch (err) {
    console.error(`Error while getting Partner Approving Data `, err.message);
    next(err);
  }
});
router.get(
  "/existingUserProperty/:partner_id",
  async function (req, res, next) {
    try {
      res.json(
        await staffAccPropertyRegistrationMaster.existingUserProperty(
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
  "/staffAccPropertyRegistrationMasterStatusCount",
  async function (req, res, next) {
    try {
      res.json(await staffAccPropertyRegistrationMaster.getStatusCount());
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
  "/getPropertyRegAdminBasedOnStatus",
  async function (req, res, next) {
    try {
      res.json(
        await staffAccPropertyRegistrationMaster.getStatusCountForAdmin()
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
// router.get("/checkPincode/:pin_code", async function (req, res, next) {
//   try {
//     res.json(await staffAccPropertyRegistrationMaster.checkPincode(req.params.pin_code));
//   } catch (err) {
//     console.error(
//       `Error while getting Pin code Data`,
//       err.message
//     );
//     next(err);
//   }
// });
router.get("/getPropertyDataOnStatus/:status", async function (req, res, next) {
  try {
    res.json(
      await staffAccPropertyRegistrationMaster.getPropertyDataOnStatus(
        req.params.status
      )
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
  "/getPropertyDisplayCountOfAdmin/:status",
  async function (req, res) {
    try {
      res.json(
        await staffAccPropertyRegistrationMaster.getPropertyDisplayCountOfAdmin(
          req.params.status
        )
      );
    } catch (err) {
      console.error(
        `Error while getting Property partner RegApproval Status `,
        err.message
      );
      next(err);
    }
  }
);
router.get("/getPropertyPartnerRegApprovalStatus", async function (req, res) {
  try {
    res.json(await staffAccPropertyRegistrationMaster.getPropertyPartner());
  } catch (err) {
    console.error(
      `Error while getting Property partner RegApproval Status `,
      err.message
    );
    next(err);
  }
});
/* GET single Property Registration Master. */
router.get("/:id", async function (req, res, next) {
  try {
    res.send(
      await staffAccPropertyRegistrationMaster.getSingleParentTypeDetail(
        req.params.id
      )
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
  "/getPropertyData/:partner_id/:partner_sub_id",
  async function (req, res, next) {
    try {
      res.send(
        await staffAccPropertyRegistrationMaster.getPropertyData(
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
  "/getRoomsData/:partner_id/:partner_sub_id/:txn_id",
  async function (req, res, next) {
    try {
      res.send(
        await staffAccPropertyRegistrationMaster.getRoomsData(
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
router.get("/getAllPartners/partnersData", async function (req, res, next) {
  try {
    res.send(await staffAccPropertyRegistrationMaster.getAllPartnersForAdmin());
  } catch (err) {
    console.error(`Error while getting Partners Data `, err.message);
    next(err);
  }
});
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
          await staffAccPropertyRegistrationMaster.create(
            fields,
            files,
            docNames,
            ipAddress
          )
        );
      } else {
        res.json(
          await staffAccPropertyRegistrationMaster.exsistingUserCreate(
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
          data.property_name
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
          data.property_name
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
          data.property_name
        }_${new Date().getTime()}_${upload_image3_Obj.originalFilename}`;
        fs.renameSync(
          upload_image3_Obj.filepath,
          path.join(form.uploadDir, upload_image3_name)
        );
        docNames.upload_image3_name = upload_image3_name;
      }
      res.json(
        await staffAccPropertyRegistrationMaster.createPropertyDetails(
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
      res.json(
        await staffAccPropertyRegistrationMaster.createRoomDetails(
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
    res.json(await staffAccPropertyRegistrationMaster.create(req.body));
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
      await staffAccPropertyRegistrationMaster.getMultiplePropertyDetails(
        req.body
      )
    );
  } catch (err) {
    console.error(
      `Error while creating Property Registration Master`,
      err.message
    );
    next(err);
  }
});
/* PUT Property Registration Master */
// router.put("/:account_id/:partner_id/:partner_sub_id/:agent_name/:agent_sub_name/:status", async function (req, res, next) {
//   try {

// //  const form = new formidable.IncomingForm();
// //     formidable.keepExtensions = true;
// //     let accomdation_partner_documents_loc = dir.accomdation_partner_documents;
// //     form.uploadDir = accomdation_partner_documents_loc;
// //     if (!fs.existsSync(form.uploadDir)) {
// //       fs.mkdirSync(form.uploadDir);
// //     }
// //     let docNames = {};
// //     form.parse(req, async (_, fields, files) => {
// //       let data = JSON.parse(fields.updateproperty_details);
// //       if (files.upload_image1) {
// //         let upload_image1_Obj = JSON.parse(JSON.stringify(files)).upload_image1;
// //         if(upload_image1_Obj) {
// //           let upload_image1_name = `${data.property_name}_${new Date().getTime()}_${upload_image1_Obj.originalFilename}`;
// //           fs.renameSync(upload_image1_Obj.filepath, path.join(form.uploadDir, upload_image1_name));
// //           docNames.upload_image1_name = upload_image1_name;
// //         } else {
// //           docNames.upload_image1_name = data.upload_image1_name;
// //         }
// //       } else {
// //         docNames.upload_image1_name = data.upload_image1_name;
// //       }
// //       if (files.upload_image2) {
// //         let upload_image2_Obj = JSON.parse(JSON.stringify(files)).upload_image2;
// //         if(upload_image2_Obj) {
// //           let upload_image2_name = `${data.property_name}_${new Date().getTime()}_${upload_image2_Obj.originalFilename}`;
// //           fs.renameSync(upload_image2_Obj.filepath, path.join(form.uploadDir, upload_image2_name));
// //           docNames.upload_image2_name = upload_image2_name;
// //         } else {
// //           docNames.upload_image2_name = data.upload_image2_name;
// //         }
// //       } else {
// //         docNames.upload_image2_name = data.upload_image2_name;

// //       }
// //       if (files.upload_image3) {
// //         let upload_image3_Obj = JSON.parse(JSON.stringify(files)).upload_image3;
// //         if(upload_image3_Obj) {
// //           let upload_image3_name = `${data.property_name}_${new Date().getTime()}_${upload_image3_Obj.originalFilename}`;
// //           fs.renameSync(upload_image3_Obj.filepath, path.join(form.uploadDir, upload_image3_name));
// //           docNames.upload_image3_name = upload_image3_name;
// //         } else {
// //           docNames.upload_image3_name = data.upload_image3_name;
// //         }
// //       } else {
// //         docNames.upload_image3_name = data.upload_image3_name;

// //       }
// //       if (files.upload_image4) {
// //         let upload_image4_Obj = JSON.parse(JSON.stringify(files)).upload_image4;
// //         if(upload_image4_Obj) {
// //           let upload_image4_name = `${data.property_name}_${new Date().getTime()}_${upload_image4_Obj.originalFilename}`;
// //         fs.renameSync(upload_image4_Obj.filepath, path.join(form.uploadDir, upload_image4_name));
// //         docNames.upload_image4_name = upload_image4_name;
// //         }else {
// //           docNames.upload_image4_name = data.upload_image4_name;
// //         }
// //       } else {
// //         docNames.upload_image4_name = data.upload_image4_name;

// //       }
// //       if (files.upload_image5) {
// //         let upload_image5_Obj = JSON.parse(JSON.stringify(files)).upload_image5;
// //         if(upload_image5_Obj) {
// //           let upload_image5_name = `${data.property_name}_${new Date().getTime()}_${upload_image5_Obj.originalFilename}`;
// //           fs.renameSync(upload_image5_Obj.filepath, path.join(form.uploadDir, upload_image5_name));
// //           docNames.upload_image5_name = upload_image5_name;
// //         } else {
// //           docNames.upload_image5_name = data.upload_image5_name;
// //         }
// //       } else {
// //         docNames.upload_image5_name = data.upload_image5_name;

// //       }
// //     console.log("route", req.body,req.params);

//     res.json(await staffAccPropertyRegistrationMaster.updateDetails(req.params.account_id, req.params.partner_id, req.params.partner_sub_id, req.params.agent_name, req.params.agent_sub_name,req.params.status, req.body));
//     console.log("req.par",req.params)
//    //  });
//   } catch (err) {
//     console.error(`Error while updating Property Registration Master`, err.message);
//     next(err);
//   }
// });
/* PUT Property Registration Master */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(
      await staffAccPropertyRegistrationMaster.update(req.params.id, req.body)
    );
  } catch (err) {
    console.error(
      `Error while updating Property Registration Master`,
      err.message
    );
    next(err);
  }
});

router.put(
  "/updatePropertyPartnerForm/:partner_id/:partner_sub_id/:agent_name/:agent_sub_name/:status",
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
        let data = JSON.parse(fields.updateProperty);

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
          let mbCertificateObj = JSON.parse(
            JSON.stringify(files)
          ).mb_certificate;
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

        if (files.property_tax) {
          let propertyTaxObj = JSON.parse(JSON.stringify(files)).property_tax;
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

        if (files.fire_safety) {
          let fireSafetyObj = JSON.parse(JSON.stringify(files)).fire_safety;
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
        // console.log("route",data,docNames);
        res.json(
          await staffAccPropertyRegistrationMaster.updatePropertyPartnerForm(
            data.partner_id,
            data.partner_sub_id,
            data.agent_name,
            data.agent_sub_name,
            data.status,
            docNames,
            data
          )
        );
      });
    } catch (err) {
      console.error(`Error while updating Property Data`, err.message);
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
        docNames.upload_image1_name = data.uploadImage_update;
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
        docNames.upload_image2_name = data.uploadImage_update1;
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
        docNames.upload_image3_name = data.uploadImage_update2;
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
        docNames.upload_image4_name = data.uploadImage_update3;
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
        docNames.upload_image5_name = data.uploadImage_update4;
      }

      if (files.property_cancelcheque) {
        let property_cancelchequeObj = JSON.parse(
          JSON.stringify(files)
        ).property_cancelcheque;
        if (property_cancelchequeObj) {
          let property_cancelchequeName = `${
            data.property_name
          }_${new Date().getTime()}_${
            property_cancelchequeObj.originalFilename
          }`;
          fs.renameSync(
            property_cancelchequeObj.filepath,
            path.join(form.uploadDir, property_cancelchequeName)
          );
          docNames.property_cancelchequeName = property_cancelchequeName;
        } else {
          docNames.property_cancelchequeName = data.property_cancelchequeName;
        }
      } else {
        docNames.property_cancelchequeName = data.cancelled_cheque_doc;
      }
      if (files.propety_agreement) {
        let propety_agreementObj = JSON.parse(
          JSON.stringify(files)
        ).propety_agreement;
        if (propety_agreementObj) {
          let propety_agreementName = `${
            data.property_name
          }_${new Date().getTime()}_${propety_agreementObj.originalFilename}`;
          fs.renameSync(
            propety_agreementObj.filepath,
            path.join(form.uploadDir, propety_agreementName)
          );
          docNames.propety_agreementName = propety_agreementName;
        } else {
          docNames.propety_agreementName = data.propety_agreementName;
        }
      } else {
        docNames.propety_agreementName = data.mh_agreement;
      }
      if (files.property_declaration) {
        let property_declarationObj = JSON.parse(
          JSON.stringify(files)
        ).property_declaration;
        if (property_declarationObj) {
          let property_declarationName = `${
            data.property_name
          }_${new Date().getTime()}_${
            property_declarationObj.originalFilename
          }`;
          fs.renameSync(
            property_declarationObj.filepath,
            path.join(form.uploadDir, property_declarationName)
          );
          docNames.property_declarationName = property_declarationName;
        } else {
          docNames.property_declarationName = data.property_declarationName;
        }
      } else {
        docNames.property_declarationName = data.mh_declaration;
      }
      if (files.property_bankmandate) {
        let property_bankmandateObj = JSON.parse(
          JSON.stringify(files)
        ).property_bankmandate;
        if (property_bankmandateObj) {
          let property_bankmandateName = `${
            data.property_name
          }_${new Date().getTime()}_${
            property_bankmandateObj.originalFilename
          }`;
          fs.renameSync(
            property_bankmandateObj.filepath,
            path.join(form.uploadDir, property_bankmandateName)
          );
          docNames.property_bankmandateName = property_bankmandateName;
        } else {
          docNames.property_bankmandateName = data.property_bankmandateName;
        }
      } else {
        docNames.property_bankmandateName = data.mh_bankmandate;
      }
      if (files.property_gst_tin) {
        let property_gst_tineObj = JSON.parse(
          JSON.stringify(files)
        ).property_gst_tin;
        if (property_gst_tineObj) {
          let property_gst_tinName = `${
            data.property_name
          }_${new Date().getTime()}_${property_gst_tineObj.originalFilename}`;
          fs.renameSync(
            property_gst_tineObj.filepath,
            path.join(form.uploadDir, property_gst_tinName)
          );
          docNames.property_gst_tinName = property_gst_tinName;
        } else {
          docNames.property_gst_tinName = data.property_gst_tinName;
        }
      } else {
        docNames.property_gst_tinName = data.mh_gstin;
      }
      //  console.log("route", data,docNames);
      res.json(
        await staffAccPropertyRegistrationMaster.updatePropertyData(
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
  "/updateRoomsData/:txn_id/:partner_id/:partner_sub_id/:property_txn_id",
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
        let data = JSON.parse(fields.room_updatedetails);

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
          await staffAccPropertyRegistrationMaster.updateRoomsData(
            data.txn_id,
            data.partner_id,
            data.partner_sub_id,
            data.property_txn_id,
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
/* DELETE  a Property Registration Master */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await staffAccPropertyRegistrationMaster.remove(req.params.id));
  } catch (err) {
    console.error(
      `Error while deleting Property Registration Master`,
      err.message
    );
    next(err);
  }
});
router.get(
  "/loadPartnersNamesInStaff/partnerNames",
  async function (req, res, next) {
    try {
      res.json(await staffAccPropertyRegistrationMaster.loadPartnerNames());
    } catch (err) {
      console.error(`Error while getting Partners Data `, err.message);
      next(err);
    }
  }
);
router.get(
  "/loadSubPartnersNames/:partner_id",
  async function (req, res, next) {
    try {
      res.json(
        await staffAccPropertyRegistrationMaster.loadSubPartnerNames(
          req.params.partner_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Sub Partners Data `, err.message);
      next(err);
    }
  }
);
router.get(
  "/loadPropertyNames/:partner_id/:partner_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await staffAccPropertyRegistrationMaster.loadPropertyNames(
          req.params.partner_id,
          req.params.partner_sub_id
        )
      );
    } catch (err) {
      console.error(`Error while getting Properties Data `, err.message);
      next(err);
    }
  }
);
router.get(
  "/getHotelInfo/:property_txn_id/:partner_id/:partner_sub_id",
  async function (req, res, next) {
    try {
      res.json(
        await staffAccPropertyRegistrationMaster.getHotelInfo(
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

module.exports = router;
