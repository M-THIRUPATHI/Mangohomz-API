const db = require("./db");
const helper = require("../helper");

async function getMultiple() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT property_id, property_name FROM mh_property_dropdown`
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };
  return {
    data,
  };
}

module.exports = {
  getMultiple,
};
