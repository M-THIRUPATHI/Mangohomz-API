const db = require("./db");
const helper = require("../helper");
const fileUpload = require("express-fileupload");

async function getMultiple() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT amenity_id, amenity_name, icon_image FROM mht_room_facilities`
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return { data };
}
async function getpropertyAmenities() {
  const rows = await db.query(
    `SELECT amenity_id, amenity_name, icon_image FROM mht_property_facilities`
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return { data };
}
async function getSingleCropConditionDetail(id) {
  const rows = await db.query(
    `SELECT sno,condition_id, condition_name,last_updated FROM mht_room_facilities WHERE condition_id=?`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return { data };
}
async function create(data) {
  const result = await db.query(
    `INSERT IGNORE INTO mht_room_facilities 
      (priority_order, name,description,saved_time) 
      VALUES 
      (?, ?,?,?)`,
    [data.priority_order, data.name, data.description, new Date()]
  );

  let message = "Error in Facility Type Master";

  if (result.affectedRows) {
    message = "Facility Type Master submitted successfully";
  }

  return { message };
}

async function update(id, update) {
  const result = await db.query(
    `UPDATE mht_room_facilities 
      SET  condition_name=?
      WHERE condition_id=?`,
    [update.condition_name, update.condition_id]
  );

  let message = "Error in updating Facility Master";

  if (result.affectedRows) {
    message = "Facility Master updated successfully";
  }

  return { message };
}
async function remove(id) {
  const result = await db.query(
    `DELETE FROM mht_room_facilities WHERE condition_id=?`,
    [id]
  );

  let message = "Error in deleting Facility Master";

  if (result.affectedRows) {
    message = "Facility Master deleted successfully";
  }

  return { message };
}
module.exports = {
  getMultiple,
  getpropertyAmenities,
  getSingleCropConditionDetail,
  create,
  update,
  remove,
};
