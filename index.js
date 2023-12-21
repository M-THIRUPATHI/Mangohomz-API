const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");


const helmet = require("helmet");
const zip = require("express-easy-zip");
require("dotenv").config();
console.log(process.env.PORT);
const port = process.env.PORT || 3002;
const d = new Date();
// iniziate routes
const customerRegistration = require("./routes/customerRegistration.route"); 
const facilityMaster = require("./routes/facilityMaster.route");
const partnerRegistration = require("./routes/partnerRegistration.route"); 
const userAccount = require("./routes/userAccount");
const propertyRegistrationMaster = require("./routes/propertyRegistrationMaster.route");
const AgentPage = require("./routes/agentReg.route");
const TranspoterPage = require("./routes/transportRegReg.route");
const dropdown = require("./routes/dropdown");
const propertyTypeMaster = require("./routes/propertyTypeMaster.route");
const roomTypeMaster = require("./routes/roomTypeMaster.route");
const roomManagementMaster = require("./routes/roomManagementMaster.route");
const stateMaster = require("./routes/stateMaster.route");
const cityMaster = require("./routes/cityMaster.route");
const hospitalMaster = require("./routes/hospitalMaster.route");
const mostRecentSearch = require("./routes/mostRecentSearch.route");
const roomType = require("./routes/roomType.route");
const propertyName = require("./routes/propertyName.route");
const foodPartner = require("./routes/foodPartner.route");
const foodPartnerAccomodation = require("./routes/foodPartnerAccomodation.route");
const equipmentPartner = require("./routes/equipmentPartner.route");
const equipmentMedicalPartner = require("./routes/equipmentMedicalPartner.route");
const approvalPartner = require("./routes/approval.route");
const hotelManagement = require("./routes/hotel.routes");
const citiesOfState = require("./routes/citiesOfState.route");
const staffAccPartnersData = require("./routes/staffAccPartnersData.route");
const staffTranspoterApi = require("./routes/staffTranspoterApi.route");
const propertiesMaster = require("./routes/propertiesMaster.route");
const booking = require("./routes/bookings.route");
const mhOffers = require("./routes/mhOffers.route");
const foodItemList = require("./routes/foodItemList.route");
const equipmentItemList = require("./routes/equipmentItemList.route");
const cancelled = require("./routes/cancelled.route.js");
const centeraccounts = require("./routes/centeraccounts.route.js");
const paymentIntegration = require("./routes/paymentgateway.route");
const medicalItemList = require("./routes/medicalItemList.route");
const adminDashboard = require("./routes/adminDashboard.route");
const mhGenieMaster = require("./routes/mhGenieMaster.route");


app.use(cors()); //middle-ware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(helmet());
app.use(zip());
app.use(express.json());

//use rouets api
app.use("/medicalItemList", medicalItemList);
app.use("/userAccount", userAccount);
app.use("/dropdown", dropdown); 
app.use("/foodItemList", foodItemList);
app.use("/equipmentItemList", equipmentItemList);
app.use("/customerRegistration", customerRegistration);
app.use("/facilityMaster", facilityMaster);
app.use("/partnerRegistration", partnerRegistration);
app.use("/roomManagementMaster", roomManagementMaster);
app.use("/propertyTypeMaster", propertyTypeMaster);
app.use("/roomTypeMaster", roomTypeMaster);
app.use("/propertyRegistrationMaster", propertyRegistrationMaster);
app.use("/staffAccPartnersData", staffAccPartnersData);
app.use("/staffTranspoterApi", staffTranspoterApi);
app.use("/stateMaster", stateMaster);
app.use("/cityMaster", cityMaster);
app.use("/hospitalMaster", hospitalMaster);
app.use("/mostRecentSearch", mostRecentSearch);

app.use("/roomType", roomType);
app.use("/propertyName", propertyName);
app.use("/agentApi", AgentPage);
app.use("/transporterApi", TranspoterPage);
app.use("/foodPartner", foodPartner);
app.use("/foodPartnerAccomodation", foodPartnerAccomodation);
app.use("/equipmentPartner", equipmentPartner);
app.use("/equipmentMedicalPartner", equipmentMedicalPartner);
app.use("/approvePartner", approvalPartner);
app.use("/hotelManagement", hotelManagement);
app.use("/citiesOfState", citiesOfState);
app.use("/propertiesMaster", propertiesMaster);
app.use("/booking", booking);
app.use("/cancelled", cancelled);
app.use("/centeraccounts", centeraccounts);
app.use("/razorPayPayment", paymentIntegration);
app.use("/mhOffers", mhOffers);
app.use("/adminDashboard", adminDashboard);
app.use("/mhGenieMaster", mhGenieMaster);

/* Error handler middleware */
app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, console.log(`${d}-Server is Started on port:${port}`));
app.get(`/`, (request, response) => {
  response.send(
    `<h1 style="background-color:DodgerBlue;color:white;text-align:center;">MH api  is Running..</h1>`
  );
});
