const db = require("./db");
const helper = require("../helper");

async function getMultiple(id) {
  let sql = `SELECT city,city_id FROM mh_city_master WHERE state_id= '${id}' ORDER BY city ASC`;
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);
  return {data};
}
async function getAllCities() {
  let sql = `SELECT city,city_id FROM mh_city_master ORDER BY city ASC`;
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);
  return {data};
}
async function getCityName(city) {
  const sql = `SELECT count(*) as c FROM mh_city_master WHERE city ='${city}'`;
  const rows = await db.query(sql, [city]);
  console.log("rows",rows);
  const menus = helper.emptyOrRows(rows);
  return menus;
}


// async function getCityName(city) {
//   const sql = `SELECT count(*) as c FROM (SELECT user_name FROM seed_company_master UNION ALL SELECT user_name FROM apply_reg_renew_proc_plant UNION All SELECT user_name FROM users) AS a  WHERE a.city = '${city}';`;
//   const rows = await db.query(sql, [city]);
//   const menus = helper.emptyOrRows(rows);
//   return menus;
// }
module.exports = {
  getCityName,
  getMultiple,
  getAllCities
};
