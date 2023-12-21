const express = require("express");
const router = express.Router();
const mhGenieMaster = require("../services/mhGenieMaster.services");

router.post("/userSignupDetails", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  try {
    const result = await mhGenieMaster.userSignupDetails(req.body, ipAddress);
    res.json(result);
  } catch (err) {
    console.error(`Error while submitting user Signup details`, err.message);
    next(err);
  }
});

router.post("/mhgenieLogin", async function (req, res, next) {
  try {
    res.json(await mhGenieMaster.mhgenieLogin(req.body));
  } catch (err) {
    console.error(`Error while Login`, err.message);
    next(err);
  }
});

router.post("/savePatientDetails", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  try {
    const result = await mhGenieMaster.savePatientDetails(req.body, ipAddress);
    res.json(result);
  } catch (err) {
    console.error(`Error while submitting Patient details`, err.message);
    next(err);
  }
});

router.get("/getPatientDetails", async function (req, res, next) {
  try {
    res.json(await mhGenieMaster.getPatientDetails());
  } catch (err) {
    console.error(`Error while getting Patient Details`, err.message);
    next(err);
  }
});

router.get("/getgenieuserdetails", async function (req, res, next) {
  try {
    res.json(await mhGenieMaster.getgenieuserdetails());
  } catch (err) {
    console.error(`Error while getting Patient Details`, err.message);
    next(err);
  }
});


module.exports = router;
