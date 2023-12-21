const db = require("./db");
const helper = require("../helper");
const nodemailer = require("nodemailer");
const moment = require("moment");
const request = require('request');







const credentails = require("../credentails.json");
const axios = require("axios");
const FetchedApiKey = credentails.apiKey;
const sendWAMessageAgentRegistartion = async ( 
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



moment.suppressDeprecationWarnings = true;

var transporter = nodemailer.createTransport({
  host: "mail.mangohomz.com",
  port: 465,
  auth: {
    user: "noreply@mangohomz.com",
    pass: "F0PZ}!]espo2",
  },
});

async function getMultiple() {
  const rows = await db.query(
    `SELECT agent_id,agent_sub_id, agent_name, phone,fax, email_id, agent_commission, description, building_no, street, land_mark, 
    city, city_id, country, state, state_id, pin_code, cancelled_cheque_doc,pan, 
    aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,
    addhaar_no_loc,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,
    fire_safety_loc,status FROM mh_agent_master GROUP BY agent_id`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var agent_count = "";
      if (element.agent_id) {
        agent_count = await helper.getCountOfAgentId(
          element.agent_id)
      };
      data.push({
        agent_count: agent_count,
        ...element
      });
    }
  }
  return {
    data,
  };
}
// async function getAgentApproval() {
//   //   const offset = helper.getOffset(page, config.listPerPage);
//   const rows = await db.query(
//     `SELECT * FROM mh_agent_master WHERE 1`
//   );
//    const data = helper.emptyOrRows(rows);
//   return {
//     data,
//   };
// }
async function getAgentApproval() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM agent_registration WHERE partner_type="Booking Agent" AND agentstatus='pending'`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}



function sendAgentRegistrationSms(data,partner_id) {

  request(`http://api.bulksmsgateway.in/sendmessage.php?user=Mangohomzz&password=Mangohomzz@123&mobile=${data.mobile_no}&message=Dear ${data.first_name} Welcome, Your AGENT Registration at MANGOHOMZ is Successful. Your MH Agent ID is ${partner_id}. Details are sent to your registered mail ID. For any assistance, Call MH Care Number 8929982655. Thank you @Team MANGOHOMZ. Stay Well - Get Well&sender=MGHOMZ&type=3&template_id=1007077443501611769`, { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
  });
}
async function createagentRegistration(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.agentFormDetails);
  let numericNum = await helper.generateNumeraricIncID(
    "agent_registration",
    "sno"
  );
  let createNumber = numericNum.toString().padStart("6", 0);
  let partner_id = `MHPART${createNumber}`;
  const result = await db.query(
    `INSERT IGNORE INTO agent_registration 
      (partner_id,first_name,country_code,mobile_no, email_id, city, city_id, nearest_hospital, partner_type,created_datetime,password,user_name,ip_address,govtcardno,govtno,whatsapp_countrycode,whatapp_number,address,	pin_code,bankDetails,upi_id,bankAccountNo,bankName,branchName,ifsc,cancelled_cheque_doc,pan_loc) 
      VALUES 
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
      new Date(),
      "guest",
      data.mobile_no ?? "",
      ipAddress,
      data.govtcardno ?? "",
      data.govtno ?? "",
      data.whatsapp_countrycode.label ? data.whatsapp_countrycode.label : data.whatsapp_countrycode ?? "",
      data.whatapp_number ?? "",
      data.address ?? "",
      data.pin_code ?? "",
      data.bankDetails ?? "",
      data.upi_id ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      docs.cancelCheque_name ?? "",
      docs.panCardFile_name ?? "",
      
   
    ]
  );



/* Whatapps Sending */
sendWAMessageAgentRegistartion(
  "agent_registration",
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





  sendAgentRegistrationSms(data, partner_id);
  let message =result.warningStatus ===2? "Mobile Number is Already Register": "Error while submitting Agent Register";
  // let message = "Error while submitting Agent Registration";

  if (result.affectedRows) {
    message =
      "Thanks for your interest. You will be contacted shortly by our representative.";

  

    const adminMail = {
     from: 'noreply@mangohomz.com',
     to: 'sachin.kumar@mangohomz.com',
    //  to: 'admin@mangohomz.com',
   // bcc: 'forward@mangohomz.com',
      subject: "New Agent Registered",
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
                Greetings,<span style="font-weight:700">Admin</span>,
              </div>
              <div style="margin: 5px 0px">
                <p>A new ${data.partnerType} has applied for registration in ${data.city.city} near ${data.nearest_hospital}.Please verify the Agent to approve / reject as the standard procedure.</p>
              </div>
              <div style="margin: 5px 0px">
              <p>Details entered by Agent.</p>
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
                <td>${data.first_name}</td>
              </tr>
              <tr>
                <td>Mobile Number</td>
                <td>+91-${data.mobile_no  }</td>
              </tr>
              <tr>
              <td>Email Id</td>
              <td>${data.email_id}</td>
              </tr>
              <tr>
              <td>Address</td>
              <td>${data.address}</td>
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
              <td>Partner Type</td>
              <td>${data.partnerType }</td>
              </tr>
             
              <tr>
              <td>${data.govtno}</td>
              <td>${data.govtcardno }</td>
              </tr>
              <tr>
            <td>Bank Details</td>
  <td>
    ${data.upi_id ? data.upi_id : `${data.bankAccountNo}, ${data.bankName}, ${data.branchName}, ${data.ifsc}`}
  </td>
              
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
    const mailOptions = {
      from: 'noreply@mangohomz.com',
      to: data.email_id,
      subject: "Successfully Agent Registration Completed",
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
              <p>We are grateful that you choose mangohomz.ai. Your registration was successful, so thank you. <br>Details entered by you are :</b></p>
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
              <td>${data.first_name}</td>
            </tr>
            <tr>
              <td>Mobile Number</td>
              <td>+91-${data.mobile_no  }</td>
            </tr>
            <tr>
            <td>Email Id</td>
            <td>${data.email_id}</td>
            </tr>
            <tr>
            <td>Address</td>
            <td>${data.address}</td>
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
            <td>Partner Type</td>
            <td>${data.partnerType }</td>
            </tr>
           
            <tr>
            <td>Offical id proof</td>
            <td>${data.govtcardno }</td>
            </tr>
            <tr>
          <td>Bank Details</td>
<td>
  ${data.upi_id ? data.upi_id : `${data.bankAccountNo}, ${data.bankName}, ${data.branchName}, ${data.ifsc}`}
</td>
            
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



async function getAgentRegApproval() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT sno, partner_id, first_name, last_name, mobile_no, email_id, city, city_id, nearest_hospital, partner_type, govtno, govtcardno, user_name, password, status, accstatus, travelstatus, foodstatus, medicalstatus, agentstatus, created_datetime FROM agent_registration WHERE agentstatus = 'Approved'`
  );
  const result = helper.emptyOrRows(rows);
    let data =[];
    let index =0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        index: index,
        ...element
      });
    }
  return {
    data,
  };
}
}



async function approveAgentRegDetails(update) {

  const result = await db.query(
    `UPDATE agent_registration 
    SET status = "Approved",agentstatus = "Approved" WHERE partner_id=? AND agentstatus = 'Pending'`,
    [
      update.partner_id ?? "",
    ]
  );
  console.log("result",result);
  console.log("update.partner_id",update.partner_id);
  console.log("update.first_name",update.first_name);
  console.log("update.email_id",update.email_id);
  console.log("update.city",update.city);
  console.log("update moblile",update.mobile_no)

  var role = "agent";
  var password = "guest";
  var sub_role = "partner_agent"
  // const sql = `INSERT IGNORE INTO users(role,sub_role,account_id,user_name,name,email,password,zone) 
  // VALUES (${role},${sub_role},${update.partner_id},${update.mobile_no},${
  // update.first_name
  // },${update.email_id},${password},${update.city})`

  var result1 = await db.query(`INSERT IGNORE INTO users(role,sub_role,account_id,mobile_no,user_name,name,email,password,zone) VALUES (?,?,?,?,?,?,?,?,?)`,
  [
    role ?? "",
    sub_role ?? "",
    update.partner_id ?? "",
    update.mobile_no ?? "",
    update.mobile_no ?? "",
    update.first_name ?? "",
    update.email_id ?? "",
    password ?? "",
    update.city ?? "",
  ]
  );
  // var sql = `INSERT IGNORE INTO users(role,sub_role,account_id,mobile_no,user_name,name,email,password,zone),('agent','sub_role','${update.partner_id}','${update.mobile_no}','${update.mobile_no}','${update.first_name}','${update.email_id}',password,'${update.city}')`
  // console.log("sql", sql);
  console.log("result1", result1);
  let message = "Error while approving Partner Registration";
  console.log("result1",result1);

  if (result.affectedRows && result1.affectedRows) {
    console.log("0",result);
    console.log("1",result1);
    message = "Partner Registration Approved successfully";
  
    const mailOptions = {
      from: "noreply@mangohomz.com",
      to: update.email_id,
      subject:
        "Agent Registration Login Credentials",
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
            <div>
              Greetings, <span style="font-weight:700">${update.first_name}</span>,
            </div>
            <div style="margin: 5px 0px">
              <p>We appreciate you selecting MANGOHOMZ.COM. Thank You; Your registration was successful,Please complete the remaining formalities by visiting to <a target="_blank" href="https://mangohomz.com" style="color:darkblue;text-decoration:none;font-weight:700;">www.mangohomz.com</a> Please don't forget to change your password when youo first log in.</p>
              <div >
                <span style="font-weight:700">Your Username </span>: ${update.mobile_no}
              </div>
              <div>
                <span style="font-weight:700">Your Password </span>: guest
              </div>
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
        console.log("Email sent: ", info.response);
      }
    });
  }
  return { message };
}
// async function approveAgentRegDetails(update) {
//   console.log("update",update);
//   let message = "Error While approving partner registration";

//   const result = await db.query(
//     `UPDATE partner_registration 
//       SET status="Approved" ,agentstatus = "Approved" WHERE partner_id=? AND agentstatus = 'Pending'`,
//     [update.partner_id]
//   );

//   // if (result.affectedRows) {
//   //   message = "Partner Registration Approved successfully";
//   // }
//   let sub_role = "partner_agent";
//   let dateValue= moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
//   let user ="agent";
//   let password ="guest";
//   const sql = `INSERT IGNORE INTO users(role,sub_role,account_id,user_name,name,email,password,zone,created_at,updated_at) 
//       VALUES (${user},${sub_role},${update.partner_id},${update.mobile_no},${
//     update.first_name
//   },${update.email_id},${password},${update.city},${dateValue},${dateValue})`;
//   console.log("SQL",sql)


//   const result1 = await db.query(
//     `INSERT IGNORE INTO users(role,sub_role,account_id,user_name,name,email,password,zone,created_at,updated_at) 
//     VALUES (?,?,?,?,?,?,?,?,?,?)`,
//     [
//       user ??"",
//       sub_role ?? "",
//       update.partner_id ?? "",
//       update.mobile_no ?? "",
//       update.first_name ?? "",
//       update.email_id ?? "",
//       password ??"",
//       update.city ?? "",
//       dateValue ??"",
//       dateValue??"",
//     ]
//   );
//   if (result.affectedRows && result1.affectedRows) {
//     message = "Partner Registration Approved successfully";
//   }
//   const mailOptions = {
//   from: 'noreply@mangohomz.com',
//   to: update.email_id,
//   subject: "Agent Registration Login Credentials",
//   html: `
//       <div style="border:1px solid grey;>
//         <div style="box-shadow:2px 2px 10px 2px grey;">
//           <div style="display:flex;">
//             <div>
//               <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a>
//             </div>
//             <div style="font-weight:700;margin-top: 42px;margin-right: 6px;margin-left:300px">
//               <p><a target="_blank" href="https://mangohomz.com" style="color:darkblue">www.mangohomz.com</a></p>
//             </div>
//           </div>
//           <div style="display:flex;">
//             <div style="height: 5px;width: 70%;background-color:green;"></div>
//             <div style="height: 5px;width: 30%;background-color:darkblue;"></div>
//           </div>
//           <div style="padding:10px">
//             <div>
//               Greetings, <span style="font-weight:700">${update.first_name}</span>,
//             </div>
//             <div style="margin: 5px 0px">
//               <p>We appreciate you selecting MANGOHOMZ.COM. Thank You; Your registration was successful,Please complete the remaining formalities by visiting to <a target="_blank" href="https://mangohomz.com" style="color:darkblue;text-decoration:none;font-weight:700;">www.mangohomz.com</a> Please don't forget to change your password when youo first log in.</p>
//               <div >
//                 <span style="font-weight:700">Your Username </span>: ${update.mobile_no}
//               </div>
//               <div>
//                 <span style="font-weight:700">Your Password </span>: guest
//               </div>
//             </div>
//             <div style="margin:10px 0px 0px 0px">
//               <div>Thank You.</div>
//               <div style="font-weight:700;">TEAM MANGOHOMZ</div>
//             </div>
//           </div>
//           <div style="display:flex;">
//             <div style="height: 5px;width: 100%;background-color:darkblue;"></div>
//           </div>
//           <div style="display:flex;">
//             <div>
//               <h6 style="margin:5px 0px 2px 4px">JOIN AND BE A PART OF A NATIONWIDE NETWORK</h6>
//               <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a>
//               <h6 style="margin:5px 0px 2px 4px">NOBODY HANDLES MEDICAL STAYS LIKE WE DO</h6>
//             </div>
//             <div style="margin:5px 0px 2px 150px">
//               <div>
//                 <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.com </a>
//               </div>
//               <div style="display:flex;">
//                 <div>
//                   <a href="https://www.facebook.com/Mangohomzpage/" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/facebook.png" alt=""  width="30px" height="30px" style="margin-top: 7px;"></a>
//                 </div>
//                 <div>
//                   <a href="https://mobile.twitter.com/mangohomz" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/twitter.png" alt=""  width="36px" height="36px" style="margin-top: 4px;"></a>
//                 </div>
//                 <div>
//                   <a href="https://instagram.com/mangohomz" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/instagram.png" alt=""  width="30px" height="30px" style="margin-top: 7px;"></a>
//                 </div>
//                 <div>
//                   <a href="https://linkedin.com/company/mangohomz" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/linkedin.png" alt=""  width="36px" height="36px" style="margin-top: 4px;"></a>
//                 </div>
//                 <div>
//                   <a href="https://www.youtube.com/channel/UCWAmQdY8g8AYI_Yojr8OYlA" target="_blank"><img src="https://mangohomz.com/mhmailer/mailer-1/media/youtube.png" alt=""  width="30px" height="30px" style="margin-top: 7px;"></a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//   `,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Succ", info.response)
//     }
//   });
//   return { message };
// }
async function rejectAgentRegDetails(agent_id, agent_sub_id, update) {

  const result = await db.query(
    `UPDATE mh_agent_master SET status=?, remarks=? WHERE agent_id='${agent_id}' AND agent_sub_id='${agent_sub_id}'`,
    [
      "rejected",
      update.remarks,
    ]
  );
  let message = "Error in rejecting Agent Data";

  if (result.affectedRows) {
    message = "Agent data Rejected successfully";
  }

  return { message };
}

async function getAgentLocation(agent_id, agent_sub_id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT agent_id, agent_sub_id, agent_name, agent_sub_name,phone, email_id, latitude, longitude, description, building_no, street, land_mark, country, state, state_id, city, city_id, pin_code, agent_image FROM mh_agent_location_table WHERE agent_id=${agent_id} && agent_sub_id=${agent_sub_id}`
  );

  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
async function existingUserProperty(params) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT agent_id,agent_sub_id, agent_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, cancelled_cheque_doc,pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,addhaar_no_loc,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,status FROM mh_agent_master WHERE agent_id='${params}'`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var agent_count = "";
      if (element.agent_id) {
        agent_count = await helper.getCountOfAgentId(
          element.agent_id)
      };
      data.push({
        agent_count: agent_count,
        ...element
      });
    }
  }
  return {
    data,
  };
}

async function getAgentDataOnStatus(params) {
  const rows = await db.query(
    `SELECT agent_id,agent_sub_id, agent_name, agent_sub_name, company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, cancelled_cheque_doc,pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,addhaar_no_loc,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,status FROM mh_agent_master WHERE status='${params}' GROUP BY agent_id`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];

      var agent_count = "";
      if (element.agent_id) {
        agent_count = await helper.getCountOfAgentId(
          element.agent_id)
      };
      data.push({
        agent_count: agent_count,
        ...element
      });
    }
  }
  return {
    data,
  };
}


async function getStatusCount() {
  const rows = await db.query(
    `SELECT (SELECT COUNT(*) FROM mh_agent_master WHERE status='pending') AS pcount,(SELECT COUNT(*) FROM mh_agent_master WHERE status='approved') AS acount, (SELECT COUNT(*) FROM mh_agent_master WHERE status='rejected') AS rcount FROM mh_agent_master GROUP BY status;`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function getSingleParentTypeDetail(id) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT  id,property_name,phone,email,registration_number FROM mht_hotels WHERE parent_type_id=?`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };
  return data;
}
async function create(fields, files, docs, ipAddress) {
  let data = JSON.parse(fields.agentPartnerDetails);
  console.log(data)
  let agentSubId = await helper.generateAgentSUBID();
  const result = await db.query(
    `INSERT IGNORE INTO mh_agent_master( user_name,password,sub_role,agent_sub_id, agent_name,phone, fax, email_id, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code,cancelled_cheque_doc, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc,accept,pan_card_file_loc,addhaar_no_loc,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,account_id,ip_address)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.user_name ??"",
      data.password ??"",
      data.sub_role ??"",
      agentSubId ?? "",
      data.name ?? "",
      data.phone ?? "",
      data.fax ?? "",
      data.email_id ?? "",
      // data.agent_commission ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city.city ?? "",
      data.city.city_id ?? "",
      data.country ?? "",
      data.state.state_name ?? "",
      data.state.state_id ?? "",
      data.pin_code ?? "",
      docs.cancelledChequeName ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      data.accept ?? "",
      docs.panCardName ?? "",
      docs.addhaarName ?? "",
      docs.gstInName ?? "",
      docs.mhAgreementName ?? "",
      // docs.partnerPicName ?? "",
      docs.mbCertificateName ?? "",
      docs.propertyTaxName ?? "",
      docs.fireSafetyName ?? "",
      data.account_id ?? "",
      ipAddress
    ]
  );

  let message = "Error in Agent Registration Master";

  if (result.affectedRows) {
    message = "Agent Registration Master created successfully";
  }

  return { message };
}

async function exsistingUserCreate(fields, files, docs) {
  let data = JSON.parse(fields.agentDetails);
  // let fileObj = JSON.parse(JSON.stringify(files));
  let agentSubId = await helper.generateAgentSUBID();
  const result = await db.query(
    `INSERT IGNORE INTO mh_agent_master( agent_id, agent_sub_id, agent_name, agent_sub_name,company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, cancelled_cheque_doc, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept,pan_card_file_loc,addhaar_no_loc,gst_tin_loc,mh_agreement_loc,mb_certificate_loc,property_tax_loc,fire_safety_loc,account_id)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.agent_id ?? "",
      agentSubId ?? "",
      data.agent_name ?? "",
      data.name ?? "",
      data.company_name ?? "",
      data.individual_name ?? "",
      data.phone ?? "",
      data.fax ?? "",
      data.email_id ?? "",
      data.agent_commission ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city.city ?? "",
      data.city.city_id ?? "",
      data.country ?? "",
      data.state.state_name ?? "",
      data.state.state_id ?? "",
      data.pin_code ?? "",
      docs.cancelledChequeName ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      data.accept ?? "",
      docs.panCardName ?? "",
      docs.addhaarName ?? "",
      docs.gstInName ?? "",
      docs.mhAgreementName ?? "",
      // docs.partnerPicName ?? "",
      docs.mbCertificateName ?? "",
      docs.propertyTaxName ?? "",
      docs.fireSafetyName ?? "",
      data.user_id ?? "",
    ]
  );

  let message = "Error in Agent Registration Master";

  if (result.affectedRows) {
    message = "Agent Registration Master created successfully";
  }
  return { message };
}

async function updateDetails(userId, agentId, agentSubId, agentName, agentSubName, data) {
  const result1 = await db.query(
    `UPDATE mh_agent_master SET account_id=?, agent_id=?, agent_sub_id=?,agent_name=?,agent_sub_name=?, company_name=?,individual_name=?, phone=?, fax=?,email_id=?, agent_commission=?, description=?, building_no=?, street=?, land_mark=?, city=?, city_id=?, country=?, state=?, state_id=?, pin_code=?, pan=?, aadhar=?, gstin=?,bankAccountNo=?, bankName=?, branchName=?, ifsc=?, accept=?, pan_card_file_loc=?, addhaar_no_loc=?, mh_agreement_loc=?, mb_certificate_loc=?, gst_tin_loc=?, property_tax_loc=?, fire_safety_loc=?, cancelled_cheque_doc=?  WHERE account_id='${userId}' AND agent_id='${agentId}' AND agent_sub_id='${agentSubId}'`,
    [
      data.user_id ?? "",
      data.agent_id ?? "",
      data.agent_sub_id ?? "",
      agentName == agentSubName ? data.name : agentName,
      data.name ?? "",
      data.company_name ?? "",
      data.individual_name ?? "",
      data.phone ?? "",
      data.fax ?? "",
      data.email_id ?? "",
      data.agent_commission ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city.city ?? data.city,
      data.city.city_id ?? data.city_id,
      data.country ?? "",
      data.state.state_name ?? data.state,
      data.state.state_id ?? data.state_id,
      data.pin_code ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      data.accept ?? "",
      data.pan_card_upt ?? "",
      data.addhaar_no_upt ?? "",
      data.mh_agreement_upt ?? "",
      data.mb_certificate_upt ?? "",
      data.gst_tin_upt ?? "",
      data.property_tax_upt ?? "",
      data.fire_safety_upt ?? "",
      data.cancelled_cheque_upt ?? "",
    ]
  );
  if (agentName == agentSubName) {
    const result2 = await db.query(
      `UPDATE mh_agent_master SET agent_name=? WHERE agent_id='${agentId}'`,
      [agentName == agentSubName ? data.name : agentName]
    );
    let message = "Error in updating Agent Registration Master";
    if (result2.affectedRows) {
      message = "Agent Registration Master updated successfully";
    }
    return { message };
  };

  let message = "Error in updating Agent Registration Master";

  if (result1.affectedRows) {
    message = "Agent Registration Master updated successfully";
  }
  return { message };

}


async function createAgentDetails(fields, files, docs) {
  let data = JSON.parse(fields.agentItemDetails);
  // let agent_txn_id =`AGNT00${await helper.generateAgentTxnId("mh_agent_location_table")}`;
  const result = await db.query(
    `INSERT IGNORE INTO mh_agent_location_table(  agent_id, agent_sub_id, agent_name, agent_sub_name,phone, email_id, latitude, longitude, description, building_no, street, land_mark, country, state, state_id, city, city_id, pin_code, agent_image)VALUES
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.agent_id ?? "",
      data.agent_sub_id ?? "",
      data.agent_name ?? "",
      data.agent_sub_name ?? "",
      data.agent_phone ?? "",
      data.agent_email_id ?? "",
      data.agent_latitude ?? "",
      data.agent_longitude ?? "",
      data.agent_description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.country ?? "",
      data.state.state_name ?? "",
      data.state.state_id ?? "",
      data.city.city ?? "",
      data.city.city_id ?? "",
      data.pin_code ?? "",
      docs.agentImageName ?? "",
    ]
  );

  let message = "Error in Agent Details Registration";

  if (result.affectedRows) {
    message = "Agent Details Registration created successfully";
  }

  return { message };
}


async function update(id, update) {
  const result = await db.query(
    `UPDATE mht_hotels 
      SET  parent_type_name=?
      WHERE parent_type_id=?`,
    [update.parent_type_name, update.parent_type_id]
  );

  let message = "Error in updating Agent Registration Master";

  if (result.affectedRows) {
    message = "Agent Registration Master updated successfully";
  }

  return { message };
}
async function remove(id) {
  const result = await db.query(
    `DELETE FROM mht_hotels WHERE parent_type_id=?`,
    [id]
  );

  let message = "Error in deleting Agent Registration Master";

  if (result.affectedRows) {
    message = "Agent Registration Master deleted successfully";
  }

  return { message };
}

async function createAgentReg(data) {
  let agentSubId = await helper.generateAgentSUBID();
  // var status_accept = data.accept == true ? "yes" : "no";

  const result = await db.query(
    `INSERT IGNORE INTO mh_agent_master( agent_id, agent_sub_id, agent_name,company_name,individual_name, phone, fax, email_id, description, building_no, street, land_mark, city, 
    country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc,accept)VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.agent_id ?? "",
      agentSubId ?? "",
      data.agent_name ?? "",
      data.company_name ?? "",
      data.individual_name ?? "",
      data.phone ?? "",
      data.fax ?? "",
      data.email_id ?? "",
      data.description ?? "",
      data.building_no ?? "",
      data.street ?? "",
      data.land_mark ?? "",
      data.city ?? "",
      data.country ?? "",
      data.state ?? "",
      data.pin_code ?? "",
      data.pan ?? "",
      data.aadhar ?? "",
      data.gstin ?? "",
      data.bankAccountNo ?? "",
      data.bankName ?? "",
      data.branchName ?? "",
      data.ifsc ?? "",
      data.accept ?? "",
    ]
  );

  let message = "Error in Agent Registration Master";

  if (result.affectedRows) {
    message = "Agent Registration Master created successfully";
  }

  return { message };
}
async function getMultipleAgentDetails() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT agent_id,agent_name, company_name,individual_name, phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, country, state, pin_code, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, accept FROM mh_agent_master WHERE 1`
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return {
    data,
  };
}

async function getAgentAccountData(accountId) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
      `SELECT  agent_id, agent_sub_id, account_id, agent_name ,phone, fax, email_id, agent_commission, description, building_no, street, land_mark, city, city_id, country, state, state_id, pin_code, cancelled_cheque_doc, pan, aadhar, gstin, bankAccountNo, bankName, branchName, ifsc, pan_card_file_loc, addhaar_no_loc, gst_tin_loc, mh_agreement_loc, partner_pic_loc, mb_certificate_loc, property_tax_loc, fire_safety_loc, accept, status, remarks, created_datetime, updated_datetime FROM mh_agent_master WHERE account_id='${accountId}' `
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
module.exports = {
  getMultiple,
  getSingleParentTypeDetail,
  create,
  update,
  remove,
  createAgentReg,
  getMultipleAgentDetails,
  getStatusCount,
  getAgentDataOnStatus,
  existingUserProperty,
  exsistingUserCreate,
  createAgentDetails,
  getAgentLocation,
  updateDetails,
  getAgentApproval,
  getAgentRegApproval,
  approveAgentRegDetails,
  rejectAgentRegDetails,
  createagentRegistration,
  getAgentAccountData
  // test_create,
};