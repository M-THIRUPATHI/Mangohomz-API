const db = require("./db");
const helper = require("../helper");

async function getMultiple() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT state_id,state_name FROM state_master WHERE status='yes' ORDER BY state_name ASC`
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
