const db = require("./db");
const helper = require("../helper");
const fileUpload = require("express-fileupload");

async function loadAllMedicalstores(params) {
  const rows = await db.query(
    `SELECT medical_store_id,medical_store_name FROM mh_medical_store_items`
  );
  const data = helper.emptyOrRows(rows);

  return { data };
}

module.exports = {
  loadAllMedicalstores,
};
