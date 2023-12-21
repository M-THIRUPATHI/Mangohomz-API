const express = require("express");
const router = express.Router();
const userAccount = require("../services/userAccount");
const request = require('request');
const otpGenerator = require('otp-generator');

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await userAccount.getMultiple());
  } catch (err) {
    console.error(`Error while getting User Accounts `, err.message);
    next(err);
  }
});
router.get("/:id", async function (req, res, next) {
  try {
    // res.json(await userAccount.getSingleAccount(req.params.id));
    res.send(await userAccount.getSingleAccount(req.params.id));
    //lop
  } catch (err) {
    console.error(`Error while getting User Accounts `, err.message);
    next(err);
  }
});
/* POST User Accounts */
router.post("/register", async function (req, res, next) {
  try {
    res.json(await userAccount.create(req.body));
  } catch (err) {
    console.error(`Error while creating User Account`, err.message);
    next(err);
  }
});
router.put("/updateOtpData/:mobile_no/:user_code", async function (req, res, next) {
  try {
    res.json(await userAccount.updateOtpData(req.params.mobile_no, req.params.user_code, req.body));
  } catch (err) {
    console.error(`Error while Login User Account`, err.message);
    next(err);
  }
});
router.post("/userLogin", async function (req, res, next) {
  //Generate OTP
  const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
  request(`http://api.bulksmsgateway.in/sendmessage.php?user=admin@sedots.com&password=Sms@sedots2020&mobile=${req.body.phone}&message=Dear Partner, ${otp} is OTP to login. Do not share this OTP with anyone Mangohomz&sender=SEDOTS&type=3&template_id=1207166316183458199`, { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
  });
  try {
    res.json(await userAccount.userLogin(req.body, otp));
  } catch (err) {
    console.error(`Error while Login User Account`, err.message);
    next(err);
  }
});
router.post("/login", async function (req, res, next) {
  try {
    res.json(await userAccount.login(req.body));
  } catch (err) {
    console.error(`Error while Login`, err.message);
    next(err);
  }
});
// router.post("/partnerLogin", async function (req, res, next) {
//   try {
//     res.json(await userAccount.partnerLogin(req.body));
//   } catch (err) {
//     console.error(`Error while Login`, err.message);
//     next(err);
//   }
// });

router.put("/userApproval", async function (req, res, next) {
  try {
    res.json(await userAccount.approveUser(req.body));
  } catch (err) {
    console.log(`Error while approving the users`, err.message);
    next(err);
  }
});
/* PUT UserAccounts */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await userAccount.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating User Account`, err.message);
    next(err);
  }
});
/* DELETE User Account */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await userAccount.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting User Account`, err.message);
    next(err);
  }
});

//get menus user wise
router.get("/getUserMenus/:role/:sub_role", async function (req, res, next) {
  try {
    res.json(await userAccount.getUserMenus(req.params.role,req.params.sub_role));
  } catch (err) {
    console.error(`Error while getting User Menus `, err.message);
    next(err);
  }
});

module.exports = router;
