const express = require("express");
const router = express.Router();
const partnerRegistration = require("../services/partnerRegistration.services");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const dir = require("../resources/filepath");
/* GET All  Partner Registration. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await partnerRegistration.getMultiple());
  } catch (err) {
    console.error(`Error while getting Partner Registration `, err.message);
    next(err);
  }
});
/* GET single Partner Registration. */
router.get("/:id", async function (req, res, next) {
  try {
    res.send(await partnerRegistration.getSingleCropStageDetail(req.params.id));
  } catch (err) {
    console.error(`Error while getting Partner Registration `, err.message);
    next(err);
  }
});
/* POST create a new Partner Registration */
router.post("/", async function(req, res, next) {
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
      let data = JSON.parse(fields.partnerFormDetails);
      // if (files.cancelCheque) {
      //   let cancelCheque_Obj = JSON.parse(JSON.stringify(files)).cancelCheque;
      //   let cancelCheque_name = `${
      //     data.first_name
      //   }_${new Date().getTime()}_${cancelCheque_Obj.originalFilename}`;
      //   fs.renameSync(
      //     cancelCheque_Obj.filepath,
      //     path.join(form.uploadDir, cancelCheque_name)
      //   );
      //   docNames.cancelCheque_name = cancelCheque_name;
      // }
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
   

    res.json(await partnerRegistration.create(fields,files, docNames, ipAddress));n
  });
  } catch (err) {
    console.error(`Error while submitting Partner Registration`, err.message);
    next(err);
  }
});

router.post("/grievanceRegistration", async function(req, res, next) {
  try {
    res.json(await partnerRegistration.grievanceRegistration(req.body));
  } catch (err) {
    console.error(`Error while submitting Partner Registration`, err.message);
    next(err);
  }
});
router.post("/staffRegistration", async function(req, res, next) {
  try {
    res.json(await partnerRegistration.createStaffRegistration(req.body));
  } catch (err) {
    console.error(`Error while submitting Partner Registration`, err.message);
    next(err);
  }
});
router.post("/cityMangerRegistration", async function(req, res, next) {
  try {
    res.json(await partnerRegistration.createCityRegistration(req.body));
  } catch (err) {
    console.error(`Error while submitting Partner Registration`, err.message);
    next(err);
  }
});
/* router.post("/", async function (req, res, next) {
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    let accomdation_partner_documents_loc = dir.accomdation_partner_documents;
    form.uploadDir = accomdation_partner_documents_loc;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    form.parse(req, async (_, fields, files) => {
      let panObj = JSON.parse(JSON.stringify(files)).pancard;
      let addhaarObj = JSON.parse(JSON.stringify(files)).addhaar;
      let gst_tinObj = JSON.parse(JSON.stringify(files)).gst_tin;
      let mh_agreement = JSON.parse(JSON.stringify(files)).mh_agreement;
      let partner_pic = JSON.parse(JSON.stringify(files)).partner_pic;
      let mb_certificate = JSON.parse(JSON.stringify(files)).mb_certificate;
      let property_tax = JSON.parse(JSON.stringify(files)).property_tax;
      let fire_safety = JSON.parse(JSON.stringify(files)).fire_safety;
      fs.renameSync(
        panObj.filepath,
        path.join(form.uploadDir, panObj.originalFilename)
      );
      fs.renameSync(
        addhaarObj.filepath,
        path.join(form.uploadDir, addhaarObj.originalFilename)
      );
      fs.renameSync(
        gst_tinObj.filepath,
        path.join(form.uploadDir, gst_tinObj.originalFilename)
      );
      fs.renameSync(
        mh_agreement.filepath,
        path.join(form.uploadDir, mh_agreement.originalFilename)
      );
      fs.renameSync(
        partner_pic.filepath,
        path.join(form.uploadDir, partner_pic.originalFilename)
      );
      fs.renameSync(
        mb_certificate.filepath,
        path.join(form.uploadDir, mb_certificate.originalFilename)
      );
      fs.renameSync(
        property_tax.filepath,
        path.join(form.uploadDir, property_tax.originalFilename)
      );
      fs.renameSync(
        fire_safety.filepath,
        path.join(form.uploadDir, fire_safety.originalFilename)
      );
      res.json(await partnerRegistration.create(fields, files));
    });
  } catch (err) {
    console.error(`Error while submitting Partner Registration`, err.message);
    next(err);
  }
}); */
/* PUT Partner Registration */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await partnerRegistration.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Partner Registration`, err.message);
    next(err);
  }
});
/* DELETE  Partner Registration */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await partnerRegistration.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Partner Registration`, err.message);
    next(err);
  }
});

module.exports = router;
