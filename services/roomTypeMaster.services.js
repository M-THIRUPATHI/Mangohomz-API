const db = require("./db");
const helper = require("../helper");

async function getMultiple() {
    //   const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT id,room_type, room_short_description,room_long_description FROM mht_rooms_description WHERE 1`
    );
    const data = helper.emptyOrRows(rows);
    //   const meta = { page };
  
    return {
      data
    };
  }
  async function getSingleSeasonDetail(id) {
    const rows = await db.query(
      `SELECT sno, season_id, season_name, season, last_updated, short_name FROM mht_rooms_description WHERE season_id=?`,[id]
    );
    const data = helper.emptyOrRows(rows);
    //   const meta = { page };
  
    return {
      data
    };
  }
  async function create(data) {
    let room_code = "MHRT" + await helper.generateNumeraricIncID('mht_rooms_description','room_id');
    const result = await db.query(
      `INSERT INTO mht_rooms_description(room_id,room_type, room_short_description,room_long_description,saved_time ) 
      VALUES 
      (?, ?,?,?,?)`,
      [
        room_code ?? "",
        data.room_type ?? "",
        data.room_short_description ?? "",
        data.room_long_description ?? "",
        new Date()     
      
      ]
    );
  
    let message = "Error in Room Types Master";
  
    if (result.affectedRows) {
      message = "Room Types Master created successfully";
    }
  
    return { message };
  }
  
  async function update(id, update) {
    const result = await db.query(
      `UPDATE mht_rooms_description 
      SET  season_name=?
      WHERE season_id=?`,
      [ update.season_name, update.season_id]
    );
  
    let message = "Error in updating Room Types Master";
  
    if (result.affectedRows) {
      message = "Room Types Master updated successfully";
    }
  
    return { message };
  }
  async function remove(id) {
    const result = await db.query(`DELETE FROM mht_rooms_description WHERE season_id=?`, [id]);
  
    let message = "Error in deleting Room Types Master";
  
    if (result.affectedRows) {
      message = "Room Types Master deleted successfully";
    }
  
    return { message };
  }
  module.exports = {
    getMultiple,
    getSingleSeasonDetail,
    create,
    update,
    remove
  };


