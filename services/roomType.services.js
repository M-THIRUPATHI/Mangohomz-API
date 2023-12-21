const db = require("./db");
const helper = require("../helper");

async function getRoomTYpe() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT room_id,room_type FROM mht_rooms_description ORDER BY room_type ASC`
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return {
    data,
  };
}

module.exports = {
  getRoomTYpe,
};
