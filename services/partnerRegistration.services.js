const db = require("./db");
const helper = require("../helper");
const config = require("../db_config");
const nodemailer = require("nodemailer");
const request = require('request');
const credentails = require("../credentails.json");
const axios = require("axios");
const FetchedApiKey = credentails.apiKey;
const sendWAMessagePartnerRegistartion = async (
  campaignName,
  destination,
  userName,
  url,
  filename,
  templateParams
) => {
  try {
    const ApiParms = {
      apiKey: FetchedApiKey,
      campaignName: campaignName,
      destination: destination,
      userName: userName,
      media: {
        url: url,
        filename: filename,
      },
      templateParams: templateParams,
    };
    const res = await axios.post(
      "https://backend.api-wa.co/campaign/myoperator/api",
      ApiParms
    );
    if (res.status === 200) {
      return {
        sent: true,
      };
    } else {
      return {
        sent: false,
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};


var transporter = nodemailer.createTransport({
  host: "mail.mangohomz.com",
  port: 465,
  auth: {
    user: "noreply@mangohomz.com",
    pass: "F0PZ}!]espo2",
  },
});

async function getMultiple() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT sno, first_name, last_name, mobile_no,address, email_id, created_datetime FROM partner_registration WHERE 1
      `
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  var index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      index = index + 1;
      data.push({
        index: index,
        ...element,
      });
    }
  }
  return {
    data,
  };
}
async function getSingleCropStageDetail(id) {
  const rows = await db.query(
    `SELECT sno,stage_id, stage_name,last_updated FROM partner_registration WHERE stage_id=?`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return {
    data,
  };
}
function sendPartnerRegistrationSms(data,partner_id) {
  request(`http://api.bulksmsgateway.in/sendmessage.php?user=Mangohomzz&password=Mangohomzz@123&mobile=9527068470&message=Dear ${data.first_name} Welcome, Your PARTNER Registration at MANGOHOMZ is Successful. Your MH Partner ID is ${partner_id}. Details are sent to your registered mail ID. For any assistance, Call MH Care Number 8929982655. Thank you -Team MANGOHOMZ. Stay Well - Get Well&sender=MGHOMZ&type=3&template_id=1007883772577000255`, { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
  });
}
async function create(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.partnerFormDetails);

  let numericNum = await helper.generateNumeraricIncID(
    "partner_registration",
    "sno"
  );
  let createNumber = numericNum.toString().padStart("6", 0);
  let partner_id = `MHPART${createNumber}`;
  const result = await db.query(
    `INSERT IGNORE INTO partner_registration 
      (partner_id,first_name,country_code, mobile_no, email_id, city, city_id, nearest_hospital, partner_type,govtno,govtcardno,whatsapp_countrycode,whatapp_number,address,pin_code,pan_loc,created_datetime,password,user_name,ip_address) 
      VALUES 
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      partner_id ?? "",
      data.first_name ?? "",
      data.country_code.label ? data.country_code.label : data.country_code ?? "",
      data.mobile_no ?? "",
      data.email_id ?? "",
      data.city.city ?? "",
      data.city.city_id ?? "",
      data.nearest_hospital ?? "",
      data.partnerType ?? "",
      data.govtno ?? "",
      data.govtcardno ?? "",
      data.whatsapp_countrycode.label ? data.whatsapp_countrycode.label : data.whatsapp_countrycode ?? "",
      data.whatapp_number ?? "",
      data.address ?? "",
      data.pin_code ?? "",
      // data.bankDetails ?? "",
      // data.upi_id ?? "",
      // data.bankAccountNo ?? "",
      // data.bankName ?? "",
      // data.branchName ?? "",
      // data.ifsc ?? "",
     
      // docs.cancelCheque_name ?? "",
      docs.panCardFile_name ?? "",
      new Date(),
      "guest",
      data.mobile_no ?? "",
     
      // docs.passportFile_name ?? "",
      // docs.drivingLicienceFile_name ?? "",
      ipAddress,
    ]
  );





  // sendPartnerRegistrationSms(data, partner_id);
  let message =result.warningStatus ===9? "Mobile Number is Already Register": "Error while submitting Partner Register";
  /* Whatapps Sending */
sendWAMessagePartnerRegistartion(
  "partner_registration",
  data.whatapp_number,
  data.first_name,
  "https://mangohomz.com/img/og2.png",
  "https://mangohomz.com/img/og2.png",
  [
    data.first_name,
    partner_id,
  ]
)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Error in SendWhtNotification:", error);
  });



  if (result.affectedRows) {
    message = "Thanks for your interest. You will be contacted shortly by our representative.";
    const adminMail = {
      from: 'noreply@mangohomz.com',
      //to: 'sachin.kumar@mangohomz.com',
    //    to: 'admin@mangohomz.com',
    //  bcc: 'forward@mangohomz.com',
      subject: "New Partner Registered",
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
              Greetings <span style="font-weight:700">Admin</span>,
            </div>
            <div style="margin: 5px 0px">
              <p>A new ${data.partnerType} ${data.first_name} registered in ${data.city.city} near ${data.nearest_hospital}.Please Verify the partner to approve / reject as the standard procedure.</p>
            </div>
            <div style="margin: 5px 0px">
            <p>Details entered by partner.</p>
          </div>
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
  <td>Full Name</td>
  <td>${data.first_name }</td>
</tr>
<tr>
  <td>Mobile Number</td>
  <td>${data.mobile_no }</td>
</tr>
<tr>
<td>Email Id</td>
<td>${data.email_id }</td>
</tr>
<tr>
<td>Address</td>
<td>${data.address  }</td>
</tr>
<tr>
<td>City</td>
<td>${data.city.city }</td>
</tr>
<tr>
<td>Nearest Hospital</td>
<td>${data.nearest_hospital}</td>
</tr>
<tr>
<td>Type of Partner</td>
<td>${data.partnerType  }</td>
</tr>
<tr>
<td>${data.govtno}</td>
<td>${data.govtcardno  }</td>
</tr>

</table>
            <div style="margin:10px 0px 0px 0px">
              <div>Thank You.</div>
              <div style="font-weight:700;">TEAM MANGOHOMZ</div>
            </div>
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
                <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.com </a>
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
  `,
  };
    const mailOptions = {
      from: 'noreply@mangohomz.com',
      to: data.email_id,
      subject: "Successfully Partner Registration Completed",
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
              Greetings <span style="font-weight:700">${data.first_name}</span>,
            </div>
            <div style="margin: 5px 0px">
              <p>We are grateful that you choose mangohomz.ai. Your registration was successful, so thank you.<br>Details entered by you are :</b></p>
              </div>
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
    <td>Full Name</td>
    <td>${data.first_name }</td>
  </tr>
  <tr>
    <td>Mobile Number</td>
    <td>+91-${data.mobile_no }</td>
  </tr>
  <tr>
  <td>Email Id</td>
  <td>${data.email_id }</td>
  </tr>
  <tr>
  <td>Address</td>
  <td>${data.address  }</td>
  </tr>
  <tr>
  <td>City</td>
  <td>${data.city.city }</td>
  </tr>
  <tr>
  <td>Nearest Hospital</td>
  <td>${data.nearest_hospital}</td>
  </tr>
  <tr>
  <td>Type of Partner</td>
  <td>${data.partnerType  }</td>
  </tr>
  <tr>
  <td>${data.govtno}</td>
  <td>${data.govtcardno  }</td>
  </tr>
  
  </table>
  <div>
  <span >  Mangohomz executive will  call you soon.If you have any query please contact this number 8929982655.</span>
  </div>
            <div style="margin:10px 0px 0px 0px">
              <div>Thank You.</div>
              <div style="font-weight:700;">TEAM MANGOHOMZ</div>
            </div>
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
  `,
    };
    transporter.sendMail(adminMail, function (error, info) {
      
      if (error) {
        console.log(error);        
      } else {
        console.log("Succ", info.response);
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Succ", info.response);
          }
        });
      }
    });
  }

  return { message };
}
async function createagentRegistration(data, ipAddress) {
  let numericNum = await helper.generateNumeraricIncID(
    "partner_registration",
    "sno"
  );
  let createNumber = numericNum.toString().padStart("6", 0);
  let partner_id = `MHPART${createNumber}`;
  const result = await db.query(
    `INSERT IGNORE INTO partner_registration 
      (partner_id,first_name,mobile_no, email_id, city, city_id, nearest_hospital, partner_type,created_datetime,password,user_name,ip_address,govtcardno,govtno) 
      VALUES 
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      partner_id ?? "",
      data.first_name ?? "",
      data.mobile_no ?? "",
      data.email_id ?? "",
      data.city.city ?? "",
      data.city.city_id ?? "",
      data.nearest_hospital ?? "",
      data.partnerType ?? "",
      new Date(),
      "guest",
      data.mobile_no ?? "",
      ipAddress,
      data.govtcardno,
      data.govtno,
    ]
  );

  let message = "Error while submitting Partner Registration";

  if (result.affectedRows) {
    message =
      "Thanks for your interest. You will be contacted shortly by our representative.";
  }

  return { message };
}
async function grievanceRegistration(data) {
  // console.log(data)
  let numericNum = await helper.generateNumeraricInGrievance();
  let createNumber = numericNum.toString().padStart("6", 0);
  let grievance_id = `MHGRV${createNumber}`;
  const result = await db.query(
    `INSERT IGNORE INTO mh_grievance_table 
     (txn_id,name,mobile_no,email_id,mh_booking_id,comments) 
     VALUES 
     (?,?,?,?,?,?)`,
    [
      grievance_id ?? "",
      data.name ?? "",
      data.mobile_no ?? "",
      data.email_id ?? "",
      data.mh_booking_id ?? "",
      // new Date() ?? "",
      // data.address ?? "",
      data.comment ?? "",
    ]
  );

  let message = "Error while submitting Grievance Data";

  if (result.affectedRows) {
    message = "We have received your request, Inconvenience is deeply regretted. MangoHomz executive will be in touch with you soon.";
    
    const mailOptions = {
      from: 'noreply@mangohomz.com',
      // to: 'admin@mangohomz.com',
      subject: "Grievence Redressal form Details",
      html: `
          <div style="border:1px solid grey;>
            <div style="box-shadow:2px 2px 10px 2px grey;">
              <div style="display:flex;">
                <div>
                  <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a>
                </div>
                <div style="font-weight:700;margin-top: 42px;margin-right: 6px;margin-left:300px">
                  <p><a target="_blank" href="https://mangohomz.com" style="color:darkblue">www.mangohomz.com</a></p>
                </div>
              </div>
              <div style="display:flex;">
                <div style="height: 5px;width: 70%;background-color:green;"></div>
                <div style="height: 5px;width: 30%;background-color:darkblue;"></div>
              </div>
              <div style="padding:10px">
                <div style="margin: 5px 0px">
                  <p><b>"${data.comment}"</b> is the issue facing by a Mangohomz customer <b>${data.name}</b> under Booking ID <b>${data.mh_booking_id}</b> on ${data.date}. Please contact customer and provide solution as soon as possible.</p>
                </div>
                <div style="margin:10px 0px 0px 0px">
                  <div>Thank You.</div>
                  <div style="font-weight:700;">TEAM MANGOHOMZ</div>
                </div>
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
                    <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.com </a>
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
      `,
      };
      
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
  }

  return { message };
}

async function createStaffRegistration(data) {
  let numericNum = await helper.generateNumeraricIncID(
    "mh_staff_registration",
    "sno"
  );
  let createNumber = numericNum.toString().padStart("6", 0);
  let staff_id = `MHSTAFF${createNumber}`;
  const result = await db.query(
    `INSERT IGNORE INTO mh_staff_registration 
   (staff_id,first_name, last_name, mobile_no, email_id, city,city_id, near_hospital,created_datetime,password,user_name) 
   VALUES 
   (?,?,?,?,?,?,?,?,?,?,?)`,
    [
      staff_id ?? "",
      data.first_name ?? "",
      data.last_name ?? "",
      data.mobile_no ?? "",
      data.email_id ?? "",
      data.city.city ?? "",
      data.city.city_id ?? "",
      data.nearest_hospital ?? "",
      new Date(),
      "guest",
      data.mobile_no ?? "",
    ]
  );

  let message = "Error while submitting Partner Registration";

  if (result.affectedRows) {
    message =
      "Thanks for your interest. You will be contacted shortly by our representative.";
  }

  return { message };
}

async function createCityRegistration(data) {
  let numericNum = await helper.generateNumeraricIncID(
    "mh_city_manager_registration",
    "sno"
  );
  let createNumber = numericNum.toString().padStart("6", 0);
  let city_manager_id = `MHCM${createNumber}`;
  const result = await db.query(
    `INSERT IGNORE INTO mh_city_manager_registration 
   (city_manager_id,first_name, last_name, mobile_no, email_id, city, city_id, near_hospital,created_datetime,password,user_name) 
   VALUES 
   (?,?,?,?,?,?,?,?,?,?,?)`,
    [
      city_manager_id ?? "",
      data.first_name ?? "",
      data.last_name ?? "",
      data.mobile_no ?? "",
      data.email_id ?? "",
      data.city.city ?? "",
      data.city.city_id ?? "",
      data.nearest_hospital ?? "",
      new Date(),
      "guest",
      data.mobile_no ?? "",
    ]
  );

  let message = "Error while submitting Partner Registration";

  if (result.affectedRows) {
    message =
      "Thanks for your interest. You will be contacted shortly by our representative.";
  }

  return { message };
}

async function update(id, update) {
  const result = await db.query(
    `UPDATE partner_registration 
      SET  stage_name=?
      WHERE stage_id=?`,
    [update.stage_name, update.stage_id]
  );

  let message = "Error in updating Partner Registration";

  if (result.affectedRows) {
    message = "Partner Registration updated successfully";
  }

  return { message };
}
async function remove(id) {
  const result = await db.query(
    `DELETE FROM partner_registration WHERE stage_id=?`,
    [id]
  );

  let message = "Error in deleting Partner Registration";

  if (result.affectedRows) {
    message = "Partner Registration deleted successfully";
  }

  return { message };
}
module.exports = {
  getMultiple,
  getSingleCropStageDetail,
  create,
  update,
  remove,
  grievanceRegistration,
  createStaffRegistration,
  createCityRegistration,
  createagentRegistration,

};
