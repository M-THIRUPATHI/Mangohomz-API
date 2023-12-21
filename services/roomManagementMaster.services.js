const db = require("./db");
const helper = require("../helper");

async function getMultiple() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, property_name, room_type, default_price, extra_bed_charge, max_adults,max_extra_beds FROM mht_rooms WHERE 1`
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return {
    data,
  };
}
async function getSingleSchemeDetail(id) {
  const rows = await db.query(
    `SELECT sno, scheme_name, scheme_id, inserted_emp_id, inserted_emp_name, updated_emp_id,updated_emp_name,created_datetime,updated_datetime,inserted_ip,updated_ip  FROM mht_rooms WHERE scheme_id=?`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };

  return {
    data,
  };
}
async function create(data) {
  var accept = data.accept == true ? "yes":"no";
    const result = await db.query(
    `INSERT IGNORE INTO mht_rooms 
      (accept,property_name,room_id,room_type,room_short_description,room_long_description,room_floor,max_adults,max_extra_beds,max_children,room_area,bathrooms,single_beds,double_beds,folding_sofa_beds,room_count,default_price,extra_bed_charge,discount_night_type,discount_night_3,discount_night_4,discount_night_5,discount_guests_type,discount_guests_3,discount_guests_4,discount_guests_5,refund_money_type,refund_money_value,facilities,server_datetime) 
      VALUES 
      (?,?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      accept ?? "",
      data.property_name.property_name ?? "", 
      data.roomType.room_id ?? "", 
      data.roomType.room_type ?? "", 
      data.room_short_description ?? "",
      data.room_long_description ?? "",
      data.floor ?? "",
      data.max_adults ?? "",
      data.max_extra_beds ?? "",
      data.max_kids ?? "",
      data.room_area ?? "",
      data.bathrooms ?? "",
      data.single_beds ?? "",
      data.double_beds ?? "",
      data.folded_beds ?? "",
      data.no_of_rooms_spec ?? "",
      data.default_price ?? "",
      data.extra_bed_charges ?? "",
      data.discount_night ?? "",
      data.discount_night_3 ?? "",
      data.discount_night_4 ?? "",
      data.discount_night_5 ?? "",
      data.discount_guest ?? "",
      data.discount_guest_3 ?? "",
      data.discount_guest_4 ?? "",
      data.discount_guest_5 ?? "",
      data.type_of_money_refund ?? "",
      data.money_refund_value ?? "",
      data.facilities[0].name ?? "",
      new Date().toISOString().substr(0, 10)]
  );


  let message = "Error in Rooms Management Master";

  if (result.affectedRows) {
    message = "Rooms Management Master created successfully";
  }

  return { message };
}

async function update(id, update) {
  const result = await db.query(
    `UPDATE mht_rooms 
      SET  scheme_name=?
      WHERE scheme_id=?`,
    [
      update.scheme_name ?? "",
      update.scheme_id ?? "",
    ]
  );

  let message = "Error in updating Rooms Management Master";

  if (result.affectedRows) {
    message = "Rooms Management Master updated successfully";
  }

  return { message };
}
async function remove(id) {
  const result = await db.query(`DELETE FROM mht_rooms WHERE scheme_id=?`, [
    id,
  ]);

  let message = "Error in deleting Rooms Management Master";

  if (result.affectedRows) {
    message = "Rooms Management Master deleted successfully";
  }

  return { message };
}
module.exports = {
  getMultiple,
  getSingleSchemeDetail,
  create,
  update,
  remove,
};
