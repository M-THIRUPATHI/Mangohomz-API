const db = require("./db");
const helper = require("../helper");
const shortid = require("shortid");

//const config = require("../db_config");

async function getMultiple() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT sno, account_id, status, agreement_status, registration_no, company_name, contact_number, email_id, house_door_no, district_id, state_id, pincode, aadhar_no, aadhar_path, seed_license_no, seed_license_expiry_date, seed_license_path, tin_no, tin_no_path, pan_no, pan_no_path, incharge_name, incharge_mobile_no, incharge_house_no, incharge_email, incharge_state, incharge_district, last_updated, application_status, verified_emp_name, verified_emp_id, verified_datetime, verified_ip, updated_emp_id, updated_emp_name, updated_datetime, updated_ip FROM seed_company_master WHERE 1
    `
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return {
    data,
  };
}
async function getSingleAccount(id) {
  //   const offset = helper.getOffset(page, config.listPerPage);

  const rows = await db.query(
    `SELECT sno, account_id, status, agreement_status, registration_no, company_name, contact_number, email_id, house_door_no, district_id, state_id, pincode, aadhar_no, aadhar_path, seed_license_no, seed_license_expiry_date, seed_license_path, tin_no, tin_no_path, pan_no, pan_no_path, incharge_name, incharge_mobile_no, incharge_house_no, incharge_email, incharge_state, incharge_district, last_updated, application_status, verified_emp_name, verified_emp_id, verified_datetime, verified_ip, updated_emp_id, updated_emp_name, updated_datetime, updated_ip FROM seed_company_master 
    WHERE account_id=${id}`
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return {
    data,
  };
}
async function userLogin(data, otp) {
  let otp_number = otp;
  let userCode = shortid.generate();
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  
  let otp_sent_time = dateTime;
  let expiry_today = new Date(today.getTime() + (30 * 60 * 1000));
  let expiry_date = expiry_today.getFullYear()+'-'+(expiry_today.getMonth()+1)+'-'+expiry_today.getDate();
  let expiry_time = expiry_today.getHours() + ":" + expiry_today.getMinutes() + ":" + expiry_today.getSeconds();
  let otp_expiry_time = expiry_date +' '+ expiry_time;

  const result1 = await db.query(
    `INSERT IGNORE INTO mh_otp_log(mobile_no, user_code, otp, otp_sent_time, otp_expiry_time) 
    VALUES(?,?,?,?,?)`,
    [
      data.phone,
      userCode,
      otp_number,
      otp_sent_time,
      otp_expiry_time
    ]
  );
  if (result1.affectedRows) {
    var result2 = await db.query(
      `SELECT mobile_no, user_type, user_code, otp, otp_sent_time, otp_expiry_time, otp_verified_time, otp_verified_status, no_of_attempts FROM mh_otp_log WHERE mobile_no='${data.phone}' && user_code='${userCode}' && otp_verified_status='no'`
    );
    if (result2 && result2.length > 0 && result2[0].otp) {
  let otpObj = {
    mobile_no: result2[0].mobile_no,
    user_code: result2[0].user_code,
    otp: result2[0].otp,
  };
  return { result2 };
}
}
return null;
}
async function create(data) {
  const sql = `INSERT IGNORE INTO seed_company_master  (account_id,company_name,contact_number,email_id,house_door_no,district_id,state_id,aadhar_no,seed_license_no,seed_license_expiry_date,tin_no,pan_no,incharge_state,incharge_district,incharge_house_no,incharge_mobile_no,incharge_name,incharge_email,amount,draft_date,draft_no,branch,bank_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  var accountId = "PRD-" + shortid.generate();
  let params = [
    accountId,
    data.name,
    data.mobile_no,
    data.email,
    data.house_no,
    data.district.district_id,
    data.state.state_id,
    data.aadhaar_no,
    data.seed_selling_no,
    data.seed_selling_date,
    data.tin_no,
    data.pan_no,
    data.incharge_state.state_id,
    data.incharge_district.district_id,
    data.incharge_house_no,
    data.incharge_mobile_no,
    data.incharge_name,
    data.incharge_email,
    data.amount,
    data.dd_date,
    data.bank_draft_no,
    data.branch,
    data.bank_name.bank_id,
  ];

  const result = await db.query(sql, params);

  let message = "Registration Failed! Please try again";
  let status = "failed";
  if (result.affectedRows) {
    message = "Registration successfully. Please wait for the Approval";
    status = "success";
  }
  const result1 = await db.query(
    `INSERT IGNORE INTO producer_account_payments_table(account_id,bank_id,amount,branch,draft_no,draft_date) 
    VALUES 
    (?,?,?,?,?,?)`,
    [
      accountId,
      data.bank_name.bank_id ?? "",
      data.amount ?? "",
      data.branch ?? "",
      data.bank_draft_no ?? "",
      data.dd_date ?? "",
    ]
  );
  if (result1.affectedRows) {
    // message = "Producer payment saved  successfully"
  }

  return { message, status };
}
async function updateOtpData(mobileNumber, userCode, data) {
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date+' '+time;
  
  const otp_verified_time = dateTime;
  const result = await db.query(
    `UPDATE mh_otp_log SET otp_verified_time=?, otp_verified_status=? WHERE mobile_no='${mobileNumber}' && user_code='${userCode}'`,
    [
      otp_verified_time,
      "yes"
    ]
  );

  if (result.affectedRows > 0) {
    return { message: "OTP verification successful" };
  } else {
    return { message: "OTP verification failed. Please try again." };
  }
}
// async function updateOtpData(mobileNumber, userCode, data) {
//   var today = new Date();
//   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//   var dateTime = date+' '+time;
  
//   let otp_verified_time = dateTime;
//   var result = await db.query(
//     `UPDATE mh_otp_log SET otp_verified_time=?, otp_verified_status=? WHERE mobile_no='${mobileNumber}' && user_code='${userCode}'`,
//     [
//       otp_verified_time,
//       "yes"
//     ]
//   );
//   let message = "Login Failed! Please try again";
//   if (result.affectedRows) {
//     message = "Login successfully"
//   }

//   return { message };
// }

async function approveUser(approveArr) {
  //for loop - approve

  approveArr.forEach(async (element) => {
    var result = await db.query(
      `UPDATE seed_company_master SET status="approved" WHERE account_id=?`,
      [element.status, element.account_id]
    );
  });

  let message = "Error in approving User Account";

  if (result.affectedRows) {
    message = "User Account Approved";
  }

  return { message };
}

async function update(id, update) {
  const result = await db.query(
    `UPDATE seed_company_master 
    SET status = "approved" WHERE account_id=?`,
    [update.account_id]
  );
  let message = "Error while approving User Account";

  if (result.affectedRows) {
    message = "User Account Approved successfully";
  }

  let password = "guest";
  const result1 = await db.query(
    `INSERT IGNORE INTO users(user_id,user_name,password,created_at) 
  VALUES 
  (?,?,?,?)`,
    [update.account_id, update.email_id, password, new Date()]
  );
  // let message = "Error while approving User Account";

  if (result1.affectedRows) {
    // message = "User Account Approved successfully";
  }
  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM mhz_accounts WHERE id=?`, [id]);

  let message = "Error in deleting User Account";

  if (result.affectedRows) {
    message = "User Account deleted successfully";
  }

  return { message };
}

//login
// async function login(data) {
//   let message = `Invalid Credentials`;
//   let status = false;
//   const sql = `SELECT role, sub_role,account_id, user_name, name,mobile_no,user_name,password,sub_role, email, password, created_at, updated_at,zone,accstatus,travelstatus,medicalstatus,foodstatus FROM users WHERE user_name=? AND password=? AND role =?`;
//   const rows = await db.query(sql, [data.username, data.password, data.role]);
//   const user = helper.emptyOrRows(rows);
//   if (user.length > 0) {
//     message = `Login Sucessfully`;
//     status = true;
//   }
//   return { user, message, status };
// }
async function login(data) {
  let message = `Invalid Credentials`;
  let status = false;
  let rows, user;

  if (data.role === "partner") {
    const partnerSql = `SELECT role, sub_role, account_id, user_name, name, mobile_no, user_name, password, sub_role, email, password, created_at, updated_at, zone, accstatus, travelstatus, medicalstatus, foodstatus FROM users WHERE user_name=? AND password=? AND role=?`;
    rows = await db.query(partnerSql, [
      data.username,
      data.password,
      "partner",
    ]);
    user = helper.emptyOrRows(rows);
  } else {
    const combinedSql = `SELECT sno,city_id, role, sub_role, account_id, user_name, name, mobile_no, user_name, password, sub_role, email, password, created_at, updated_at, zone, accstatus, travelstatus, medicalstatus, foodstatus FROM users WHERE user_name=? AND password=? AND (role=? OR role=? OR role=?)`;
    rows = await db.query(combinedSql, [
      data.username,
      data.password,
      "admin",
      "staff",
      "city_manager",
    ]);
    user = helper.emptyOrRows(rows);
  }

  if (user.length > 0) {
    message = `Login Successfully`;
    status = true;
  }
  return { user, message, status };
}

async function getUserMenus(role, sub_role) {
  const sql = `SELECT menu_name as title,menu_path as link,menu_icon as icon FROM user_role_menus_table WHERE role='${role}' AND sub_role='${sub_role}' `;
  const rows = await db.query(sql);
  const menus = helper.emptyOrRows(rows);
  return menus;
}

module.exports = {
  getMultiple,
  getSingleAccount,
  create,
  update,
  remove,
  approveUser,
  login,
  getUserMenus,
  userLogin,
  updateOtpData
};
