const db = require("./db");
const helper = require("../helper");

async function userSignupDetails(data, ip) {
  // console.log("data", data);
  let message = "";
  let message1 = "";
  let ip_address = ip;
  let numericNum = await helper.generateUserID("mhgenie_signup_table","s_no ");
   let createNumber = numericNum.toString().padStart("6", 0);
  let userid = `GENUID${createNumber}`;


  const results = await db.query(
    `SELECT phone_number
    FROM mhgenie_signup_table
    WHERE phone_number = ?`,
    [data.phone_number]
  );

  if (results.length > 0) {
    message = "Mobile number already registered";
  } else {
    await db.query(
      `INSERT INTO mhgenie_signup_table(user_id,email_id, phone_number, username, password, confirm_password, ip_address) VALUES (?,?,?,?,?,?,?)`,
      [
        userid !== null && userid !== undefined ? userid : "",
        data.email_id !== null &&  data.email_id !== undefined ?  data.email_id : "",
        data.phone_number !== null &&  data.phone_number !== undefined ?  data.phone_number : "",
        data.username !== null &&  data.username !== undefined ?  data.username : "",
        data.password !== null &&  data.password !== undefined ?  data.password : "",
        data.confirm_password !== null &&  data.confirm_password !== undefined ?  data.confirm_password : "",  
        ip_address ,
      ]
    );
    message = "Signup successful";
  }

  return { message, message1 };
}

async function mhgenieLogin(data) {

let message = `Invalid Credentials`;
let status = false;
let rows, user;

const combinedSql = `SELECT s_no, user_id, email_id, phone_number, username, password, confirm_password FROM mhgenie_signup_table WHERE (username=? OR email_id=? OR phone_number=?) AND password=?`;
  rows = await db.query(combinedSql, [
    data.username,
    data.username,
    data.username,
    data.password,
  ]);
  user = helper.emptyOrRows(rows);
if (user.length > 0) {
  message = `Login Successfully`;
  status = true;
}
return { user, message, status };
}

async function savePatientDetails(data, ip) {
  // console.log(data)
  let patientid = await helper.generatePatientID();
  let ip_address = ip;
  let patientproblem = "";

  if (Array.isArray(data.problem)) {
    patientproblem = data.problem.join(", ");
  } else {
    patientproblem = data.problem || "";
  }
  const result = await db.query(
    `INSERT INTO mhgenie_patient_details(user_id,patient_id, patient_firstname, patient_lastname, email_id,phone_number, patient_location, problem, pr_description,ip_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.user_id !== null && data.user_id !== undefined ? data.user_id : "",
        patientid !== null && patientid !== undefined ? patientid: "",
        data.patient_firstname !== null &&  data.patient_firstname !== undefined ?  data.patient_firstname: "",
        data.patient_lastname !== null &&  data.patient_lastname !== undefined ?  data.patient_lastname: "",
        data.email_id !== null &&  data.email_id !== undefined ?  data.email_id: "",
        data.phone_number !== null &&  data.phone_number !== undefined ?  data.phone_number: "",
        data.patient_location !== null &&  data.patient_location !== undefined ?  data.patient_location: "",
        patientproblem !== null &&  patientproblem !== undefined ?  patientproblem: "",
        data.pr_description !== null &&   data.pr_description !== undefined ?   data.pr_description: "",
        ip_address,
      ]
  );

  let message = "Error in Patient Details Master";

  if (result.affectedRows) {
    message = "Patient details submitted";
  }
  return { message };
}

async function getPatientDetails() {
  const rows = await db.query(
    `SELECT s_no, patient_id, patient_firstname, patient_lastname, email_id, phone_number, patient_location, problem, pr_description, created_datetime FROM mhgenie_patient_details WHERE 1`
  );
  const result = helper.emptyOrRows(rows);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;
      const formattedDateTime = new Date(element.created_datetime).toLocaleString();
      data.push({
        ...element,
        created_datetime: formattedDateTime,
      });
    }
  }
  return data;
}
async function getgenieuserdetails() {
  const rows = await db.query(
    `SELECT user_id, email_id, phone_number, username FROM mhgenie_signup_table WHERE 1`
  );
  const data = helper.emptyOrRows(rows);
  // console.log(data);
  return data;
}

module.exports = {
  userSignupDetails,
  mhgenieLogin,
  savePatientDetails,
  getPatientDetails,
  getgenieuserdetails
};
