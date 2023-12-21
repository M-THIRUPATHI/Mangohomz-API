const db = require("./db");
const helper = require("../helper");
const fileUpload = require("express-fileupload");

async function getMultiple() {
  const rows = await db.query(
    `SELECT item_name,item_id FROM mh_equipment_item_details WHERE 1 GROUP BY item_id;`
  );
  const data = helper.emptyOrRows(rows);

  return { data };
}
async function getMedicalUnits(item_id) {
    const rows = await db.query(
      `SELECT units,unit_id FROM mh_equipment_item_details  WHERE item_id = '${item_id}'`
    );
    const data = helper.emptyOrRows(rows);
    return { data };
  }
module.exports = {
  getMultiple,
  getMedicalUnits,
};
