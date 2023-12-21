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

async function updatePartnerAprvlStatus(data) {
  //   let type = data.type;
  let table = data.table;
  let status = data.status;
  let id = data.id;
  let cond = `agent_id = "${id}"`;
  if (table == "mh_property_master") {
    cond = `partner_id= '${id}'`;
  } else {
  }
  const result = await db.query(
    `UPDATE ${table} 
      SET  status='${status}'
      WHERE ${cond}`
  );

  let message = "Error in updating the record";

  if (result.affectedRows) {
    message = "Record updated successfully";
  }

  return { message };
}
//Onkar Get Reach us Data 
async function custReachusData() {
  const rows = await db.query(
    `SELECT sno, reachus_id, patient_name, hospital_name, contact_email, mobile_number, 
    patient_location, message,DATE_FORMAT(created_datetime,'%Y/%m/%d') as  reach_date,DATE_FORMAT(created_datetime,'%Y/%m/%d') as created_datetime1 FROM mh_reachus_form WHERE 1 ORDER BY created_datetime DESC`
  );
  const data = helper.emptyOrRows(rows);
  // let data = [];
  // let index = 0;
  const dataWithIndex = data.map((item, index) => ({
    index: index + 1, 
    ...item, 
  }));
  return {
    data: dataWithIndex, 
  };
}

//Onkar Get TAke Action Details
async function takeActionDetails(reachus_id) {
  const rows = await db.query(
    `SELECT sno, reachus_id, hospitalName, action_takenby, remarks FROM mh_reachus_actionloc WHERE reachus_id = '${reachus_id}' ORDER BY sno DESC`
     );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        //  sno: index,
        ...element,
      });
    }
  }
  return data;
}
async function getPartnerAllDisplayForAdmin(status) {
  if(status!='ALL'){
  const rows = await db.query(
    `SELECT sno, partner_id,first_name, mobile_no, email_id, city, nearest_hospital,address, partner_type,date_format(created_datetime,"%d-%m-%Y") as created_datetime,password,user_name,status,accstatus,travelstatus,medicalstatus,foodstatus FROM partner_registration WHERE partner_type !="Booking Agent" AND status = '${status}' ORDER BY sno ASC
    `
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        index: index,

        ...element,
      });
    }
  }
  return data;
} else if(status='ALL'){
  const rows = await db.query(
    `SELECT sno, partner_id,first_name, mobile_no, email_id, city, nearest_hospital, partner_type,date_format(created_datetime,"%d-%m-%Y") as created_datetime,password,address,user_name,status,accstatus,travelstatus,medicalstatus,foodstatus FROM partner_registration WHERE partner_type !="Booking Agent" ORDER BY sno ASC
    `
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        index: index,

        ...element,
      });
    }
  }
  return data;
}
}
async function partnerRegData() {
  const rows = await db.query(
    `SELECT sno, partner_id,first_name, mobile_no, email_id, city, nearest_hospital, partner_type,date_format(created_datetime,"%d-%m-%Y") as created_datetime,password,user_name,status,address,accstatus,travelstatus,medicalstatus,foodstatus FROM partner_registration WHERE partner_type !="Booking Agent" ORDER BY sno ASC
    `
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        index: index,
        ...element,
      });
    }
  }
  return data;
}

async function approvePartner(update) {
 if((update.accstatus=="Approved") || (update.foodstatus=="Approved") ||(update.travelstatus=="Approved") || (update.medicalstatus=="Approved")){
  console.log("update1",update)
  let message = "Error While approving partner registration";
  const result = await db.query(
    `UPDATE partner_registration 
      SET accstatus = "Approved", status="Approved" WHERE partner_id=? AND accstatus = 'Pending'`,
    [update.partner_id]
  );
  const result1 = await db.query(
    `UPDATE users  SET accstatus = "Approved" WHERE account_id=? AND accstatus = 'Pending'`,
    [update.partner_id]);
  if (result.affectedRows && result1.affectedRows) {
    message = "Partner Registration Approved successfully";
  }
    const mailOptions = {
      from: 'noreply@mangohomz.com',
      to: update.email_id,
      subject: "Partner Registered for Accommodation",
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
                  <p>We are grateful that you choose MANGOHOMZ.COM. Your registration was successful. Visit <a target="_blank" href="https://mangohomz.com" style="color:darkblue;text-decoration:none;font-weight:700;">www.mangohomz.com</a> and log in to add or modify your homes and Rooms.</p>
                  
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
          console.log("Err", error)
          console.log(error);
        } else {
          console.log("Succ", info)
          console.log("Email sent: " + info.response);
        }
      });
      return { message };
    
 } else{
  console.log("update2")
  let message = "Error While approving partner registration";
  const result = await db.query(
    `UPDATE partner_registration 
      SET status="Approved", accstatus = "Approved" WHERE partner_id=? AND accstatus = 'Pending'`,
    [update.partner_id]
  );

  if (result.affectedRows) {
    message = "Partner Registration Approved successfully";
  }
  let sub_role = "partner_acc";
  const sql = `INSERT IGNORE INTO users(role,sub_role,account_id,user_name,name,email,password,zone,created_at,updated_at,accstatus,foodstatus,travelstatus,medicalstatus) 
      VALUES ("partner",${sub_role},${update.partner_id},${update.mobile_no},${
    update.first_name
  },${update.email_id},"guest",${update.city},${moment(new Date()).format(
    "YYYY-MM-DD hh:mm:ss"
  )},${moment(new Date()).format("YYYY-MM-DD hh:mm:ss")}),"Approved",${update.foodstatus},${update.travelstatus},${update.medicalstatus})`;


  const result1 = await db.query(
    `INSERT IGNORE INTO users(role,sub_role,account_id,user_name,name,email,password,zone,created_at,updated_at,accstatus,foodstatus,travelstatus,medicalstatus) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      "partner",
      sub_role ?? "",
      update.partner_id ?? "",
      update.mobile_no ?? "",
      update.first_name ?? "",
      update.email_id ?? "",
      "guest",
      update.city ?? "",
      moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      "Approved",
      update.foodstatus??"",
      update.travelstatus??"",
      update.medicalstatus??"",
    ]
  );
  if (result1.affectedRows) {
  }
  const mailOptions = {
  from: 'noreply@mangohomz.com',
  to: update.email_id,
  subject: "Partner Registration Login Credentials",
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
              <p>We are grateful that you choose MANGOHOMZ.COM. Your registration was successful, so thank you. Visit <a target="_blank" href="https://mangohomz.com" style="color:darkblue;text-decoration:none;font-weight:700;">www.mangohomz.com</a> and log in to add or modify your homes and Rooms. When you first log in, please change your password.</p>
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
      console.log("Succ", info.response)
    }
  });
  return { message };
 }
}

async function rejectPartner(update) {
 
  const result = await db.query(
    `UPDATE partner_registration 
      SET accstatus = "Rejected" WHERE partner_id=? AND accstatus = 'Pending'`,
    [update.partner_id]
  );
  let message = "Error while Rejecting Partner Registration";

  if (result.affectedRows) {
    message = "Partner Registration Rejected successfully";
  }

  return { message };
}
async function approvePartnerfood(update) {
  if((update.accstatus=="Approved") || (update.foodstatus=="Approved") ||(update.travelstatus=="Approved") || (update.medicalstatus=="Approved")){
   console.log("update1",update)
   let message = "Error While approving partner registration";
   const result = await db.query(
     `UPDATE partner_registration 
       SET foodstatus = "Approved", status="Approved" WHERE partner_id=? AND foodstatus = 'Pending'`,
     [update.partner_id]
   );
   const result1 = await db.query(
     `UPDATE users  SET foodstatus = "Approved" WHERE account_id=? AND foodstatus = 'Pending'`,
     [update.partner_id]);
   if (result.affectedRows && result1.affectedRows) {
     message = "Partner Registration Approved successfully";
   }
     const mailOptions = {
       from: 'noreply@mangohomz.com',
       to: update.email_id,
       subject: "Partner Registered for food",
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
                   <p>We are grateful that you choose MANGOHOMZ.COM. Your registration was successful. Visit <a target="_blank" href="https://mangohomz.com" style="color:darkblue;text-decoration:none;font-weight:700;">www.mangohomz.com</a> and log in to add or modify your Restaurant/food items.</p>
                   
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
           console.log("Err", error)
           console.log(error);
         } else {
           console.log("Succ", info)
           console.log("Email sent: " + info.response);
         }
       });
       return { message };
     
  } else{
   console.log("update2")
   let message = "Error While approving partner registration";
   const result = await db.query(
     `UPDATE partner_registration 
       SET status="Approved", foodstatus = "Approved" WHERE partner_id=? AND foodstatus = 'Pending'`,
     [update.partner_id]
   );
 
   if (result.affectedRows) {
     message = "Partner Registration Approved successfully";
   }
   let sub_role = "partner_food";
   const sql = `INSERT IGNORE INTO users(role,sub_role,account_id,user_name,name,email,password,zone,created_at,updated_at,accstatus,foodstatus,travelstatus,medicalstatus) 
       VALUES ("partner",${sub_role},${update.partner_id},${update.mobile_no},${
     update.first_name
   },${update.email_id},"guest",${update.city},${moment(new Date()).format(
     "YYYY-MM-DD hh:mm:ss"
   )},${moment(new Date()).format("YYYY-MM-DD hh:mm:ss")},${update.accstatus},"Approved",${update.travelstatus},${update.medicalstatus})`;
 
 
   const result1 = await db.query(
     `INSERT IGNORE INTO users(role,sub_role,account_id,user_name,name,email,password,zone,created_at,updated_at,accstatus,foodstatus,travelstatus,medicalstatus) 
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
     [
       "partner",
       sub_role ?? "",
       update.partner_id ?? "",
       update.mobile_no ?? "",
       update.first_name ?? "",
       update.email_id ?? "",
       "guest",
       update.city ?? "",
       moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
       moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
       update.accstatus ??"",
       "Approved",
       update.travelstatus??"",
       update.medicalstatus??"",
     ]
   );
   if (result1.affectedRows) {
   }
   const mailOptions = {
   from: 'noreply@mangohomz.com',
   to: update.email_id,
   subject: "Partner Registration Login Credentials",
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
               <p>We are grateful that you choose MANGOHOMZ.COM. Your registration was successful. Visit <a target="_blank" href="https://mangohomz.com" style="color:darkblue;text-decoration:none;font-weight:700;">www.mangohomz.com</a> and log in to add or modify your Restaurant food items. When you first log in, please change your password.</p>
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
       console.log("Succ", info.response)
     }
   });
   return { message };
  }
 }
 async function rejectPartnerfood(update) {
 
  const result = await db.query(
    `UPDATE partner_registration 
      SET foodstatus = "Rejected" WHERE partner_id=? AND foodstatus = 'Pending'`,
    [update.partner_id]
  );
  let message = "Error while Rejecting Partner Registration";

  if (result.affectedRows) {
    message = "Partner Registration Rejected successfully";
  }

  return { message };
}
async function approvePartnertravel(update) {
  if((update.accstatus=="Approved") || (update.foodstatus=="Approved") ||(update.travelstatus=="Approved") || (update.medicalstatus=="Approved")){
   console.log("update1",update)
   let message = "Error While approving partner registration";
   const result = await db.query(
     `UPDATE partner_registration 
       SET travelstatus = "Approved", status="Approved" WHERE partner_id=? AND travelstatus = 'Pending'`,
     [update.partner_id]
   );
   const result1 = await db.query(
     `UPDATE users  SET travelstatus = "Approved" WHERE account_id=? AND travelstatus = 'Pending'`,
     [update.partner_id]);
   if (result.affectedRows && result1.affectedRows) {
     message = "Partner Registration Approved successfully";
   }
     const mailOptions = {
       from: 'noreply@mangohomz.com',
       to: update.email_id,
       subject: "Partner Registered for Travel",
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
                   <p>We are grateful that you choose MANGOHOMZ.COM. Your registration was successful, so thank you. Visit <a target="_blank" href="https://mangohomz.com" style="color:darkblue;text-decoration:none;font-weight:700;">www.mangohomz.com</a> and log in to add or modify your Vehicles.</p>
                   
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
           console.log("Err", error)
           console.log(error);
         } else {
           console.log("Succ", info)
           console.log("Email sent: " + info.response);
         }
       });
       return { message };
     
  } else{
   console.log("update2")
   let message = "Error While approving partner registration";
   const result3 = await db.query(
    `UPDATE partner_registration 
      SET status="Approved", travelstatus = "Approved" WHERE partner_id=? AND travelstatus = 'Pending'`,
    [update.partner_id]
  );
 
  if (result3.affectedRows) {
    message = "Partner Registration Approved successfully";
  }
   let sub_role = "partner_vehicle";
  //  const sql = `INSERT IGNORE INTO users(role,sub_role,account_id,user_name,name,email,password,zone,created_at,updated_at,accstatus,foodstatus,travelstatus,medicalstatus) 
  //     VALUES ("partner",${sub_role},${update.partner_id},${update.mobile_no},${
  //   update.first_name
  // },${update.email_id},"guest",${update.city},${moment(new Date()).format(
  //   "YYYY-MM-DD hh:mm:ss"
  // )},${moment(new Date()).format("YYYY-MM-DD hh:mm:ss")}),"Approved",${update.foodstatus},${update.accstatus},${update.medicalstatus})`;


  const result4 = await db.query(
     `INSERT IGNORE INTO users(role,sub_role,account_id,user_name,name,email,password,zone,created_at,updated_at,accstatus,foodstatus,travelstatus,medicalstatus) 
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
     [
       "partner",
       sub_role ?? "",
       update.partner_id ?? "",
       update.mobile_no ?? "",
       update.first_name ?? "",
       update.email_id ?? "",
       "guest",
       update.city ?? "",
       moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
       moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
       update.accstatus ?? "",
       update.foodstatus ?? "",
       "Approved",
       update.medicalstatus ?? "",
     ]
   );
   if (result4.affectedRows) {
  }
   const mailOptions = {
   from: 'noreply@mangohomz.com',
   to: update.email_id,
   subject: "Partner Registration Login Credentials",
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
               <p>We are grateful that you choose MANGOHOMZ.COM. Your registration was successful, so thank you. Visit <a target="_blank" href="https://mangohomz.com" style="color:darkblue;text-decoration:none;font-weight:700;">www.mangohomz.com</a> and log in to add or modify your Restaurant food items. When you first log in, please change your password.</p>
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
       console.log("Succ", info.response)
     }
   });
   return { message };
  }
 }
 async function rejectPartnertravel(update) {
 
  const result = await db.query(
    `UPDATE partner_registration 
      SET travelstatus = "Rejected" WHERE partner_id=? AND travelstatus = 'Pending'`,
    [update.partner_id]
  );
  let message = "Error while Rejecting Partner Registration";

  if (result.affectedRows) {
    message = "Partner Registration Rejected successfully";
  }

  return { message };
}
async function approvePartnermedical(update) {
  if((update.accstatus=="Approved") || (update.foodstatus=="Approved") ||(update.travelstatus=="Approved") || (update.medicalstatus=="Approved")){
   console.log("update1",update)
   let message = "Error While approving partner registration";
   const result = await db.query(
     `UPDATE partner_registration 
       SET medicalstatus = "Approved", status="Approved" WHERE partner_id=? AND medicalstatus = 'Pending'`,
     [update.partner_id]
   );
   const result1 = await db.query(
     `UPDATE users  SET medicalstatus = "Approved" WHERE account_id=? AND medicalstatus = 'Pending'`,
     [update.partner_id]);
   if (result.affectedRows && result1.affectedRows) {
     message = "Partner Registration Approved successfully";
   }
     const mailOptions = {
       from: 'noreply@mangohomz.com',
       to: update.email_id,
       subject: "Partner Registered for Medical",
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
                   <p>We are grateful that you choose MANGOHOMZ.COM. Your registration was successful, so thank you. Visit <a target="_blank" href="https://mangohomz.com" style="color:darkblue;text-decoration:none;font-weight:700;">www.mangohomz.com</a> and log in to add or modify your Medical equipment.</p>
                   
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
           console.log("Err", error)
           console.log(error);
         } else {
           console.log("Succ", info)
           console.log("Email sent: " + info.response);
         }
       });
       return { message };
     
  } else{
   console.log("update2")
   let message = "Error While approving partner registration";
   const result = await db.query(
     `UPDATE partner_registration 
       SET status="Approved", medicalstatus = "Approved" WHERE partner_id=? AND medicalstatus = 'Pending'`,
     [update.partner_id]
   );
 
   if (result.affectedRows) {
     message = "Partner Registration Approved successfully";
   }
   let sub_role = "partner_medical";
   const sql = `INSERT IGNORE INTO users(role,sub_role,account_id,user_name,name,email,password,zone,created_at,updated_at,accstatus,foodstatus,travelstatus,medicalstatus) 
       VALUES ("partner",${sub_role},${update.partner_id},${update.mobile_no},${
     update.first_name
   },${update.email_id},"guest",${update.city},${moment(new Date()).format(
     "YYYY-MM-DD hh:mm:ss"
   )},${moment(new Date()).format("YYYY-MM-DD hh:mm:ss")},${update.accstatus},${update.foodstatus},${update.travelstatus}"Approved")`;
 
 
   const result1 = await db.query(
     `INSERT IGNORE INTO users(role,sub_role,account_id,user_name,name,email,password,zone,created_at,updated_at,accstatus,foodstatus,travelstatus,medicalstatus) 
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
     [
       "partner",
       sub_role ?? "",
       update.partner_id ?? "",
       update.mobile_no ?? "",
       update.first_name ?? "",
       update.email_id ?? "",
       "guest",
       update.city ?? "",
       moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
       moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
       update.accstatus ??"",
       update.foodstatus??"",
       update.travelstatus??"",
       "Approved"
     ]
   );
   if (result1.affectedRows) {
   }
   const mailOptions = {
   from: 'noreply@mangohomz.com',
   to: update.email_id,
   subject: "Partner Registration Login Credentials",
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
               <p>We are grateful that you choose MANGOHOMZ.COM. Your registration was successful, so thank you. Visit <a target="_blank" href="https://mangohomz.com" style="color:darkblue;text-decoration:none;font-weight:700;">www.mangohomz.com</a> and log in to add or modify your Medical equipment. When you first log in, please change your password.</p>
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
       console.log("Succ", info.response)
     }
   });
   return { message };
  }
 }
 async function rejectPartnermedical(update) {
 
  const result = await db.query(
    `UPDATE partner_registration 
      SET medicalstatus = "Rejected" WHERE partner_id=? AND medicalstatus = 'Pending'`,
    [update.partner_id]
  );
  let message = "Error while Rejecting Partner Registration";

  if (result.affectedRows) {
    message = "Partner Registration Rejected successfully";
  }

  return { message };
}
async function Registernewpartner(update) {
   let message = "Error While registering";
   const result = await db.query(
     `UPDATE partner_registration 
       SET status="Pending", partner_type="Food Partner" WHERE partner_id=?`,
     [update.account_id]
   );
   if (result.affectedRows) {
    message = "Thanks for your interest. You will be contacted shortly by our representative.";
   }
   const adminMail = {
    from: 'noreply@mangohomz.com',
    // to: 'admin@mangohomz.com',
    subject: "New Partner Registered",
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
            Greetings,<span style="font-weight:700">Admin</span>,
          </div>
          <div style="margin: 5px 0px">
            <p>Partner ${update.name} is interested to register as Food partner.Please Verify the partner ${update.account_id} to approve / reject as the standard procedure.</p>
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
   
   transporter.sendMail(adminMail, function (error, info) {
     if (error) {
       console.log(error);
     } else {
       console.log("Succ", info.response)
     }
   });
   return { message };
  
 }
 async function Registernewaccpartner(update) {
  let message = "Error While registering";
  const result = await db.query(
    `UPDATE partner_registration 
      SET status="Pending", partner_type="Accommodation Partner" WHERE partner_id=?`,
    [update.account_id]
  );
  if (result.affectedRows) {
   message = "Thanks for your interest. You will be contacted shortly by our representative.";
  }
  const adminMail = {
   from: 'noreply@mangohomz.com',
  //  to: 'admin@mangohomz.com',
   subject: "New Partner Registered",
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
           Greetings,<span style="font-weight:700">Admin</span>,
         </div>
         <div style="margin: 5px 0px">
           <p>Partner ${update.name} is interested to register as Accommodation partner.Please Verify the partner ${update.account_id} to approve / reject as the standard procedure.</p>
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
  
  transporter.sendMail(adminMail, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Succ", info.response)
    }
  });
  return { message };
 
}
async function Registernewtravelpartner(update) {
  let message = "Error While registering";
  const result = await db.query(
    `UPDATE partner_registration 
      SET status="Pending",partner_type="Travel Partner" WHERE partner_id=?`,
    [update.account_id]
  );
  if (result.affectedRows) {
   message = "Thanks for your interest. You will be contacted shortly by our representative.";
  }
  const adminMail = {
   from: 'noreply@mangohomz.com',
  //  to: 'admin@mangohomz.com',
   subject: "New Partner Registered",
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
           Greetings,<span style="font-weight:700">Admin</span>,
         </div>
         <div style="margin: 5px 0px">
           <p>Partner ${update.name} is interested to register as Travel partner.Please Verify the partner ${update.account_id} to approve / reject as the standard procedure.</p>
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
  
  transporter.sendMail(adminMail, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Succ", info.response)
    }
  });
  return { message };
 
}
async function Registernewmedicalpartner(update) {
  let message = "Error While registering";
  const result = await db.query(
    `UPDATE partner_registration 
      SET status="Pending",partner_type="Medical Partner" WHERE partner_id=?`,
    [update.account_id]
  );
  if (result.affectedRows) {
   message = "Thanks for your interest. You will be contacted shortly by our representative.";
  }
  const adminMail = {
   from: 'noreply@mangohomz.com',
  //  to: 'admin@mangohomz.com',
   subject: "New Partner Registered",
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
           Greetings,<span style="font-weight:700">Admin</span>,
         </div>
         <div style="margin: 5px 0px">
           <p>Partner ${update.name} is interested to register as Medical Equipment partner.Please Verify the partner ${update.account_id} to approve / reject as the standard procedure.</p>
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
  
  transporter.sendMail(adminMail, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Succ", info.response)
    }
  });
  return { message };
 
}
async function staffRegData() {
  const rows = await db.query(
    `SELECT staff_id,first_name, mobile_no, email_id, city, city_id, near_hospital,date_format(created_datetime,"%d-%m-%Y") as created_datetime,password,user_name,status FROM mh_staff_registration ORDER BY created_datetime DESC
      `
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return data;
}

async function approveStaffRegistration(update) {
  let message = "Error While approving Staff Registration";

  const result = await db.query(
    `UPDATE mh_staff_registration 
        SET status = "Approved" WHERE staff_id=? AND status = 'Pending'`,
    [update.staff_id]
  );

  if (result.affectedRows) {
    message = "Staff Registration Approved successfully";
  }

  const result1 = await db.query(
    `INSERT IGNORE INTO users(role,sub_role,account_id,user_name,name,email,password,zone,created_at,updated_at,near_hospital) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [
      "staff",
      "staff",
      update.staff_id ?? "",
      update.mobile_no ?? "",
      update.first_name ?? "",
      update.email_id ?? "",
      "guest",
      update.city,
      moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      update.near_hospital
    ]
  );
  if (result1.affectedRows) {
  }
  const mailOptions = {
    from: "noreply@mangohomz.com",
    to: update.email_id,
    subject: "Staff Registration Login Credentials",
    html: `<p>Hi, ${update.first_name}</p> <br/>
                  <p>User Name: ${update.mobile_no}</p> 
                <p>Password: guest</p><br/>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return { message };
}

async function rejectStaffRegistration(update) {
  const result = await db.query(
    `UPDATE mh_staff_registration 
        SET status = "Rejected" WHERE staff_id=? AND status = 'Pending'`,
    [update.staff_id]
  );
  let message = "Error while Rejecting Staff Registration";

  if (result.affectedRows) {
    message = "Staff Registration Rejected successfully";
  }

  return { message };
}

async function cityManagerRegData() {
  const rows = await db.query(
    `SELECT city_manager_id, first_name, mobile_no, email_id, city,city_id, near_hospital,date_format(created_datetime,"%d-%m-%Y") as created_datetime,password,user_name,status FROM mh_city_manager_registration ORDER BY created_datetime DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return data;
}

async function approveCityManager(update) {
  let message = "Error While approving City Manager registration";

  const result = await db.query(
    `UPDATE mh_city_manager_registration 
          SET status = "Approved" WHERE city_manager_id=? AND status = 'Pending'`,
    [update.city_manager_id]
  );

  if (result.affectedRows) {
    message = "City Manager Registration Approved successfully";
  }

  const result1 = await db.query(
    `INSERT IGNORE INTO users(role,sub_role,account_id,user_name,name,email,password,zone,created_at,updated_at,near_hospital) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [
      "city_manager",
      "city_manager",
      update.city_manager_id ?? "",
      update.mobile_no ?? "",
      update.first_name ?? "",
      update.email_id ?? "",
      "guest",
      update.city ?? "",
      moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      update.near_hospital ?? ""
    ]
  );
  if (result1.affectedRows) {
  }
  const mailOptions = {
    from: "noreply@mangohomz.com",
    to: update.email_id,
    subject: "City Manager Registration Login Credentials",
    html: `<p>Hi, ${update.first_name}</p> <br/>
                    <p>User Name: ${update.mobile_no}</p> 
                  <p>Password: guest</p><br/>`,
  };
  transporter.sendMail(mailOptions.to, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return { message }; 
}

async function rejectCityManager(update) {
  const result = await db.query(
    `UPDATE mh_city_manager_registration 
          SET status = "Rejected" WHERE city_manager_id=? AND status = 'Pending'`,
    [update.city_manager_id]
  );
  let message = "Error while Rejecting City Manager Registration";

  if (result.affectedRows) {
    message = "City Manager Registration Rejected successfully";
  }

  return { message };
}
async function getpartnerStatusCount() {
  const rows = await db.query(
    `SELECT (SELECT COUNT(*) FROM partner_registration WHERE status='Pending' AND partner_type !="Booking Agent") AS pcount,(SELECT COUNT(*) FROM partner_registration WHERE status='Approved' AND partner_type !="Booking Agent") AS acount, (SELECT COUNT(*) FROM partner_registration WHERE status='Rejected' AND partner_type !="Booking Agent") AS rcount FROM partner_registration WHERE partner_type !="Booking Agent"  GROUP BY partner_id;`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}
//Onkar Get Health Support TAke Action Details
async function diseasetakeActionDetails(health_support_id) {
  const rows = await db.query(
    `SELECT sno, health_support_id, disease, other_disease, patient_name,
    action_takenby, remarks FROM  mh_healthsupport_actionloc WHERE health_support_id = '${health_support_id}' ORDER BY sno DESC`
     );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        //  sno: index,
        ...element,
      });
    }
  }
  return data;
}
async function getpatientDiseaseData() {
  const rows = await db.query(
    `SELECT sno, health_support_id, disease, other_disease, patient_name, contact_email, 
    patient_location, mobile_number,date_format(created_datetime,'%Y/%m/%d' ) as created_datetime1, message FROM mh_health_support WHERE 1 ORDER BY created_datetime DESC`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
          index: index,
        ...element,
      });
    }
  }
  return data;
}


module.exports = {
  updatePartnerAprvlStatus,
  partnerRegData,
  getPartnerAllDisplayForAdmin,
  approvePartner,
  rejectPartner,
  approvePartnerfood,
  rejectPartnerfood,
  approvePartnertravel,
  rejectPartnertravel,
  approvePartnermedical,
  rejectPartnermedical,
  staffRegData,
  approveStaffRegistration,
  rejectStaffRegistration,
  cityManagerRegData,
  approveCityManager,
  rejectCityManager,
  Registernewpartner,
  Registernewmedicalpartner,
  Registernewtravelpartner,
  Registernewaccpartner,
  getpartnerStatusCount,
  custReachusData,
  takeActionDetails,
  diseasetakeActionDetails,
  getpatientDiseaseData

};
