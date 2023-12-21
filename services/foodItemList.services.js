const db = require("./db");
const helper = require("../helper");
const fileUpload = require("express-fileupload");

async function loadFoodItems(params) {
  const rows = await db.query(
    `SELECT food_type_id,item_name FROM mh_food_item_details  GROUP BY food_type_id;`
  );
  const data = helper.emptyOrRows(rows);

  return { data };
}
async function getAllFoodItemsList(params) {
  const rows = await db.query(
    `SELECT food_items_id,food_items_name FROM mh_food_item_details  WHERE food_type_id = '${params}'`
  );
  const data = helper.emptyOrRows(rows);

  return { data };
}

async function getMultiple(params) {
  const rows = await db.query(
    `SELECT food_items_id,food_items_name FROM mh_food_item_details  WHERE food_type_id = '${params}'`
  );
  const data = helper.emptyOrRows(rows);

  return { data };
}
async function getSingleCropConditionDetail(id) {
  const rows = await db.query(
    `SELECT sno,condition_id, condition_name,last_updated FROM mh_food_item_details WHERE condition_id=?`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return { data };
}
async function create(data) {
  const result = await db.query(
    `INSERT IGNORE INTO mh_food_item_details 
      (priority_order, name,description,saved_time) 
      VALUES 
      (?, ?,?,?)`,
    [data.priority_order, data.name, data.description, new Date()]
  );

  let message = "Error in Food Items List";

  if (result.affectedRows) {
    message = "Food Items List submitted successfully";
  }

  return { message };
}

async function update(id, update) {
  const result = await db.query(
    `UPDATE mh_food_item_details 
      SET  condition_name=?
      WHERE condition_id=?`,
    [update.condition_name, update.condition_id]
  );

  let message = "Error in updating Food Item List";

  if (result.affectedRows) {
    message = "Food Item List updated successfully";
  }

  return { message };
}
async function remove(id) {
  const result = await db.query(
    `DELETE FROM mh_food_item_details WHERE condition_id=?`,
    [id]
  );

  let message = "Error in deleting Food Item List";

  if (result.affectedRows) {
    message = "Food Item List deleted successfully";
  }

  return { message };
}
module.exports = {
  getAllFoodItemsList,
  loadFoodItems,
  getMultiple,
  getSingleCropConditionDetail,
  create,
  update,
  remove,
};
