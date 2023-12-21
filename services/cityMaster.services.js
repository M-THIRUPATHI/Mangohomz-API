const db = require("./db");
const helper = require("../helper");

async function getMultiple() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT DISTINCT city_id, city_name FROM mh_search_city_master WHERE status="yes" GROUP BY city_id ORDER BY priority ASC`
  );
 
  const data = helper.emptyOrRows(rows);
  return data;
}

// async function getMultiple() {
//   const rows = await db.query(`SELECT city_id, city_name FROM mh_property_details_table GROUP BY city_id ORDER BY city_name ASC`);
//   const data = helper.emptyOrRows(rows);

//   return {data}
// }

async function getAllPointTypes(city_code) {
  const rows = await db.query(
    `SELECT DISTINCT point_type FROM travel_points_city_wise_master WHERE city_code ='${city_code}'`,
  );
  const data = helper.emptyOrRows(rows);
  return data;
}

async function getAllPointNames(city_code, point_type, hotel_txn_id) {
  const rows = await db.query(
    `SELECT DISTINCT point_name, city_name, point_type, latitude, longitude FROM travel_points_city_wise_master WHERE city_code = ? AND point_type = ?`,
    [city_code, point_type]
  );
  const data = helper.emptyOrRows(rows);

  const R = 6371;

  for (const point of data) {
    const latitude1 = parseFloat(point.latitude);
    const longitude1 = parseFloat(point.longitude);

    const propertyRows = await db.query(
      `SELECT txn_id, sub_property_name, property_latitude, property_longitude FROM mh_property_details_table WHERE txn_id = ?`,
      [hotel_txn_id]
    );
    const propertyData = helper.emptyOrRows(propertyRows);

    for (const property of propertyData) {
      const latitude2 = parseFloat(property.property_latitude);
      const longitude2 = parseFloat(property.property_longitude);

      const dLat = (latitude2 - latitude1) * (Math.PI / 180);
      const dLon = (longitude2 - longitude1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(latitude1 * (Math.PI / 180)) *
          Math.cos(latitude2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const kiloMeter = parseFloat(R * c).toFixed(2);

      point.kiloMeter = kiloMeter;
    }
  }

  // console.log(data);
  return data;
}

async function getpropertyallcity() {
  const rows = await db.query(
    `SELECT DISTINCT city_id, city_name FROM mh_search_city_master WHERE status="yes" GROUP BY city_id`
  );
  const data = helper.emptyOrRows(rows);
  return data;
}
async function getarthilabcities() {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT DISTINCT city FROM aarti_center_tests_availability WHERE status="Yes"; `
  );
 
  const data = helper.emptyOrRows(rows);
  return data;
}
async function getarthilabcenters(city) {
  //   const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT  city , center_name ,center_address, pin_code FROM aarti_center_tests_availability WHERE city = '${city}'; `
  );
 
  const data = helper.emptyOrRows(rows);
  return data;
}
// city address loading
async function getarthilabaddress(city,center_name) {
  
  const rows = await db.query(
    `SELECT  city , center_name ,center_address, pin_code FROM aarti_center_tests_availability WHERE city='${city}' AND center_name = '${center_name}'; `
  );
 
  const data = helper.emptyOrRows(rows);
  return data;
}
async function getarthilabtesttypes(city,center_name) {
  
  const rows = await db.query(
    `select distinct test_type FROM aarti_tests_price_master order by test_type`
  );
 
 
  const data = helper.emptyOrRows(rows);
  return data;
}

//below sir written


async function checkAvailabilityofTest(city,center_name,test_type) {
  // console.log("services",test_type);
 
  const qry = 'SELECT '+test_type+' as status from aarti_center_tests_availability where city='+"'"+city+"'"+' and center_name = '+"'"+center_name+"'";
  console.log(qry);
  const rows = await db.query(qry);
 
  const data = helper.emptyOrRows(rows);
  return data;
}


async function getTestNamesByType(city,test_type) {
//  console.log("gggggggggg",city);
   const testqry='SELECT department,test_type,test_name,'+city+' as price,concat(test_name," - ₹",'+city+') as fulltestname FROM aarti_tests_price_master WHERE test_type='+"'"+test_type+"'";
  console.log(testqry);
  const rows = await db.query(testqry);
  const data = helper.emptyOrRows(rows);
  return data;
}

// async function getMultiple() {
//   const rows = await db.query(`SELECT city_id, city_name FROM mh_property_details_table GROUP BY city_id ORDER BY city_name ASC`);
//   const data = helper.emptyOrRows(rows);
  
//   return {data}
// }

module.exports = {
  getMultiple,
  getarthilabcities,
  getarthilabcenters,
  getarthilabtesttypes,
  // getarthilabtestname,
  getarthilabaddress,
  checkAvailabilityofTest,
  getTestNamesByType,
getAllPointTypes,
  getAllPointNames,
  getpropertyallcity,
};