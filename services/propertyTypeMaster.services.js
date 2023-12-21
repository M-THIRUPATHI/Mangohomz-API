const db = require("./db");
const helper = require("../helper");

async function getMultiple() {
    //   const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT id,property_type,priority_order FROM mht_hotels_property_types WHERE 1
      `
    );
    const data = helper.emptyOrRows(rows);
    //   const meta = { page };
  
    return {
      data
    };
  }
  async function getSingleClassDetail(id) {
    //   const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT sno, class_id, class_name, created_emp_name, created_emp_id, created_ip, updated_emp_name, updated_emp_id, updated_ip, created_datetime, updated_datetime FROM mht_hotels_property_types WHERE class_id=?`,[id]
    );
    const data = helper.emptyOrRows(rows);
    //   const meta = { page };
  
    return {
      data
    };
  }
  async function create(data) {
     let property_code = "MHPT" + await helper.generateNumeraricIncID('mht_hotels_property_types','property_code');
    
    const result = await db.query(
      `INSERT INTO mht_hotels_property_types(property_code,property_type,priority_order,saved_time) 
      VALUES 
      (?,?, ?,?)`,
      [
        property_code ?? "",
        data.property_type ?? "",
        data.priority_order ?? "",        
        new Date()
      ]
    );
  
    let message = "Error in Property Type Master";
  
    if (result.affectedRows) {
      message = "Property Type Master created successfully";
    }
  
    return { message };
  }
  
  async function update(id, update) {
    const result = await db.query(
      `UPDATE mht_hotels_property_types 
      SET  class_name=? 
      WHERE class_id=?`,
      [update.class_name, update.class_id]
    );
  
    let message = "Error in updating Property Type Master";
  
    if (result.affectedRows) {
      message = "Property Type Master updated successfully";
    }
  
    return { message };
  }
  async function remove(id) {
    const result = await db.query(`DELETE FROM mht_hotels_property_types WHERE class_id=?`, [id]);
  
    let message = "Error in deleting Property Type Master";
  
    if (result.affectedRows) {
      message = "Property Type Master deleted successfully";
    }
  
    return { message };
  }
  module.exports = {
    getMultiple,
    getSingleClassDetail,
    create,
    update,
    remove
  };


