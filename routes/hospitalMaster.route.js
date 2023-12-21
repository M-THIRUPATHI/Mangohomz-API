const express = require("express");
const router = express.Router();
const hospitalMaster = require("../services/hospitalMaster.services");

//Route created for saving the Hospital Details 
router.post("/savingHospitalDetails", async function (req, res,next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  try {
    const message = await hospitalMaster.createHospitalDetails(req.body,ipAddress);
    res.json({ message });
  } catch (err) {
    console.error(`Error while creating Hospital Details Master`, err.message);
    next(err);
  }
  });
 
router.get("/:city_id", async function (req, res, next) {
  try {
    res.json(await hospitalMaster.getMultiple(req.params.city_id));
  } catch (err) {
    console.error(`Error while loading Near Hospitals `, err.message);
    next(err);
  }
});

//Route created for Hospital Master Get Method 

// router.get("/loadHospitalMasterDetails", async function (req, res, next) {
//   console.log("hospital master");
//   try {
//     res.json(await hospitalMaster.loadHospitalMasterDetails());
//   }
//   catch (err) {
//     console.error(
//       `Error while getting Transport Partners Data`,
//       err.message
//     );
//     next(err);
//   }
// });


//Route for Updating Hospital master Details 
router.put("/updateHospitalData/:near_hospital_id", async function (req, res, next) {
  try {
    //console.log("dhaudhs",req.params,req.body)
    res.json(await hospitalMaster.updateHospitalData(req.params.near_hospital_id,req.body));
    //console.log(req);
    //console.log(response.json())
  } catch (err) {
    console.error(`Error while Updating Near HospitalMasterDetails `, err.message);
    next(err);
  }
});


module.exports = router;
