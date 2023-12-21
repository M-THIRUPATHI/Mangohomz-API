const db = require("./db");
const helper = require("../helper");
const { load } = require("dotenv");

// async function getMultiple(cityID) {
//   let sql = `SELECT id, property_id, city_id, city, near_hospital_id, near_hospital_name, property_type_id, property_name, registration_number, phone, fax, email, latitude, longitude, distance_from_hospital, facilities, cancel_reservation_day, agent_comm_perc, display_order,number_of_views, video_link, is_default, preferences, description, building_no, street, is_active, landmark, country, state_name, pincode, rating, hotel_image_1, hotel_image_2, hotel_image_3, hotel_image_4, hotel_image_5, hotel_image_6, hotel_image_7, accept, min_price FROM mht_hotels WHERE city_id = '${cityID}' GROUP BY near_hospital_name`;
//   const rows = await db.query(sql);
//   const data = helper.emptyOrRows(rows);
//   //   const meta = { page };
//   return {
//     data,
//   };
// }

async function getMultiple(city_id) {
  let sql = `SELECT sno, near_hospital_id, concat(near_hospital_name,"," , " ",locality) as near_hospital_name, hospital_nick_name, type, latitude, locality, longitude, distance_from_hospital, city_id, city, city_alias, state, address, pin_code, specialty, gmap_loc_link, no_of_bed, hospital_link, ratings, status FROM mh_hospital_master WHERE city_id = '${city_id}' GROUP BY near_hospital_name`;
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);
  //   const meta = { page };
  return {
    data,
  };
}

//Hospital Master Details POST Method

async function createHospitalDetails(data) {
  //console.log(fields)

  //console.log(data, "daata");

  let numericNum = await helper.generatehealthSupportID(
    "mh_hospital_master",
    "sno"
  );
  let near_hospital_id = `MHHOSP${numericNum}`;
  const result = await db.query(
    `INSERT IGNORE INTO mh_hospital_master (near_hospital_id,near_hospital_name,locality,hospital_nick_name,
      city_seo_name,hospital_seo_name,
      type,
      latitude,
      longitude,
      state,
      city,
      address,
      pin_code,
      specialty,
      no_of_bed,
      ratings)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      near_hospital_id ?? "",
      data.near_hospital_name ?? "",
      data.locality ?? "",
      data.hospital_nick_name ?? "",
      data.city_seo_name ?? "",
      data.hospital_seo_name ?? "",
      data.type ?? "",
      data.latitude ?? "",
      data.longitude ?? "",
      data.state.state_name ?? "",
      data.city.city ?? "",
      data.address ?? "",
      data.pin_code ?? "",
      data.specialty ?? "",
      data.no_of_bed ?? "",
      data.ratings ?? "",
    ]
  );
  let message = "Error in Hospital  Master";

  if (result.affectedRows) {
    message = "Fospital Master Details submitted successfully";
  }

  return { message };
}

// //Hospital Master GET MEthod async Function
// async function loadHospitalMasterDetails() {
//   const rows = await db.query(
//     `SELECT sno, near_hospital_id,near_hospital_name,locality,hospital_nick_name,city_seo_name,hospital_seo_name,type, latitude, longitude,distance_from_hospital,city_id, city,city_alias,state,address, pin_code, specialty, gmap_loc_link, no_of_bed,  hospital_link, ratings, status FROM mh_hospital_master WHERE 1`
//   );
//   const data = helper.emptyOrRows(rows);
//   //   const meta = { page };
//    console.log(data);
//   return {
//     data,
//   };
// }



async function updateHospitalData(near_hospital_id, data) {
  //console.log(near_hospital_id,data)
  const result = await db.query(
    `UPDATE mh_hospital_master SET near_hospital_name=?, locality=?,hospital_nick_name=?, 
    type=?,city_seo_name=?, hospital_seo_name=?,address=?,latitude=?, longitude=?,
     state=?, city=?, pin_code=?,specialty=?,no_of_bed=?,ratings=? WHERE near_hospital_id='${near_hospital_id}'`,
    [
      data.near_hospital_name ?? "",
      data.locality ?? "",
      data.hospital_nick_name ?? "",
      data.type ?? "",
      data.city_seo_name ?? "",
      data.hospital_seo_name ?? "",
      data.address ?? "",
      data.latitude ?? "",
      data.longitude ?? "",
      data.state.state_name ?? "",
      data.city.city ?? "",
      data.pin_code ?? "",
      data.specialty ?? "",
      data.no_of_bed ?? "",
      data.ratings ?? "",
    ]
  );
  let message = "Error in updating Hospital Data";

  if (result.affectedRows) {
    message = "Hospital Master Data  updated successfully";
  }

  return { message };
}

// async function loadCount() {
//   const rows = await db.query(
//     `SELECT COUNT(*) FROM mh_hospital_master;`
//   );
//   const data = helper.emptyOrRows(rows);
//   //   const meta = { page };
//   console.log(rows);
//   return {
//     data,
//   };
// }

//loadCount();
//loadHospitalMasterDetails();

module.exports = {
  getMultiple,
  createHospitalDetails,
  // loadHospitalMasterDetails,
  updateHospitalData,
};
