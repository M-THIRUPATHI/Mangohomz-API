const db = require("./db");
const helper = require("../helper");

async function getMultiple() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT property_name FROM mht_hotels ORDER BY property_name ASC`
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
