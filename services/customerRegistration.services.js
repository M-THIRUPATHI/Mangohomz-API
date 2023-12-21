const db = require("./db");
const helper = require("../helper");
const nodemailer = require("nodemailer");
const moment = require("moment");
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
    //   const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT sno, first_name, last_name, mobile_no, emai_id, created_datetime FROM customer_registration WHERE 1
      `
    );
    const data = helper.emptyOrRows(rows);
    //   const meta = { page };
  
    return {data};
  }
  async function getSingleChargeDetail(id) {
    const rows = await db.query(
      `SELECT sno,item_id, item_name, item_charges, ip_address, last_updated_by, last_updated_time, last_updated_by_new FROM customer_registration WHERE item_id=?`,[id]
    );
    const data = helper.emptyOrRows(rows);
    //   const meta = { page };
  
    return {data};
  }
  //ActionTAke Insert Data
async function savingActionTakeDetails(data, ipAddress) {
  const result = await db.query(
    `INSERT IGNORE INTO mh_reachus_actionloc
   (reachus_id,hospitalName,action_takenby,remarks,ip_address)
   VALUES 
   (?,?,?,?,?)`,
    [
      data.reachus_id ?? "",
      data.hospitalName ?? "",
      data.action_takenby ?? "",
      data.remarks ?? "",
      ipAddress,
    ]
  );
  let message = "Action Taken Successfully";
  return { message };
}
  async function getChargesByChargeName(item_id) {
    const rows = await db.query(
      `SELECT item_id,item_charges FROM customer_registration WHERE item_id = ${item_id}`
    );
    const data = helper.emptyOrRows(rows);
    return { data };
  }
  async function create(data) {
     let customer_id ="MHCUST" + await helper.generateNumeraricIncID('customer_registration','customer_id');
    const result = await db.query(
      `INSERT IGNORE INTO customer_registration 
      (customer_id,first_name, last_name, mobile_no, email_id, created_datetime) 
      VALUES 
      (?,?, ?, ?,? ,?)`,
      [
       customer_id ?? "",
       data.first_name ?? "",
       data.last_name ?? "",
       data.mobile_no ?? "",
       data.email_id ?? "",
       new Date()
      ]
    );
  
    let message = "Error while submitting Customer Registration";
  
    if (result.affectedRows) {
      message = "Customer Registration submitted successfully";
    }
  
    return { message };
  }
  
  async function update(id, update) {
    const result = await db.query(
      `UPDATE customer_registration 
      SET  item_name=?, item_charges=?
      WHERE item_id=?`,
      [ update.item_name, update.item_charges, update.item_id,]
    );
  
    let message = "Error in updating Customer Registration";
  
    if (result.affectedRows) {
      message = "Customer Registration updated successfully";
    }
  
    return { message };
  }
  async function remove(id) {
    const result = await db.query(`DELETE FROM customer_registration WHERE item_id=?`, [id]);
  
    let message = "Error in deleting Customer Registration";
  
    if (result.affectedRows) {
      message = "Customer Registration deleted successfully";
    }
    return { message };
  }
  async function reachwithusSaving(fields,ipAddress) {
 
    let data = JSON.parse(fields.reach_us);
  let numericNum = await helper.generatereachusID("mh_reachus_form","sno");
   let createNumber = numericNum.toString().padStart("6", 0);
  let reachus_id = `MHRU${createNumber}`;
    console.log("data123",data);
  
    const result = await db.query(
      `INSERT IGNORE INTO  mh_reachus_form(reachus_id,patient_name,hospital_name,contact_email,country_code,mobile_number,patient_location,message,ip_address)VALUES
      (?,?,?,?,?,?,?,?,?)`,
    [
     
      reachus_id ?? "",
      data.patientName ?? "",
      data.hospitalName ?? "",
      data.contactEmail ?? "",
      data.country_code.label ? data.country_code.label : data.country_code ?? "",
      data.mobileNumber ?? "",
      data.patientLocation ?? "",
      data.message ?? "",
      ipAddress
      ]
    );
   console.log("result123",result);
    let message = "Error in Saving reach us Details";
  
    if (result.affectedRows) {
      message = " Saving reach us Details successfully";
      const adminMail = {
        from: 'noreply@mangohomz.com',
        to:data.contactEmail,
       
        bcc: 'forward@mangohomz.com',
        subject: "Reach Us",
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
                <div style="height: 5px;width: 30%;background-color:darkblue;overflow:hidden;"></div>
              </div>
              <div style="padding:10px">
                <div>
                Greetings <span >${data.patientName} </span>
                </div>
                <div style="background-color:white;padding:5px;margin:auto;width:600px;border-radius:10px;margin-bottom:15px;color:black;">
              <div style="font-size:15px;font-family:verdana;"><b>Thanks for Contacting Mangohomz.<br>Details entered by you are :</b></div>
                
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
    <td>Hospital Name</td>
    <td>${data.hospitalName }</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>${data.contactEmail }</td>
  </tr>
  <tr>
  <td>Mobile Number</td>
  <td>${data.mobileNumber }</td>
</tr>
<tr>
<td>Patient Location</td>
<td>${data.patientLocation }</td>
</tr>
<tr>
<td>Message</td>
<td>${data.message }</td>
</tr>
</table>
                 <div>
                 <span >  Mangohomz executive will  call you soon.If you have any query please contact this number 8618959794.</span>
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
                    <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai</a>
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
  
//Patient Details Insert Data
async function savingPatientHSDetails(data, ipAddress) {
  let all_arr = [];

  if (data.heartdisease !== null && data.heartdisease !== undefined) {
    for (let i = 0; i < data.heartdisease.length; i++) {
      all_arr.push(
        data.heartdisease[i].disease_name);
    }
  }
  if (data.liverdisease !== null && data.liverdisease !== undefined) {
    for (let i = 0; i < data.liverdisease.length; i++) {
      all_arr.push(
        data.liverdisease[i].disease_name);
    }
  }
  if (data.kidneydisease !== null && data.kidneydisease !== undefined) {
    for (let i = 0; i < data.kidneydisease.length; i++) {
      all_arr.push(
        data.kidneydisease[i].disease_name);
    }
  }
  if (data.braindisease !== null && data.braindisease !== undefined) {
    for (let i = 0; i < data.braindisease.length; i++) {
      all_arr.push(
        data.braindisease[i].disease_name);
    }
  }
  if (data.digestivedisease !== null && data.digestivedisease !== undefined) {
    for (let i = 0; i < data.digestivedisease.length; i++) {
      all_arr.push(
        data.digestivedisease[i].disease_name);
    }
  }
  if (data.respiratorydisease !== null && data.respiratorydisease !== undefined) {
    for (let i = 0; i < data.respiratorydisease.length; i++) {
      all_arr.push(
        data.respiratorydisease[i].disease_name);
    }
  }
  // for (let i = 0; i < data.heartdisease.length; i++) {
  //   all_arr.push(
  //     data.heartdisease[i].heart_disease);
  // }
  // for (let i = 0; i < data.liverdisease.length; i++) {
  //   all_arr.push(
  //     data.liverdisease[i].liver_disease);
  // }
  // for (let i = 0; i < data.kidneydisease.length; i++) {
  //   all_arr.push(
  //     data.kidneydisease[i].kidney_disease);
  // }
  // for (let i = 0; i < data.braindisease.length; i++) {
  //   all_arr.push(
  //     data.braindisease[i].brain_disease);
  // }
  // for (let i = 0; i < data.digestivedisease.length; i++) {
  //   all_arr.push(
  //     data.digestivedisease[i].digestive_disease);
  // }
  // for (let i = 0; i < data.respiratorydisease.length; i++) {
  //   all_arr.push(
  //     data.respiratorydisease[i].respiratory_disease);
  // }
  
  disease_arr = all_arr.toString();

  let numericNum = await helper.generatehealthSupportID(
    "mh_health_support",
    "sno"
  );
  let createNumber = numericNum.toString().padStart("6", 0);
  let health_support_id = `MHHS${createNumber}`;

  const result = await db.query(
    `INSERT INTO mh_health_support(health_support_id,health_type,disease,
      other_disease,patient_name,contact_email,mobile_number,patient_location,message,ip_address) 
    VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [
      health_support_id ?? "",
      data.health_type ?? "",
      disease_arr ?? "",
      data.other_disease ?? "",
      data.patient_name ?? "",
      data.contact_email ?? "",
      data.mobile_number ?? "",
      data.patient_location ?? "",
      data.message ?? "",
      ipAddress,
    ]
  );
  let message = "submitting Patient Details";
  const adminMail = {
    from: "noreply@mangohomz.com",
    to:data.contact_email,
    bcc: 'forward@mangohomz.com',
    subject: "Health Support Team",
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
              Greetings,<span style="font-weight:700">${data.patient_name} Thanks for connecting with us. Mangohomz executive will Contact you soon.If you have any query please contact this number 8618959794.</span>
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
                <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai</a>
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
  return { message };
}
//Insert HealthSupport TAke Action Data
async function healthSupportActionTakeSaving(data, ipAddress) {
  const result = await db.query(
    `INSERT IGNORE INTO  mh_healthsupport_actionloc
   (health_support_id,patient_name,disease,other_disease,action_takenby,remarks,ip_address)
   VALUES 
   (?,?,?,?,?,?,?)`,
    [
      data.health_support_id ?? "",
      data.patient_name ?? "",
      data.disease ?? "",
      data.other_disease ?? "",
      data.action_takenby ?? "",
      data.remarks ?? "",
      ipAddress,
    ]
  );
  let message = "Action Taken Successfully";
  return { message };
}
async function savechatus(data, ipAddress) {
  try {
    // console.log("data123", data);

    const result = await db.query(
      `INSERT IGNORE INTO mh_chat_us_table (full_name, phone_number, ip_address) VALUES (?, ?, ?)`,
      [data.full_name ?? "", data.phone_number ?? "", ipAddress]
    );
    if (result.affectedRows) {
      message = " Saving reach us Details successfully";
      const WhatsAppChat = {
        from: 'noreply@mangohomz.com',
        // to: ['debasis@mangohomz.com', 'aman@mangohomz.com'],
       
        // bcc: 'sachin.kumar@mangohomz.com',
        subject: "WhatsApp Chat",bcc: 'sachin.kumar@mangohomz.com',
        html: `
          <div style="border:1px solid grey;>
            <div style="box-shadow:2px 2px 10px 2px grey;">
              <div style="display:flex;">
                <div>bcc: 'sachin.kumar@mangohomz.com',
                  <a href="https://mangohomz.com" target="_blank"><img src="https://mangohomz.com/img/logo-main.6f335097.png" width="200px" height="50px" alt="mangohomz logo"></a>
                </div>
                <div style="font-weight:700;margin-top: 42px;margin-right: 6px;margin-left:300px">
                  <p><a target="_blank" href="https://mangohomz.com" style="color:darkblue">www.mangohomz.ai</a></p>
                </div>
              </div>
              <div style="display:flex;">
                <div style="height: 5px;width: 70%;background-color:green;"></div>
                <div style="height: 5px;width: 30%;background-color:darkblue;overflow:hidden;"></div>
              </div>
              <div style="padding:10px">
                <div>
                Greetings <span >${data.full_name} </span>
                </div>
                <div style="background-color:white;padding:5px;margin:auto;width:600px;border-radius:10px;margin-bottom:15px;color:black;">
              <div style="font-size:15px;font-family:verdana;"><b>Thanks for Contacting Mangohomz.<br>Details entered by you are :</b></div>
                
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
    <td> Name</td>
    <td>${data.full_name }</td>
  </tr>
  <tr>
    <td>Phone Number</td>
    <td>${data.phone_number }</td>
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
                    <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai</a>
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
   
      transporter.sendMail(WhatsAppChat, function (error, info) {
  
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
    return;
  } catch (error) {
    console.error("Error in Saving Chat with us Details", error);
    throw error;
  }

}
async function savingMedicalLoanDetails(data, ipAddress) {
  console.log(data);
  const options = data.options.join(",");
  const result = await db.query(
    `INSERT INTO mh_medical_loan_details(patient_name, hospital_name, email_id,country_code, mobile_number, patient_location,salarized, medical_loanfor, message, ip_address) VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [
      data.patientName ?? "",
      data.hospitalName ?? "",
      data.email ?? "",
      data.country_code ?? "",
      data.mobileNumber ?? "",
      data.patientLocation ?? "",
      data.salarized ?? "",
      options ?? "",
      data.message ?? "",
      ipAddress,
    ]
  );

  let message = "Error in Saving Medical Loan Details";
    if (result.affectedRows) {
      message = "Medical Loan Details Submitted Successfully";
      const adminMail = {
        from: "noreply@mangohomz.com",
        to: data.email,

        // bcc: 'forward@mangohomz.com',
        subject: "Apply For Medical Loan",
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
                  <div style="height: 5px;width: 30%;background-color:darkblue;overflow:hidden;"></div>
                </div>
                <div style="padding:10px">
                  <div>
                  Greetings <span >${data.patientName} </span>
                  </div>
                  <div style="background-color:white;padding:5px;margin:auto;width:600px;border-radius:10px;margin-bottom:15px;color:black;">
                <div style="font-size:15px;font-family:verdana;"><b>Thanks for Contacting Mangohomz.<br>Details entered by you are :</b></div>

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
      <td>Hospital Name</td>
      <td>${data.hospitalName}</td>
    </tr>
    <tr>
      <td>Email</td>
      <td>${data.email}</td>
    </tr>
    <tr>
    <td>Mobile Number</td>
    <td>${data.mobileNumber}</td>
  </tr>
  <tr>
  <td>Patient Location</td>
  <td>${data.patientLocation}</td>
  </tr>
   <tr>
      <td>salaried person</td>
      <td>${data.salarized}</td>
    </tr>
  <tr>
  <tr>
  <td>Medical Loan is for</td>
  <td>${options}</td>
  </tr>
  <td>Message</td>
  <td>${data.message}</td>
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
                      <h5 style="margin:0px">Please contact with us : </h5> <a href="mailto:care@mangohomz.com" style="color:darkblue;font-weight:700;">care@mangohomz.com</a> & <a href="https://www.mangohomz.com " target="_blank" style="color:darkblue;font-weight:700;">www.mangohomz.ai</a>
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
  module.exports = {
    getMultiple,
    getSingleChargeDetail,
    getChargesByChargeName,
    create,
    update,
    remove,
    reachwithusSaving,
    savingPatientHSDetails,
    savingActionTakeDetails,
  healthSupportActionTakeSaving,
  savechatus,
  savingMedicalLoanDetails
  };
  