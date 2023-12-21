const express = require("express");
const router = express.Router();
const adminDashboard = require("../services/adminDashboard.services");
const request = require("request");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const dir = require("../resources/filepath");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "mail.mangohomz.com",
  port: 465,
  auth: {
    user: "noreply@mangohomz.com",
    pass: "F0PZ}!]espo2",
  },
});

//Onkar get PArtner registration All DAta
router.get(
  "/getPartnerRegistartionAllForAdmin",
  async function (req, res, next) {
    try {
      res.json(
        await adminDashboard.getPartnerRegistartionAllForAdmin(req.body)
      );
    } catch (err) {
      console.error(
        `Error while getting Partner Registration Data`,
        err.message
      );
      next(err);
    }
  }
);
//Onkar get Agent registration All DAta
router.get("/getAgentRegistartionAllForAdmin", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getAgentRegistartionAllForAdmin(req.body));
  } catch (err) {
    console.error(`Error while getting Agent Registration Data`, err.message);
    next(err);
  }
});
//Onkar get property details Data
router.get("/getpropertyDetailsAllForAdmin", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getpropertyDetailsAllForAdmin(req.body));
  } catch (err) {
    console.error(`Error while getting property details Data`, err.message);
    next(err);
  }
});
//Onkar get property Room details Data
router.get("/getpropertyroomtableAllForAdmin", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getpropertyroomtableAllForAdmin(req.body));
  } catch (err) {
    console.error(
      `Error while getting property Room details Data`,
      err.message
    );
    next(err);
  }
});
//Onkar get Property Partner Master details
router.get("/getpropertypartnerAllForAdmin", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getpropertypartnerAllForAdmin(req.body));
  } catch (err) {
    console.error(
      `Error while getting property Room details Data`,
      err.message
    );
    next(err);
  }
});
//Onkar get Agent Master details
router.get("/getagentmasterAllForAdmin", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getagentmasterAllForAdmin(req.body));
  } catch (err) {
    console.error(`Error while getting Agent MAster Data`, err.message);
    next(err);
  }
});
//Onkar get Booking details
router.get("/getBookingAllForAdmin", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getBookingAllForAdmin(req.body));
  } catch (err) {
    console.error(`Error while getting Agent MAster Data`, err.message);
    next(err);
  }
});
router.get("/getBookingAllLiveForAdmin", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getBookingAllLiveForAdmin());
  } catch (err) {
    console.error(`Error while getting Live Booking Data`, err.message);
    next(err);
  }
});
router.get("/getBookingAllUpcomingForAdmin", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getBookingAllUpcomingForAdmin());
  } catch (err) {
    console.error(`Error while getting Live Booking Data`, err.message);
    next(err);
  }
});


//Onkar Get Feedback Data
router.get("/feedbackdata", async function (req, res, next) {
  try {
    res.json(await adminDashboard.feedbackdata());
  } catch (err) {
    console.error(`Error while getting Cust Reach Us Data`, err.message);
    next(err);
  }
});

router.get(
  "/getAccommodationCancellationForAdmin",
  async function (req, res, next) {
    try {
      res.json(await adminDashboard.getAccommodationCancellationForAdmin());
    } catch (err) {
      console.error(
        `Error while getting Accommodation Cancellation Data`,
        err.message
      );
      next(err);
    }
  }
);

router.get("/getadminBookingStatusCount", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getadminBookingStatusCount());
  } catch (err) {
    console.error(
      `Error while getting Property Registration Master `,
      err.message
    );
    next(err);
  }
});
router.get(
  "/getadminTravelBookingStatusCount",
  async function (req, res, next) {
    try {
      res.json(await adminDashboard.getadminTravelBookingStatusCount());
    } catch (err) {
      console.error(`Error while getting Travel Status Count `, err.message);
      next(err);
    }
  }
);
router.get(
  "/getBookingAllDisplayForAdmin/:status",
  async function (req, res, next) {
    try {
      res.json(
        await adminDashboard.getBookingAllDisplayForAdmin(req.params.status)
      );
    } catch (err) {
      console.error(
        `Error while getting Partner Registration Data`,
        err.message
      );
      next(err);
    }
  }
);
router.get(
  "/getTravelBookingAllDisplayForAdmin/:status",
  async function (req, res, next) {
    try {
      res.json(
        await adminDashboard.getTravelBookingAllDisplayForAdmin(
          req.params.status
        )
      );
    } catch (err) {
      console.error(`Error while getting Travel Booking Data`, err.message);
      next(err);
    }
  }
);
router.get("/getMonthwiseAccBookings", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getMonthwiseAccBookings());
  } catch (err) {
    console.error(
      `Error while getting MonthWise ACC Booking Data`,
      err.message
    );
    next(err);
  }
});
router.get("/getMonthwiseAccCancellations", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getMonthwiseAccCancellations());
  } catch (err) {
    console.error(
      `Error while getting MonthWise ACC Cancellation Data`,
      err.message
    );
    next(err);
  }
});

router.get("/gethospitalmasterDetails", async function (req, res, next) {
  try {
    res.json(await adminDashboard.gethospitalmasterDetails());
  } catch (err) {
    console.error(
      `Error while getting Hospital Data`,
      err.message
    );
    next(err);
  }
});
router.get("/getpropertymasterDetails", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getpropertymasterDetails());
  } catch (err) {
    console.error(
      `Error while getting Property Data`,
      err.message
    );
    next(err);
  }
});
router.post("/paymentForPartnerSaving", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  try {
    const form = new formidable.IncomingForm();
    formidable.keepExtensions = true;
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }
    let docNames = {};
    form.parse(req, async (_, fields, files) => {
      let data = JSON.parse(fields.paymentPayForm_details);
      // console.log("payment",data)
      res.json(await adminDashboard.paymentForPartnerSaving(data, ipAddress));
    });
  } catch (err) {
    console.error(`Error while Inserting Payment Details`, err.message);
    next(err);
  }
});

router.put("/sendSMSToUserRoutes", async function (req, res, next) {
  request(
    `http://api.bulksmsgateway.in/sendmessage.php?user=Mangohomzz&password=Mangohomzz@123&mobile=${req.body.phone_no}&message=Dear ${req.body.guestData[0].guest_name} Thank you for your Booking at MANGOHOMZ. Your MH Booking ID is ${req.body.booking_order_id}. Details are sent to your registered mail ID. For any assistance, please Call MH Care Number 8929982655. Thank you -Team MANGOHOMZ. Stay Well - Get Well&sender=MGHOMZ&type=3&template_id=1007248456060570234`,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
    }
  );
});
router.put("/sendSMSToPartnerRoutes", async function (req, res, next) {
  request(
    `http://api.bulksmsgateway.in/sendmessage.php?user=Mangohomzz&password=Mangohomzz@123&mobile=${req.body.property_phone}&message=Dear Partner, Guest MH Booking ID is ${req.body.booking_order_id} Scheduled on Date: ${req.body.check_in}. Please ensure all necessary arrangements to serve Guests. For any assistance, please Call MH Care Number 8929982655. Thank you @Team MANGOHOMZ. Stay Well | Get Well&sender=MGHOMZ&type=3&template_id=1007715654595331304`,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
    }
  );
});
router.put("/sendEmailToUserRoutes", async function (req, res, next) {
  //console.log("Emails", req.body);

  const myArray = req.body.guestData;
  myArray.forEach((element, index, array) => {
    // console.log("element.x", element.sno);
    // console.log("element.guesy", element.guest_name);
    // console.log("element.guesy", element.guest_gender);
    // console.log("index", index);
    // console.log("array", array);
  });

  var newArraySNO = myArray.map((element) => element.sno);

  var nameListSNO = newArraySNO.splice(0, req.body.guestData.length);

  var separateListSNO =
    '<ul class="no-bullets" style="list-style-type: none;margin: 0;padding: 0;">';
  nameListSNO.forEach(function (value) {
    separateListSNO += "<li>" + value + "</li>";
  });
  separateListSNO += "</ul>";
  // GUEST NAME
  var totalGuestName = myArray.map(
    (element) => element.guest_gender + element.guest_name
  );

  var listGuestName = totalGuestName.splice(0, req.body.guestData.length);

  var separateListGuest =
    '<ul class="no-bullets" style="list-style-type: none;margin: 0;padding: 0;">';
  listGuestName.forEach(function (value) {
    separateListGuest += "<li>" + value + "</li>";
  });
  separateListGuest += "</ul>";
  var mailOptions = {
    from: "noreply@mangohomz.com",
    to: req.body.email_id,
    // bcc: 'forward@mangohomz.com',
    subject: `Booking Confirmed / ${req.body.property_name}/ ${req.body.booking_order_id} `,
    html: `
          <div style="border:1px solid grey;>
            <div style="box-shadow:2px 2px 10px 2px grey;">
              <div style="display:flex;">
                <div style="display:flex; width:100%;">
                  <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a>
                </div>
                <div style="font-weight:700;margin-top: 42px;margin-right: 6px;margin-left:300px">
                  <p><a target="_blank" href="https://mangohomz.com" style="color:darkblue">www.mangohomz.ai</a></p>
                </div>
              </div>
              <div style="display:flex;">
                <div style="height: 5px;width: 70%;background-color:green;"></div>
                <div style="height: 5px;width: 30%;background-color:darkblue;"></div>
              </div>
              <div style="padding:10px">
                <div>
                  Greetings, <span style="font-weight:700">  ${
                    req.body.guestData[0].guest_name
                  } Ji</span>,
                </div>
                <div style="margin: 5px 0px">
                <p>We're glad you've placed your trust in MangoHomz and have chosen us as your preferred Medical trip partner. We are pleased to confirm that <b>${
                  req.body.property_name
                }</b> Near <b>(${
      req.body.near_hospital_name
    }</b>)has been reserved under your name. While you're busy preparing for your trip, our teams are constantly working towards providing patient-friendly stay for you.</p>
                </div>
                <div style="border:2px solid grey; background-color:white">
                  <div>
                    <div style="margin:10px 0 20px 18px">
                      <div style="color:white">Thank you for booking with us.</div>
                      <div style="color:white">
                        <b>Your booking at ${
                          req.body.property_name
                        } is confirmed.</b>
                      </div>
                    </div>


                    <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px">
                      <ul>
                      <li style="color:black;">
                      Your booking at <b>${
                        req.body.property_name
                      } </b> from <b>${req.body.check_in}(${
      req.body.checkIn_time
    })<b> to <b>${req.body.check_out}(${req.body.checkOut_time})</b> for <b> ${
      req.body.guestData.length
    } <b> guests is confirmed. You have reserved ${
      req.body.room_booked_count
    } room(s)for <b> ${req.body.no_of_days}</b> nights.
                    </li>
                    <li style="color:black">
                      You have paid amount of INR <b>${
                        req.body.total_price
                      }</b>.
                    </li>
                        <li style="color:blue;font-weight:700">
                        MANGOHOMZ (MH) strict Accommodation cancellation policy allows MangoHomz Guests, to receive a full refund, Only if the cancellation of Accommodation booking happens 3 days before the check-in date. And any cancellation happens between 3 days and 24hrs before check-in the guest will be entitled to get only 60% refund And if the Cancellation happens within in 24hrs till check-in time then Guests will get 25% refund after all necessary tax deductions applicable. Once checked in there is no cancellation.
                          
                        </li>
                      </ul>
                    </div>




                    <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
                    <div style="font-size:15px;font-family:verdana;"><b>Accommodation Booking Details</b></div>



                    <table style="width:100%">
                    <style>
                    table, th, td {
                    border:1px solid black;
                    }
                    td {
                    text-align:left;
                    padding:2px;
                    }
                    </style>
                    
                    <tr>
                      <td> Booking ID :<b> 
                      ${req.body.booking_order_id}</b></td>
                      <td>Booked Date : <b> ${req.body.booked_date} </b></td>
                    </tr>
                    <tr>
                      <td>Customer Name :   <b> 
                      ${req.body.guestData[0].guest_name}</b></td>
                      <td v-if="
                      ${req.body.gstin_no} != ''"> 
                      Customer City/State :<b> 
                     ${req.body.city}/${req.body.state}
                      </b></td>
                    </tr>
                    <tr>
                    <td> Near Hospital Name :<b> 
                    ${req.body.near_hospital_name} </b></td>
                    <td>  Property Name : <b>${req.body.property_name}</b></td>
                    </tr>
                    <tr>
                    <td> Property Type :<b> 
                    ${req.body.property_type}</b></td>
                    <td>  Property Address:
                    <b>${req.body.address} </b></td>
                    </tr>
                    <tr>
                    <td> Room Type :<b> 
                    ${req.body.room_type}</b></td>
                    <td> Room Category:
                    <b>${req.body.room_category} </b></td>
                    </tr>
                    <tr>
                    <td> Check In Date/Time :<b> 
                    ${req.body.check_in}/${req.body.checkIn_time}</b></td>
                    <td>  Check Out Date/Time :
                    <b>${req.body.check_out}/${req.body.checkOut_time} </b></td>
                    </tr>
                    <tr>
                    <td>Total No. Of Room:<b> 
                    ${req.body.room_booked_count}</b></td>
                    <td>Number Of Night:
                    <b>${req.body.no_of_days}</b></td>
                    </tr>
                   
                    <tr>
                    <td> Primary No :<b> 
                    ${req.body.primary_no}</b></td>
                    <td>Alternate Number :
                    <b>${req.body.phone_no}</b></td>
      
                    </tr>
                    <tr>
                    <td> Room Amenities :<b> 
                    ${req.body.facilities}</b></td>
                    <td  v-if="
                    ${req.body.gstin_no} != ''"> 
                    Customer GSTIN/State :   <b>${req.body.gstin_no} </b></td>
                    
                    </tr>
                   
                    </table>
                  </div>
              </div>

              
              <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
              <div style="font-size:15px;font-family:verdana;"><b>Accommodation Booking Guests Details</b></div>
              <div class="row col-12"
              style="display:flex;width:100%;text-align:center;border-top: 1px solid silver;">
              <div class="col-2 text-left" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
            width:20%;
            padding-top:5px;padding-bottom:5px;">
                <b>Sl no</b>
              </div>
              <div class="col-10 text-right" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;padding-left: 10px;
            width:80%;
            padding-top:5px;padding-bottom:5px;">
                <b>Guest Name</b>
              </div>
            </div>
            <div class="row col-12"
            style="display: flex; width: 100%; text-align: center;">
              <div  class="no-bullets" style="
              text-align: center;
              border-bottom: 1px solid silver;
              border-right: 1px solid silver;
              border-left: 1px solid silver;
              padding-top: 5px;
              width:20%;
              padding-bottom: 5px;line-height:180%
            " >
            ${separateListSNO}
              </div>
              <div class="no-bullets" style="
              text-align: center;
              border-bottom: 1px solid silver;border-right: 1px solid silver;
              padding-left: 10px;
              width:80%;
              padding-top: 5px;
              padding-bottom: 5px;line-height:180%
            ">${separateListGuest}
              </div>

              </div>
            </div>
    
    



    
              <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
              <div style="font-size:15px;font-family:verdana;"><b>Accommodation Price Details</b></div>
              <div style="display-flex;width:600px;padding-top:15px;color:black;text-align:center" class="text-center justify-center">
              <div class="row col-12 q-mt-sm" style="border: 1px solid silver;width:500px;text-align:center" class="text-center justify-center">
              <div style="display:flex;width:100%">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
              padding-top:5px;
            ">
                    <b> Price Details</b>
                  </div>
                </div>
                <div style="font-size: 12px; text-align:right;
                margin-right:3px;padding-top:5px;width:40%">
                  <b> Amount (₹) </b>
                </div>
              </div>
              <div style="display:flex;width:100%; border-top:1px solid silver">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
             margin-left:3px;
              padding-top:5px;
            ">
                    Room Price
                  </div>
                </div>
                <div class="text-subtitle" style="
              font-size: 12px;
              text-align:right;
              margin-right:3px;
              padding-top:5px;width:40%
            ">
            ₹${req.body.room_price}
                </div>
              </div>

              <div style="display:flex;width:100%;">
              <div style="width:60%">
                <div class="text-subtitle" style="
            font-size: 12px;
           text-align:left;
           margin-left:3px;
            padding-top:5px;
          ">
          Partner Offer 
         
                  :
                </div>
              </div>

              <div class="text-subtitle" style="
            font-size: 12px;
            text-align:right;
            margin-right:3px;
            padding-top:5px;width:40%
          ">
                (-) ₹${req.body.partner_offer}
              </div>
            </div>

              <div style="display:flex;width:100%;">
              <div style="width:60%">
                <div class="text-subtitle" style="
            font-size: 12px;
            text-align:left;
            margin-left:3px;
            padding-top:5px;
          ">
        Base Price
         
                  :
                </div>
              </div>

              <div class="text-subtitle" style="
            font-size: 12px;
            text-align:right;
              margin-right:3px;
            padding-top:5px;width:40%
          ">
                (-) ₹${req.body.base_price}
              </div>
            </div>

          
              <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
              padding-top:5px;
            ">
            Early Bird Offer
            

                    :
                  </div>
                </div>

                <div class="text-subtitle" style="
              font-size: 12px;
              text-align:right;
              margin-right:3px;
              padding-top:5px;width:40%
            ">
                  (-) ₹${req.body.discount_price}
                </div>
              </div>
              <div style="display:flex;width:100%;">
                <div style="width:60%" v-if="
                ${req.body.usedOffer_name} !=
                  ''
                ">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
              padding-top:5px
            ">
                    Applied MH Offer :
                    ${req.body.usedOffer_name}
                  </div>
                </div>

                <div class="text-subtitle"
                  style="font-size: 12px; text-align:right;
                  margin-right:3px;padding-top:5px;width:40%" v-if="
                  ${req.body.usedOffer_price} !=
                    ''
                  ">
                  (-) ₹${req.body.usedOffer_price}

                </div>
              </div>
              <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
              padding-top:5px;
            " v-if="
            ${req.body.usedOffer_price} !=
              ''
            "
            >
                    Price After Discount
                  </div>
                </div>
                <div class="text-subtitle"
                  style="font-size: 12px; text-align:right;
                  margin-right:3px;padding-top:5px;width:40%" v-if="
                  ${req.body.usedOffer_price} !=
                    ''
                  ">
                  ₹${req.body.price_after_discount}
                </div>
              </div>




              <div style="display:flex;width:100%;">
                 <div style="width:60%">
                  <div class="text-subtitle " style="
              font-size: 12px;
              text-align:left;
              margin-left:3px;
               padding-top:5px;
             ">
             Taxes 
                   </div>
                </div>
                <div class="text-subtitle"
                  style="font-size: 12px; text-align:right;
                 margin-right:3px;padding-top:5px;width:40%">
                 ₹${req.body.gst_amount}
                 </div>
               </div>

               <div style="display:flex;width:100%;">
               <div style="width:60%">
                <div class="text-subtitle text-bold " style="
            font-size: 14px;
            text-align:left;
            margin-left:3px;
             padding-top:5px;
           ">
           Convenience Fee
                 </div>
              </div>
              <div class="text-subtitle text-bold"
                style="font-size: 14px; text-align:right;
               margin-right:3px;padding-top:5px;width:40%">
               ₹${"0"}
               </div>
             </div>

              <div style="display:flex;width:100%;">
                <div style="width:60%">
                  <div class="text-subtitle" style="
              font-size: 15px;
              text-align:left;
              margin-left:3px;
              padding-top:5px;
            ">
                    Total Price
                  </div>
                </div>
                <div class="text-subtitle"
                  style="font-size: 12px; text-align:right;
                  margin-right:3px;padding-top:5px;width:40%">
                  <strong>
                  ₹${req.body.total_price}
                    /-
                  </strong>
                </div>
              </div>
               
            </div>
              </div>
        </div>

                  </div>
                </div>



                
                <div style="margin:10px 0px 0px 0px">
                  <div>Thank You.</div>
                  <div style="font-weight:700;">TEAM MANGOHOMZ</div>
                </div>
              <div style="display:flex;">
                <div style="height: 5px;width: 100%;background-color:darkblue;"></div>
              </div>
              <div style="display:flex;">
                <div>
                  <h6 style="margin:5px 0px 2px 4px">JOIN AND BE A PART OF A NATIONWIDE NETWORK</h6>
                  <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a>
                  <h6 style="margin:5px 0px 2px 4px">NOBODY HANDLES MEDICAL STAYS LIKE WE DO</h6>
                </div>
                <div style="margin:5px 0px 2px 150px">
                  <div>
                    <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai </a>
                  </div>
                  <div style="display:flex;">
                    <div>
                      <a href="https://www.facebook.com/Mangohomzpage/" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/facebook.png" alt=""  width="30px" height="30px" style="margin-top: 7px;"></a>
                    </div>
                    <div>
                      <a href="https://mobile.twitter.com/mangohomz" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/twitter.png" alt=""  width="36px" height="36px" style="margin-top: 4px;"></a>
                    </div>
                    <div>
                      <a href="https://instagram.com/mangohomz" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/instagram.png" alt=""  width="30px" height="30px" style="margin-top: 7px;"></a>
                    </div>
                    <div>
                      <a href="https://linkedin.com/company/mangohomz" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/linkedin.png" alt=""  width="36px" height="36px" style="margin-top: 4px;"></a>
                    </div>
                    <div>
                      <a href="https://www.youtube.com/channel/UCWAmQdY8g8AYI_Yojr8OYlA" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/youtube.png" alt=""  width="30px" height="30px" style="margin-top: 7px;"></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>

            </div>
      `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Succ", info.response);
    }
  });
});

router.put("/sendEmailToPartnerRoutes", async function (req, res, next) {
 // console.log("Emails", req.body);

  const myArray = req.body.guestData;
  myArray.forEach((element, index, array) => {
    console.log("element.x", element.sno);
    console.log("element.guesy", element.guest_name);
    console.log("element.guesy", element.guest_gender);
    console.log("index", index);
    console.log("array", array);
  });

  var newArraySNO = myArray.map((element) => element.sno);

  var nameListSNO = newArraySNO.splice(0, req.body.guestData.length);

  var separateListSNO =
    '<ul class="no-bullets" style="list-style-type: none;margin: 0;padding: 0;">';
  nameListSNO.forEach(function (value) {
    separateListSNO += "<li>" + value + "</li>";
  });
  separateListSNO += "</ul>";
  // GUEST NAME
  var totalGuestName = myArray.map(
    (element) => element.guest_gender + element.guest_name
  );

  var listGuestName = totalGuestName.splice(0, req.body.guestData.length);

  var separateListGuest =
    '<ul class="no-bullets" style="list-style-type: none;margin: 0;padding: 0;">';
  listGuestName.forEach(function (value) {
    separateListGuest += "<li>" + value + "</li>";
  });
  separateListGuest += "</ul>";
  var mailOptions1 = {
    from: "noreply@mangohomz.com",
    to: req.body.property_email,
    //  bcc: 'forward@mangohomz.com',
    subject: `Booking Confirmed / ${req.body.property_name}/ ${req.body.booking_order_id} `,
    html: `
        <div style="border:1px solid grey;>
          <div style="box-shadow:2px 2px 10px 2px grey;">
            <div style="display:flex;">
              <div>
                <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a>
              </div>
              <div style="font-weight:700;margin-top: 42px;margin-right: 6px;margin-left:300px">
                <p><a target="_blank" href="https://mangohomz.com" style="color:darkblue">www.mangohomz.ai</a></p>
              </div>
            </div>
            <div style="display:flex;">
              <div style="height: 5px;width: 70%;background-color:green;"></div>
              <div style="height: 5px;width: 30%;background-color:darkblue;"></div>
            </div>
            <div style="padding:10px">
            <div>
            Dear, <span style="font-weight:700">${req.body.property_name}</span>,
          </div>
              <div>
                Greetings!!
              </div>
              <div style="margin: 5px 0px">
              <p>Please be informed that  <span style="font-weight:700"><b> 
              ${
                req.body.guestData[0].guest_name
              }</span>,  has reserved  ${req.body.room_booked_count} room at the  <b>${
      req.body.property_name
    }</b>. Please find the guest's credentials below.</p>
              </div>
          
              <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
              <div style="font-size:15px;font-family:verdana;"><b>Accommodation Booking Details</b></div>



              <table style="width:100%">
              <style>
              table, th, td {
              border:1px solid black;
              }
              td {
              text-align:left;
              padding:2px;
              }
              </style>
              
              <tr>
                <td> Booking ID :<b> 
                ${req.body.booking_order_id}</b></td>
                <td>Booked Date : <b> ${req.body.booked_date} </b></td>
              </tr>
              <tr>
                <td>Customer Name :   <b> 
                ${  req.body.guestData[0].guest_name}</b></td>
                <td v-if="
                ${req.body.gstin_no} != ''"> 
                Customer City/State :<b> 
               ${req.body.city}/${req.body.state}
                </b></td>
              </tr>
              <tr>
              <td> Near Hospital Name :<b> 
              ${req.body.near_hospital_name} </b></td>
              <td>  Property Name : <b>${req.body.property_name}</b></td>
              </tr>
              <tr>
              <td> Property Type :<b> 
              ${req.body.property_type}</b></td>
              <td>  Property Address:
              <b>${req.body.address} </b></td>
              </tr>
              <tr>
              <td> Room Type :<b> 
              ${req.body.room_type}</b></td>
              <td> Room Category:
              <b>${req.body.room_category} </b></td>
              </tr>
              <tr>
              <td> Check In Date/Time :<b> 
              ${req.body.check_in}/${req.body.checkIn_time}</b></td>
              <td>  Check Out Date/Time :
              <b>${req.body.check_out}/${req.body.checkOut_time} </b></td>
              </tr>
              <tr>
              <td>Total No. Of Room:<b> 
              ${req.body.room_booked_count}</b></td>
              <td>Number Of Night:
              <b>${req.body.no_of_days}</b></td>
              </tr>
             
              <tr>
              <td> Primary No :<b> 
              ${req.body.primary_no}</b></td>
              <td>Alternate Number :
              <b>${req.body.phone_no}</b></td>

              </tr>
              <tr>
              <td> Room Amenities :<b> 
              ${req.body.facilities}</b></td>
              <td  v-if="
              ${req.body.gstin_no} != ''"> 
              Customer GSTIN/State :   <b>${req.body.gstin_no} </b></td>
              
              </tr>
             
              </table>
            </div>
        </div>


            
        
        <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
        <div style="font-size:15px;font-family:verdana;"><b>Accommodation Booking Guests Details</b></div>
        <div class="row col-12"
        style="display:flex;width:100%;text-align:center;border-top: 1px solid silver;">
        <div class="col-2 text-left" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;border-left: 1px solid silver;
      width:20%;
      padding-top:5px;padding-bottom:5px;">
          <b>Sl no</b>
        </div>
        <div class="col-10 text-right" style="text-align: center;border-bottom: 1px solid silver;border-right: 1px solid silver;padding-left: 10px;
      width:80%;
      padding-top:5px;padding-bottom:5px;">
          <b>Guest Name</b>
        </div>
      </div>
      <div class="row col-12"
      style="display: flex; width: 100%; text-align: center;">
        <div  class="no-bullets" style="
        text-align: center;
        border-bottom: 1px solid silver;
        border-right: 1px solid silver;
        border-left: 1px solid silver;
        padding-top: 5px;
        width:20%;
        padding-bottom: 5px;line-height:180%
      " >
      ${separateListSNO}
        </div>
        <div class="no-bullets" style="
        text-align: center;
        border-bottom: 1px solid silver;border-right: 1px solid silver;
        padding-left: 10px;
        width:80%;
        padding-top: 5px;
        padding-bottom: 5px;line-height:180%
      ">${separateListGuest}
        </div>

        </div>
      </div>


  

  
            <div style="background-color:f3f3f3;padding:5px;margin:auto;width:750px;border-radius:10px;margin-bottom:15px;color:black;">
            <div style="font-size:15px;font-family:verdana;"><b>Accommodation Price Details</b></div>
            <div style="display-flex;width:600px;padding-top:15px;color:black;text-align:center" class="text-center justify-center">
            <div class="row col-12 q-mt-sm" style="border: 1px solid silver;width:500px;text-align:center" class="text-center justify-center">
            <div style="display:flex;width:100%">
              <div style="width:60%">
                <div class="text-subtitle" style="
            font-size: 12px;
            text-align:left;
            margin-left:3px;
            padding-top:5px;
          ">
                  <b> Price Details</b>
                </div>
              </div>
              <div style="font-size: 12px; text-align:right;
              margin-right:3px;padding-top:5px;width:40%">
                <b> Amount (₹) </b>
              </div>
            </div>
            <div style="display:flex;width:100%; border-top:1px solid silver">
              <div style="width:60%">
                <div class="text-subtitle" style="
            font-size: 12px;
            text-align:left;
           margin-left:3px;
            padding-top:5px;
          ">
                  Room Price
                </div>
              </div>
              <div class="text-subtitle" style="
            font-size: 12px;
            text-align:right;
            margin-right:3px;
            padding-top:5px;width:40%
          ">
          ₹${req.body.room_price}
              </div>
            </div>

            <div style="display:flex;width:100%;">
            <div style="width:60%">
              <div class="text-subtitle" style="
          font-size: 12px;
         text-align:left;
         margin-left:3px;
          padding-top:5px;
        ">
        Partner Offer 
       
                :
              </div>
            </div>

            <div class="text-subtitle" style="
          font-size: 12px;
          text-align:right;
          margin-right:3px;
          padding-top:5px;width:40%
        ">
              (-) ₹${req.body.partner_offer}
            </div>
          </div>

            <div style="display:flex;width:100%;">
            <div style="width:60%">
              <div class="text-subtitle" style="
          font-size: 12px;
          text-align:left;
          margin-left:3px;
          padding-top:5px;
        ">
      Base Price
       
                :
              </div>
            </div>

            <div class="text-subtitle" style="
          font-size: 12px;
          text-align:right;
            margin-right:3px;
          padding-top:5px;width:40%
        ">
              (-) ₹${req.body.base_price}
            </div>
          </div>

        
            <div style="display:flex;width:100%;">
              <div style="width:60%">
                <div class="text-subtitle" style="
            font-size: 12px;
            text-align:left;
            margin-left:3px;
            padding-top:5px;
          ">
          Early Bird Offer
          

                  :
                </div>
              </div>

              <div class="text-subtitle" style="
            font-size: 12px;
            text-align:right;
            margin-right:3px;
            padding-top:5px;width:40%
          ">
                (-) ₹${req.body.discount_price}
              </div>
            </div>
            <div style="display:flex;width:100%;">
              <div style="width:60%" v-if="
              ${req.body.usedOffer_name} !=
                ''
              ">
                <div class="text-subtitle" style="
            font-size: 12px;
            text-align:left;
            margin-left:3px;
            padding-top:5px
          ">
                  Applied MH Offer :
                  ${req.body.usedOffer_name}
                </div>
              </div>

              <div class="text-subtitle"
                style="font-size: 12px; text-align:right;
                margin-right:3px;padding-top:5px;width:40%" v-if="
                ${req.body.usedOffer_price} !=
                  ''
                ">
                (-) ₹${req.body.usedOffer_price}

              </div>
            </div>
            <div style="display:flex;width:100%;">
              <div style="width:60%">
                <div class="text-subtitle" style="
            font-size: 12px;
            text-align:left;
            margin-left:3px;
            padding-top:5px;
          " v-if="
          ${req.body.usedOffer_price} !=
            ''
          "
          >
                  Price After Discount
                </div>
              </div>
              <div class="text-subtitle"
                style="font-size: 12px; text-align:right;
                margin-right:3px;padding-top:5px;width:40%" v-if="
                ${req.body.usedOffer_price} !=
                  ''
                ">
                ₹${req.body.price_after_discount}
              </div>
            </div>




            <div style="display:flex;width:100%;">
               <div style="width:60%">
                <div class="text-subtitle " style="
            font-size: 12px;
            text-align:left;
            margin-left:3px;
             padding-top:5px;
           ">
           Taxes 
                 </div>
              </div>
              <div class="text-subtitle"
                style="font-size: 12px; text-align:right;
               margin-right:3px;padding-top:5px;width:40%">
               ₹${req.body.gst_amount}
               </div>
             </div>

             <div style="display:flex;width:100%;">
             <div style="width:60%">
              <div class="text-subtitle text-bold " style="
          font-size: 14px;
          text-align:left;
          margin-left:3px;
           padding-top:5px;
         ">
         Convenience Fee
               </div>
            </div>
            <div class="text-subtitle text-bold"
              style="font-size: 14px; text-align:right;
             margin-right:3px;padding-top:5px;width:40%">
             ₹${"0"}
             </div>
           </div>

            <div style="display:flex;width:100%;">
              <div style="width:60%">
                <div class="text-subtitle" style="
            font-size: 15px;
            text-align:left;
            margin-left:3px;
            padding-top:5px;
          ">
                  Total Price
                </div>
              </div>
              <div class="text-subtitle"
                style="font-size: 12px; text-align:right;
                margin-right:3px;padding-top:5px;width:40%">
                <strong>
                ₹${req.body.total_price}
                  /-
                </strong>
              </div>
            </div>
             
          </div>
            </div>
      </div>

                </div>
              </div>


              </div>
              <div style="margin:10px 0px 0px 0px">
              <ul style="list-style-type:number">
              <li><b> Accommodation Partner will receive Check-in day booking amount 24 hrs before the check-in, from MangoHomz towards accommodation charges.</b></li>
            
           
           
            <li>The <b> Accommodation Partner after booking confirmation</b>, is not permitted to cancel any of the bookings without 72 hours prior notice to the Mangohomz and seeking approval to do so in writing.</li>
            
          
          
            <li><b>	In case of cancellation before 3 days of check in there will be no payment to the Accommodation Partner .</b></li>
            
          
           
            <li><b> In case of cancellation by the Customer within 24 hours of check in,, the Accommodation partner will retain the check-in day booking amount .</b></li>
            
            <li><b> In case of any cancellation after check-in the MangoHomz  will pay to the Accommodation  partner the consumed days by the user  plus one additional day room rent.</b></li>
           
            <li><b>	Rest of the terms & conditions as per the agreement between you & Mangohomz Technologies Pvt. Ltd.</b></li>
            </ul>
            </div>
            <div style="margin:10px 0px 0px 0px">
            <div>Please provide the visitor with your best services.
            </div>
          
          </div>
              <div style="margin:10px 0px 0px 0px">
                <div>Thank You.</div>
                <div style="font-weight:700;">TEAM MANGOHOMZ</div>
              </div>
            <div style="display:flex;">
              <div style="height: 5px;width: 100%;background-color:darkblue;"></div>
            </div>
            <div style="display:flex;">
              <div>
                <h6 style="margin:5px 0px 2px 4px">JOIN AND BE A PART OF A NATIONWIDE NETWORK</h6>
                <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a>
                <h6 style="margin:5px 0px 2px 4px">NOBODY HANDLES MEDICAL STAYS LIKE WE DO</h6>
              </div>
              <div style="margin:5px 0px 2px 150px">
                <div>
                  <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai </a>
                </div>
                <div style="display:flex;">
                  <div>
                    <a href="https://www.facebook.com/Mangohomzpage/" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/facebook.png" alt=""  width="30px" height="30px" style="margin-top: 7px;"></a>
                  </div>
                  <div>
                    <a href="https://mobile.twitter.com/mangohomz" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/twitter.png" alt=""  width="36px" height="36px" style="margin-top: 4px;"></a>
                  </div>
                  <div>
                    <a href="https://instagram.com/mangohomz" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/instagram.png" alt=""  width="30px" height="30px" style="margin-top: 7px;"></a>
                  </div>
                  <div>
                    <a href="https://linkedin.com/company/mangohomz" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/linkedin.png" alt=""  width="36px" height="36px" style="margin-top: 4px;"></a>
                  </div>
                  <div>
                    <a href="https://www.youtube.com/channel/UCWAmQdY8g8AYI_Yojr8OYlA" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/youtube.png" alt=""  width="30px" height="30px" style="margin-top: 7px;"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `,
  };
  transporter.sendMail(mailOptions1, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Succ", info.response);
    }
  });
});
router.put("/updatepropertypriceDetails/:txn_id/:partner_id/:room_category/:room_type", async function (req, res, next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;

  try {
    const message = await adminDashboard.updatepropertypriceDetails(req.params.txn_id,req.params.partner_id,req.params.room_category,req.params.room_type, req.body,ipAddress);
    res.json({ message });
    // console.log(req.body);
  } catch (err) {
    console.error("Error while updating room price Details", err.message);
    next(err);
  }
});
router.get("/getpropertypricelogdetails/:property_txn_id/:partner_id/:room_category/:room_type", async function (req, res, next) {
  try {
    res.json(
      await adminDashboard.getpropertypricelogdetails(
        req.params.property_txn_id,
        req.params.partner_id,
        req.params.room_category,
        req.params.room_type
      )
    );
  } catch (err) {
    console.error(
      `Error while getting Property Price log Table Data`,
      err.message
    );
    next(err);
  }
});
router.get("/DateWiseBookingTable", async function (req, res, next) {
  try {
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const property_name = req.query.property_name;


    res.json(
      await adminDashboard.DateWiseBookingTable(fromDate, toDate,property_name)
    );
  } catch (err) {
    console.error(
      `Error while getting Acc Datewise Booking Data`,
      err.message
    );
    next(err);
  }
});



router.get("/getBookingLiveForPartner/:account_id", async function (req, res, next) {
  // console.log("sachin");
  try {
    res.json(await adminDashboard.getBookingLiveForPartner(req.params.account_id,));
  } catch (err) {
    console.error(`Error while getting Live Booking Data`, err.message);
    next(err);
  }
});
router.get("/getBookingUpcomingForPartner/:account_id", async function (req, res, next) {
  // console.log("sachin");
  try {
    res.json(await adminDashboard.getBookingUpcomingForPartner(req.params.account_id,));
  } catch (err) {
    console.error(`Error while getting upcoming Booking Data`, err.message);
    next(err);
  }
});
router.get("/getMedicalLoanListDetails",async function (req, res, next) {
  try {
    res.json(
      await adminDashboard.getMedicalLoanListDetails(req.body)
    );
  } catch (err) {
    console.error(
      `Error while getting Medical Loan Table Data`,
      err.message
    );
    next(err);
  }
}
);

router.get("/getTravelCitywiselocationForAdmin",async function (req, res, next) {
  try {
    res.json(
      await adminDashboard.getTravelCitywiselocationForAdmin(req.body)
    );
  } catch (err) {
    console.error(
      `Error while getting Travel Citywise location Table Data`,
      err.message
    );
    next(err);
  }
}
);

router.post("/savetravellocationdetails", async function (req, res, next) {
try {
  const message = await adminDashboard.savetravellocationdetails(req.body);
  res.json({ message });
} catch (err) {
  console.error(`Error while submitting Location Details`, err.message);
  next(err);
}
});

router.put("/updatetravellocationdetails/:sno", async function (req, res, next) {
try {
  const message = await adminDashboard.updatetravellocationdetails(req.params.sno, req.body);
  res.json({ message });
} catch (err) {
  console.error("Error while updating Location Details", err.message);
  next(err);
}
});
router.get("/getmhgeniepatientDetailsforadmin", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getmhgeniepatientDetailsforadmin());
  } catch (err) {
    console.error(`Error while getting MHGenie Patient Data`, err.message);
    next(err);
  }
});


router.get("/getAllCallBackmsgData", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getAllCallBackmsgData());
  } catch (err) {
    console.error(`Error while getting Call Back Data`, err.message);
    next(err);
  }
});


router.get("/getAllCityForCallBack", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getAllCityForCallBack());
  } catch (err) {
    console.error(`Error while loading cities `, err.message);
    next(err);
  }
});
router.get("/:city_id", async function (req, res, next) {
  try {
    res.json(await adminDashboard.getAllHospitalForCallBack(req.params.city_id));
  } catch (err) {
    console.error(`Error while loading cities `, err.message);
    next(err);
  }
});

router.post("/callbackdataSaving", async function (req, res,next) {
  let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  try {
    const message = await adminDashboard.callbackdataSaving(req.body,ipAddress);
    res.json({ message });
  } catch (err) {
    console.error(`Error while submitting Callback Message Details`, err.message);
    next(err);
  }
  });

  router.get("/getDateWiseAllCallBackMsgData", async function (req, res, next) {
    try {
      const fromDate = req.query.fromDate;
      const toDate = req.query.toDate;
      //console.log(fromDate,toDate)
      res.json(await adminDashboard.getDateWiseAllCallBackMsgData(fromDate,toDate));
    } catch (err) {
      console.error(`Error while getting Call Back Data`, err.message);
      next(err);
    }
  });

  
  router.get("/getSubscriberDetails/sss", async function (req, res, next) {
    // console.log("abcdsdfkd")
    try {
      
      res.json(await adminDashboard.getSubscriberDetails());
    } catch (err) {
      console.error(
        `Error while getting Subscribers Email Data`,
        err.message
      );
      next(err);
    }
  });


  router.post("/emailSubscribeSavingMethod", async function (req, res, next) {
    let ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress
    // console.log('payload',req.body)
    // console.log(req.body);  
    // console.log(ipAddress)
    try {

       res.json(await adminDashboard.SavingEmailSubscriberData(req.body,ipAddress));
    } catch (err) {
      console.error(`Error while submitting the Email Data`, err.message);
      next(err);
    }
   
  });

  router.get("/getdatewiseSubscriberDetails/mmm", async function (req, res, next) {
    try {
      //console.log('mmm',req.query.params)
      const fromDate = req.query.fromDate;
      const toDate = req.query.toDate;
      // console.log("fromDate",fromDate)
      // console.log("todate",toDate)
      res.json(await adminDashboard.getdatewiseSubscriberDetails(fromDate,toDate));
    } catch (err) {
      console.error(
        `Error while getting Email Subscribers Data`,
        err.message
      );
      next(err);
    }
  });

  
  router.get("/loadAccomadationPartnerDataForAdminReport/loadReport", async function (req, res, next) {
    //console.log('rk')
    try {     
     res.json(await adminDashboard.loadAccomadationPartnerDataForAdminReport());
      //console.log(res)
    } catch (err) {
      console.error(`Error while getting Accomadation Field Visits `, err.message);
      next(err);
    }
  });


  router.post("/savingRemarksDetails", async function (req, res, next) {
    try {
      //const data = req.body
      //console.log('data',req.body)
      res.json(await adminDashboard.savingRemarksDetails(req.body));
    } catch (err) {
      console.error(`Error while getting Property Data `, err.message);
      next(err);
    }
  });

  
  router.get("/getDateWiseAccomadationDetails/date", async function (req, res, next) {
    try {
  
      const fromDate = req.query.fromDate;
      const toDate = req.query.toDate;
      const city = req.query.city;
      //console.log(fromDate,toDate,city)
      res.json(await adminDashboard.getDateWiseAccomadationDetails(fromDate,toDate,city));
    } catch (err) {
      console.error(
        `Error while getting Accomadation visit  Data`,
        err.message
      );
      next(err);
    }
  });


  router.get("/getBookingAllStaffLiveForAdmin/sss/:zone", async function (req, res, next) {
  
    try {
      res.json(await adminDashboard.getBookingAllStaffLiveForAdmin(req.params.zone));
    } catch (err) {
      console.error(`Error while getting Live Booking Data`, err.message);
      next(err);
    }
  });
  router.get("/getBookingAllUpcomingStaffForAdmin/sss/:zone", async function (req, res, next) {
    try {
      res.json(await adminDashboard.getBookingAllUpcomingStaffForAdmin(req.params.zone));
    } catch (err) {
      console.error(`Error while getting Live Booking Data`, err.message);
      next(err);
    }
  });
//Ravi kiran Route for laoding CITY
router.get("/loadCityArrForAdmin/city", async function (req, res, next) {
  try {
    res.json(await adminDashboard.loadCityArrForAdmin());
  } catch (err) {
    console.error(`Error while getting All Problem City `, err.message);
    next(err);
  }
});

//Ravi kiran PUT Method for verify Accomadation Details BY Admin
router.put("/verifyAccomadationPartnerByAdmin/:s_no", async function (req, res, next) {
  let s_no = req.params.s_no;
  // console.log(s_no)

  try {       
   res.json(await adminDashboard.verifyAccomadationPartnerByAdmin(s_no));
 } catch (err) {
   console.error(`Error while updating Accomadation Visit Data`, err.message);
   next(err);
 }

}
);

router.get("/loadRoomCategoriesListTableForAdmin/:visitId", async function (req, res, next) {
  // console.log('rk',req.params.visitId)
  try {
    
    res.json(
      await adminDashboard.loadRoomCategoriesListTableForAdmin(req.params.visitId)
    );
  } catch (err) {
    console.error(
      `Error while getting Field Visit Rates  `,
      err.message
    );
    next(err);
  }
});

router.get("/loadHospitalPartnerDataForAdminReport/loadReport", async function (req, res, next) {
  //console.log('rk')
  try {     
   res.json(await adminDashboard.loadHospitalPartnerDataForAdminReport());
    //console.log(res)
  } catch (err) {
    console.error(`Error while getting Hospital Field Visits `, err.message);
    next(err);
  }
});

//Ravi kiran Date Wise Hospital Field Visit

router.get("/getDateWiseHospitalDetails/date", async function (req, res, next) {
  try {

    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const city = req.query.city;
    //console.log(fromDate,toDate,city)
    res.json(await adminDashboard.getDateWiseHospitalDetails(fromDate,toDate,city));
  } catch (err) {
    console.error(
      `Error while getting Hospital visit  Data`,
      err.message
    );
    next(err);
  }
});


router.post("/addRemaksMethodSavingForHosptial", async function (req, res, next) {
  try {
    //const data = req.body
    //console.log('data',req.body)
    res.json(await adminDashboard.addRemaksMethodSavingForHosptial(req.body));
  } catch (err) {
    console.error(`Error while getting Property Data `, err.message);
    next(err);
  }
});

router.put("/verifyHospitalPartnerByAdmin/:s_no", async function (req, res, next) {
  let s_no = req.params.s_no;
  // console.log(s_no)

  try {       
   res.json(await adminDashboard.verifyHospitalPartnerByAdmin(s_no));
 } catch (err) {
   console.error(`Error while updating Accomadation Visit Data`, err.message);
   next(err);
 }

}
);

router.get("/loadFoodPartnerDataForAdminReport/loadReport", async function (req, res, next) {
  //console.log('rk')
  try {     
   res.json(await adminDashboard.loadFoodPartnerDataForAdminReport());
  //  console.log("routes")
    // console.log(res)
  } catch (err) {
    console.error(`Error while getting Food Details`, err.message);
    next(err);
  }
});

router.get("/getDateWiseFoodDetails/date", async function (req, res, next) {
  try {

    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const city = req.query.city;
    // console.log('rk',fromDate,toDate,city)
    res.json(await adminDashboard.getDateWiseFoodDetails(fromDate,toDate,city));
  } catch (err) {
    console.error(
      `Error while getting Food visit  Data`,
      err.message
    );
    next(err);
  }
});

router.post("/savingFoodRemarksDetails",async function (req,res,next){
  try{

    res.json(await adminDashboard.savingFoodRemarksDetails(req.body));

  } catch(err){
    console.error(`Error while getting Food remarks Data`,err.message);
    next(err);
  }
});

router.put("/updateAdminFoodStatus/:s_no", async function (req, res, next) {
  let  s_no=req.params.s_no
  //  console.log(s_no)
   try {
     res.json(await adminDashboard.updateAdminFoodRemarkStatus(req.params.s_no, req.body));
   } catch (err) {
     console.error(`Error while updating admin status Data`, err.message);
     next(err);
   }
 });

 
 router.get("/loadTravelPartnerDataForAdminReport/loadReport", async function (req, res, next) {
  // console.log('rk')
  try {     
   res.json(await adminDashboard.loadTravelPartnerDataForAdminReport());
    // console.log("sai",res)
  } catch (err) {
    console.error(`Error while getting Travel Partner Field Visits `, err.message);
    next(err);
  }
});

router.get("/loadEquipmentPartnerDataForAdminReport/loadReport", async function (req, res, next) {
  // console.log('sai')
  try {     
   res.json(await adminDashboard.loadEquipmentPartnerDataForAdminReport());
    //console.log(res)
  } catch (err) {
    console.error(`Error while getting Equipment Field Visits `, err.message);
    next(err);
  }
});

router.post("/savingTravelRemarksDetails", async function (req, res, next) {
  try {
    //const data = req.body
    //console.log('data',req.body)
    res.json(await adminDashboard.savingTravelRemarksDetails(req.body));
  } catch (err) {
    console.error(`Error while getting Property Data `, err.message);
    next(err);
  }
});
router.post("/savingEquipmentRemarksDetails", async function (req, res, next) {
  try {
    //const data = req.body
    // console.log('data',req.body)
    res.json(await adminDashboard.savingEquipmentRemarksDetails(req.body));
  } catch (err) {
    console.error(`Error while getting Property Data `, err.message);
    next(err);
  }
});

router.get("/getDateWiseTravelDetails/date", async function (req, res, next) {
  try {

    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const city = req.query.city;
    // console.log(fromDate,toDate,city)
    res.json(await adminDashboard.getDateWiseTravelDetails(fromDate,toDate,city));
  } catch (err) {
    console.error(
      `Error while getting Travel visit  Data`,
      err.message
    );
    next(err);
  }
});

router.get("/getDateWiseEquipmentDetails/date", async function (req, res, next) {
  try {

    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const city = req.query.city;
    // console.log(fromDate,toDate,city)
    res.json(await adminDashboard.getDateWiseEquipmentDetails(fromDate,toDate,city));
  } catch (err) {
    console.error(
      `Error while getting Travel visit  Data`,
      err.message
    );
    next(err);
  }
});

router.put("/verifyViewEquipmentDetails/:id", async function (req, res, next) {
  // console.log("routers")
  let s_no = req.params.id
  //  console.log("s_no",s_no)
  
  try{
    res.json(
      await adminDashboard.verifyViewEquipmentVisitDetails(s_no)
    )
  }
  catch(err) {
    console.log("error")
  }
});

//Ravi kiran Load Departments Table for Admin
router.get("/loadDepartmentsTableForAdmin/:visitId", async function (req, res, next) {
  // console.log(req.params.visitId)
  try {
    
    res.json(
      await adminDashboard.loadDepartmentsTableForAdmin(req.params.visitId)
    );
  } catch (err) {
    console.error(
      `Error while getting Field Visit Rates  `,
      err.message
    );
    next(err);
  }
});



router.get("/getHospitalWiseBookingDetailsForAdmin/loadBooking",async function (req,res,next) {
  try {
    res.json(
      await adminDashboard.getHospitalWiseBookingDetailsForAdmin(req.body)
    )
  } catch(err) {
  }
});

router.get("/loadWhatsappSenderDetails/:option", async function (req, res, next) {  
  try {
    res.json(await adminDashboard.loadWhatsappSenderDetails(req.params.option));
  }
  catch (err) {
    console.error(
      `Error while getting Whatsapp Sender Data`,
      err.message
    );
    next(err);
  }
});

router.get("/loadCampaignDataDetails/:option", async function (req, res, next) {  
  try {
    res.json(await adminDashboard.loadCampaignDataDetails(req.params.option));
  }
  catch (err) {
    console.error(
      `Error while getting campaign Data`, 
      err.message
    );
    next(err);
  }
});

router.get("/getCampaignOptionsDetails/loadHospital", async function (req, res, next) {  
  try {
    res.json(await adminDashboard.getCampaignOptionsDetails(req.params.option));
  }
  catch (err) {
    console.error(
      `Error while getting Campaign Data`,
      err.message
    );
    next(err);
  }
});

router.post("/insertPhoneNumbersAndCampaignOption", async function (req, res, next) {  
  try {
    res.json(await adminDashboard.insertPhoneNumbersAndCampaignOption(req.body));
  }
  catch (err) {
    console.error(
      `Error while send phone number and campaign option Data`,
      err.message
    );
    next(err);
  }
});

router.post("/addNewPhoneNumberDetails", async function (req, res, next) { 
  try {
    res.json(await adminDashboard.addNewPhoneNumberDetails(req.body));
  }
  catch (err) {
    console.error(
      `Error while Adding New Phone Number Data`, 
      err.message
    );
    next(err);
  }
});

  
module.exports = router;
