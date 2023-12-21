const db = require("./services/db");

function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}
async function generatePartnerSUBID() {
  let sql = `SELECT MAX(partner_sub_id)+1  as p_sub_id FROM mh_property_master WHERE 1;`;
  let result = await db.query(sql);
  let data = "";
  if(result[0].p_sub_id == 0){
    data = 1;
  }else{
    data = result[0].p_sub_id;
  }

  return data;
}
async function generateAgentSUBID(params) {
  let sql = `SELECT MAX(agent_sub_id)+1  as a_sub_id FROM mh_agent_master WHERE 1;`;
  let result = await db.query(sql);
  return result[0].a_sub_id;
}
async function generateEquipmentSUBID(params) {
  let sql = `SELECT MAX(equipment_sub_id)+1  as e_sub_id FROM mh_equipment_master WHERE 1;`;
  let result = await db.query(sql);
  return result[0].e_sub_id;
}
// generates ID inc wise by passing table_name and coloumn_name
async function generateNumeraricInGrievance() {
  let sql = `SELECT MAX(sno)+1 as id  FROM mh_grievance_table`;
  let result = await db.query(sql);
  let data = "";
  if(result[0].id == 0 || result[0].id == null){
    data = 1;
  }else{
    data = result[0].id;
  }
  return data;
}
async function generateNumeraricIncID(table_name, col_name) {
  let sql = `SELECT MAX(${col_name})+1 as id  FROM ${table_name}`;
  let result = await db.query(sql);
  let data = "";
  if(result[0].id == 0 || result[0].id == null){
    data = 1;
  }else{
    data = result[0].id;
  }
  return data;
}

async function getSchemeNameBySchemeId(id) {
  const sql = `SELECT scheme_name FROM scheme_master WHERE scheme_id = ${id}`;
  let result = await db.query(sql);
  return result[0].scheme_name;
}

async function getCropNameByCropId(id) {
  const sql = `SELECT crop_name FROM crop_master WHERE crop_id = ${id}`;
  let result = await db.query(sql);
  return result[0].crop_name;
}
async function getvarietalNameByVarietalId(id) {
  const sql = `SELECT variety_name FROM variety_master WHERE variety_id = ${id}`;
  let result = await db.query(sql);
  return result[0].variety_name;
}
async function getCountOfPartnerId(params) {
  let sql = `SELECT COUNT(partner_id) as partner_id  FROM mh_property_master WHERE partner_id = '${params}'`;
  let result = await db.query(sql);
  return result[0].partner_id;
}
async function getCountOfFoodId(params) {
  let sql = `SELECT COUNT(agent_id) as agent_id  FROM mh_food_master WHERE agent_id = '${params}'`;
  let result = await db.query(sql);
  return result[0].agent_id;
}
async function generateFoodPartnerSUBID(params){
  let sql = `SELECT MAX(agent_sub_id)+1  as a_sub_id FROM mh_food_master WHERE 1;`;
  let result = await db.query(sql);
  return result[0].a_sub_id;
}
async function getCountOfAgentId(params) {
  let sql = `SELECT COUNT(agent_id) as agent_id  FROM mh_agent_master WHERE agent_id = '${params}'`;
  let result = await db.query(sql);
  return result[0].agent_id;
}
async function getCountOfEquipmentId(params) {
  let sql = `SELECT COUNT(equipment_id) as equipment_id  FROM mh_equipment_master WHERE equipment_id = '${params}'`;
  let result = await db.query(sql);
  return result[0].equipment_id;
}
async function getCountOfTransportId(params) {
  let sql = `SELECT COUNT(agent_id) as agent_id  FROM mh_transport_master WHERE agent_id = '${params}'`;
  let result = await db.query(sql);
  return result[0].agent_id;
}
async function generateTransportSUBID(params) {
  let sql = `SELECT MAX(transport_sub_id)+1  as t_sub_id FROM mh_transport_master WHERE 1;`;
  let result = await db.query(sql);
  return result[0].t_sub_id;
}

async function getHotelAddress(partner_id,partner_sub_id,property_txn_id) {
  let sql = `SELECT concat(building_no,",",street,"," ,land_mark,"," ,city_name) as address,concat(state_name,"-",country) as state, pin_code FROM mh_property_details_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND txn_id = '${property_txn_id}'`;
  let result = await db.query(sql);
  return result;
}

async function getHotelAddressForPage2(partner_id,partner_sub_id,property_txn_id) {
  let sql = `SELECT concat(building_no,",",street,"," ,land_mark) as address FROM mh_property_details_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND txn_id = '${property_txn_id}'`;
  let result = await db.query(sql);
  return result;
}
async function getHotelAddressForPage21(partner_id,partner_sub_id) {
  let sql = `SELECT concat(building_no,",",street,"," ,land_mark) as address FROM mh_property_details_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}'`;
  let result = await db.query(sql);
  return result;
}
async function getHotelAddressForHotelInfo(partner_id,partner_sub_id,property_txn_id) {
  let sql = `SELECT concat(building_no,",",street,"," ,land_mark) as address FROM mh_property_details_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND txn_id = '${property_txn_id}'`;
  let result = await db.query(sql);
  return result;
}
async function getHotelImageBasedonPartner(partner_id,partner_sub_id,property_txn_id) {
  let sql = `SELECT upload_image FROM mh_property_details_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND txn_id = '${property_txn_id}'`;
  let result = await db.query(sql);
  return result[0].upload_image;
}
async function getHotelImageBasedonPartner1(partner_id,partner_sub_id) {
  let sql = `SELECT upload_image FROM mh_property_details_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' `;
  let result = await db.query(sql);
  return result[0].upload_image;
}


async function getgetPropertydata(partner_id,partner_sub_id,property_txn_id) {
  let sql = `SELECT sub_property_name,property_phone,property_email,property_alternate_email,property_description,checkIn_time,checkOut_time,state_id,state_name,city_id,city_name,property_email,property_phone,property_alternate_email FROM mh_property_details_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND txn_id = '${property_txn_id}'`;
  let result = await db.query(sql);
  return result[0];
}
async function getgetPropertydata1(partner_id,partner_sub_id) {
  let sql = `SELECT sub_property_name,property_phone,property_email,property_alternate_email,property_description,checkIn_time,checkOut_time,state_id,state_name,city_id,city_name,property_email,property_phone,property_alternate_email,mh_service_fee,property_gstin FROM mh_property_details_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' `;
  let result = await db.query(sql);
  return result[0];
}

async function getmhOfferStatus(partner_id,partner_sub_id,property_txn_id) {
  let sql = `SELECT mh_offer_status FROM mh_property_details_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND txn_id = '${property_txn_id}'`;
  let result = await db.query(sql);
  return result[0].mh_offer_status;
}
async function getmhOfferStatus1(partner_id,partner_sub_id) {
  let sql = `SELECT mh_offer_status FROM mh_property_details_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}'`;
  let result = await db.query(sql);
  return result[0].mh_offer_status;
}
async function getRoomDetails(partner_id,partner_sub_id,txn_id) {
  let sql = `SELECT price FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND property_txn_id ='${txn_id}' ORDER BY price`;
    
  let result = await db.query(sql);
  let data = "";
  if(result != ""){
    data = result[0].price
  }else{
    data = 0;
  }

  return data;
}

async function getRoomSpecialOfferDetails(partner_id,partner_sub_id,txn_id) {
  let sql = `SELECT property_specialOffer FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND property_txn_id ='${txn_id}'`;
    
  let result = await db.query(sql);
  let data = "";
  if(result != ""){
    data = result[0].property_specialOffer
  }else{
    data = 0;
  }

  return data;
}
async function getgstetails(partner_id,partner_sub_id,txn_id) {
  let sql = `SELECT gst_per FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND property_txn_id ='${txn_id}'`;
    
  let result = await db.query(sql);
  let data = "";
  if(result != ""){
    data = result[0].gst_per
  }else{
    data = 0;
  }

  return data;
}

async function getnoOfAvalableRoomMdetails(partner_id,partner_sub_id,txn_id) {
  let sql = `SELECT no_of_avail_rooms FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND property_txn_id ='${txn_id}'`;
    
  let result = await db.query(sql);
  let data = "";
  if(result != ""){
    data = result[0].no_of_avail_rooms
  }else{
    data = 0;
  }

  return data;
}
async function getMaximumAdultAllowdetails(partner_id,partner_sub_id,txn_id) {
  let sql = `SELECT max_allow_adult FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND property_txn_id ='${txn_id}'`;
    
  let result = await db.query(sql);
  let data = "";
  if(result != ""){
    data = result[0].max_allow_adult
  }else{
    data = 0;
  }

  return data;
}
async function getMaximumKidsAllowdetails(partner_id,partner_sub_id,txn_id) {
  let sql = `SELECT max_allow_kids FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND property_txn_id ='${txn_id}'`;
    
  let result = await db.query(sql);
  let data = "";
  if(result != ""){
    data = result[0].max_allow_kids
  }else{
    data = 0;
  }

  return data;
}



async function getroomTypePrioritydetails(partner_id,partner_sub_id,txn_id) {
  let sql = `SELECT room_type_priority FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND property_txn_id ='${txn_id}'`;
    
  let result = await db.query(sql);
  let data = "";
  if(result != ""){
    data = result[0].room_type_priority
  }else{
    data = 0;
  }

  return data;
}

async function getpartneSpecialOffer(partner_id,partner_sub_id,txn_id) {
  let sql = `SELECT partner_specialOffer FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND property_txn_id ='${txn_id}'`;
    
  let result = await db.query(sql);
  let data = "";
  if(result != ""){
    data = result[0].partner_specialOffer
  }else{
    data = 0;
  }

  return data;
}
// async function getRoomDetails(txn_id) {
//   let sql = `Select MIN(least_price) as price
//   FROM 
//   (SELECT Least(withac_withbreakfast_price,withac_withoutbreakfast_price,withoutac_withbreakfast_price,withoutac_withoutbreakfast_price) as least_price FROM mh_property_rooms_table WHERE  property_txn_id ='${txn_id}') as items 
//   WHERE least_price !=0`;
    
//   let result = await db.query(sql);
//   let data = "";
//   if(result != ""){
//     data = result[0].price
//   }else{
//     data = 0;
//   }

//   return data;
// }
async function getRoomUnits(partner_id,partner_sub_id,txn_id) {
  let sql = `SELECT units FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND property_txn_id ='${txn_id}'`;
  let result = await db.query(sql);
  let data = "";
  if(result != ""){
    data = result[0].units;
  }else{
    data = 0;
  }
  
  return data;
}
async function getPartnerName(partner_id) {
  let sql = `SELECT partner_name FROM mh_property_details_table WHERE partner_id = '${partner_id}'`;
  let result = await db.query(sql);
  return result[0].partner_name;
}
async function getSubPartnerName(partner_id,partner_sub_id) {
  let sql = `SELECT sub_partner_name FROM mh_property_details_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}'`;
  let result = await db.query(sql);
  return result[0].sub_partner_name;
}
async function getRoomImage1(partner_id,partner_sub_id,property_txn_id,room_txn_id) {
  let sql = `SELECT room_image_1 FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND property_txn_id = '${property_txn_id}' AND txn_id = '${room_txn_id}'`;
  let result = await db.query(sql);
  return result[0].room_image_1;
}
async function getRoomImage2(partner_id,partner_sub_id,property_txn_id,room_txn_id) {
  let sql = `SELECT room_image_2 FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND property_txn_id = '${property_txn_id}' AND txn_id = '${room_txn_id}'`;
  let result = await db.query(sql);
  return result[0].room_image_2;
}
async function getRoomImage3(partner_id,partner_sub_id,property_txn_id,room_txn_id) {
  let sql = `SELECT room_image_3 FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND property_txn_id = '${property_txn_id}' AND txn_id = '${room_txn_id}'`;
  let result = await db.query(sql);
  return result[0].room_image_3;
}

async function getGuestDetailsDataFromDb(mh_booking_id) {
  let sql = `SELECT mh_booking_id,guest_type, first_name, last_name, guest_name, guest_gender FROM mh_booking_txn_table WHERE mh_booking_id = '${mh_booking_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return data;
}
async function getbookingDetails(mh_booking_id) {
  let sql = `SELECT mh_booking_id,guest_type, first_name, last_name, guest_name, guest_gender FROM mh_booking_txn_table WHERE mh_booking_id = '${mh_booking_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return data;
}
async function getGuestDetailsData(mh_booking_id) {
  let sql = `SELECT mh_booking_id,guest_type, first_name, last_name, guest_name, guest_gender FROM mh_booking_txn_table WHERE mh_booking_id = '${mh_booking_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return data;
}
async function getgststate(gstin_no){
  let splitgst=gstin_no.substring(0,2)
  let sql = `SELECT state_id,state_code,state FROM mh_gst_states_table WHERE state_id='${splitgst}'`
  let result = await db.query(sql);
  return result;
}
async function getFoodDetailsData(mh_booking_id) {

  let sql = `SELECT account_id, booking_id, booking_order_id, food_booking_id, food_booking_orderid, invoice_number, booking_city, booking_city_id, hotel_property_name, near_hospital_name, check_in, check_out, guest_count, no_of_days, foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id, food_booking_date, food_booking_type, total_qty_booked,total_item_qty, food_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, final_price_amount, country_name, country_code, mobile_number, gstin_no, date_format(updated_time,"%d-%m-%Y") as updated_time FROM mh_food_booking_table WHERE booking_order_id = '${mh_booking_id}' ORDER BY updated_time DESC`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let food_items = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      food_items = await getFoodItemDataFromDb(element.booking_order_id,element.food_booking_orderid);
      index = index+1;
      data.push({
        sno: index,
        food_items: food_items,
        ...element,
      });
    }
  }
  console.log("image",data)
  return data;
}
async function getFoodItemDataFromDb(mh_booking_id,food_booking_id) {
  let sql = `SELECT mh_booking_id, mh_booking_order_id, food_booking_id, food_booking_orderid, account_id, foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id, food_txn_id, location, kitchen_name, kitchen_type, selected_food_item, food_items_list, item_quantity, item_price, date_format(updated_time, "%d-%m-%y") as updated_time FROM mh_food_booking_txn_table WHERE mh_booking_order_id = '${mh_booking_id}' AND food_booking_orderid= '${food_booking_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let food_image = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      food_image = await getFoodItemImage(element.food_partner_id,element.food_partner_sub_id,element.food_txn_id);
      index = index+1;
      data.push({
        index: index,
        food_image: food_image,
        ...element,
      });
    }
  }
  return data;
}

async function getMedicalDetailsData(mh_booking_id) {

  let sql = `SELECT account_id, booking_id, booking_order_id, medical_booking_id, medical_booking_orderid, booking_city, booking_city_id, hotel_property_name,equipment_name, equipment_sub_name, near_hospital_name, check_in, check_out, guest_count, no_of_days, eqp_booking_date, eqp_booking_type, total_qty_booked, medical_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, final_price_amount, country_name, country_code, mobile_number, gstin_no, date_format(updated_time,'%d-%m-%y') as updated_time FROM mh_equipment_booking_table WHERE booking_order_id = '${mh_booking_id}' ORDER BY updated_time DESC`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let equipment_items = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      equipment_items = await getMedicalItemDataFromDb(element.booking_order_id,element.medical_booking_orderid);
      index = index+1;
      data.push({
        index: index,
        equipment_items: equipment_items,
        ...element,
      });
    }
  }
  return data;
}
async function getMedicalItemDataFromDb(mh_booking_id,equipment_booking_id) {

  let sql = `SELECT mh_booking_id, mh_booking_order_id, medical_booking_id, medical_booking_orderid, account_id, equipment_id, equipment_name, equipment_sub_id, equipment_sub_name, txn_id, item_name, location, medical_store, units, item_quantity, item_price, date_format(updated_time, '%d-%m-%y') as updated_time  FROM mh_equipment_booking_txn_table WHERE mh_booking_order_id = '${mh_booking_id}'  AND medical_booking_orderid = '${equipment_booking_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let equipment_image = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      equipment_image = await getMedicalItemImage(element.equipment_id,element.equipment_sub_id,element.txn_id);
      index = index+1;
      data.push({
        index: index,
        equipment_image: equipment_image ?? "",
        ...element,
      });
    }
  }
  return data;
}

async function getTravelDetailsData(mh_booking_id) {

  let sql = `SELECT account_id, booking_id, booking_order_id, travel_booking_id, travel_booking_orderid, invoice_number,travel_reference_id,hotel_property_name,property_city_name, property_city_id, near_hospital_name, check_in, check_out, guest_count, no_of_days, booked_date, booking_origin, booking_destination, booking_time, travel_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount, payable_amount, country_code, country_name, mobile_number, gst_number, date_format(updated_datetime,'%d-%m-%y') as update_datetime, agent_id, travel_name, transport_sub_id, transport_sub_name,whatsapp_number,email_id,booking_status FROM mh_travel_booking_table WHERE booking_order_id = '${mh_booking_id}' ORDER BY updated_datetime DESC`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let travel_items = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      travel_items = await getTravelItemDataFromDb(element.booking_order_id,element.travel_booking_orderid);
      index = index+1;
      data.push({
        sno: index,
        travel_items: travel_items,
        ...element,
      });
    }
  }
  return data;
}
async function getTravelItemDataFromDb(mh_booking_id,travel_booking_id) {

  let sql = `SELECT booking_id, booking_order_id, travel_booking_id, travel_booking_orderid, account_id, agent_id, travel_name, transport_sub_id, transport_sub_name,txn_id,vehicle_name, no_of_seaters, price, units, date_format(updated_time,'%d-%m-%y') as updated_time FROM mh_travel_booking_txn_table WHERE booking_order_id = '${mh_booking_id}' AND travel_booking_orderid = '${travel_booking_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let vehicle_image = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      vehicle_image = await getTravelItemImage(element.agent_id,element.transport_sub_id,element.txn_id);
      index = index+1;
      data.push({
        index: index,
        vehicle_image: vehicle_image,
        ...element,
      });
    }
  }
  return data;
}

async function getTravelItemImage(partner_id,partner_sub_id,txn_id) {
  let sql = `SELECT vehicle_image FROM mh_travel_location_table WHERE agent_id = '${partner_id}' AND transport_sub_id = '${partner_sub_id}' AND txn_id = '${txn_id}'`;
  let result = await db.query(sql);
  return result[0].vehicle_image;
}

async function generateMaxBookingId() {
  let sql = `SELECT MAX(booking_id)+1 as id FROM mh_bookings_table WHERE 1`;
 // let sql = `SELECT MAX(booking_id)+1 as id FROM mh_bookings_table_logs WHERE 1`;
  let result = await db.query(sql);
  let data = "";
  if(result[0].id == 0 || result[0].id == null){
    data = 1;
  }else{
    data = result[0].id;
  }
  return data;
}


async function generateMaxCancelId() {
  let sql = `SELECT MAX(s_no)+1 as id FROM mh_accommodation_cancellation_table WHERE 1`;
 // let sql = `SELECT MAX(booking_id)+1 as id FROM mh_bookings_table_logs WHERE 1`;
  let result = await db.query(sql);
  let data = "";
  if(result[0].id == 0 || result[0].id == null){
    data = 1;
  }else{
    data = result[0].id;
  }
  return data;
}
async function getFoodItemImage(food_partner_id,food_partner_sub_id,food_txn_id) {
  let sql = `SELECT food_image FROM mh_foodpartner_details WHERE agent_id = '${food_partner_id}' AND agent_sub_id = '${food_partner_sub_id}' AND txn_id = '${food_txn_id}'`;
  let result = await db.query(sql);
  return result;
}
async function getFoodbookingItemImage(agent_id,agent_sub_id,account_id) {
  let sql = `SELECT food_image FROM mh_foodpartner_details WHERE agent_id = '${agent_id}' AND agent_sub_id = '${agent_sub_id}' AND account_id = '${account_id}'`;
  let result = await db.query(sql);
  return result[0].food_image;
}
async function getFoodBkngItems(food_booking_orderid) {
  let sql = `SELECT mh_booking_id,mh_booking_order_id,food_booking_id,food_booking_orderid,account_id,foodPartner_name,food_partner_id,foodPartner_sub_name,food_partner_sub_id,food_txn_id,location,kitchen_name,kitchen_type,selected_food_item,food_items_list,item_quantity,item_price FROM mh_food_booking_txn_table WHERE  food_booking_orderid = '${food_booking_orderid}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
    let food_image = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
        food_image = await this.getFoodItemImage(
        element.food_partner_id,
        element.food_partner_sub_id,
        element.food_txn_id
      );
      index = index+1;
      data.push({
        sno: index,
        food_image: food_image,
        ...element,
      });
    }
  }
  return data;
}
async function getFoodItems(food_booking_orderid) {
  let sql = `SELECT mh_booking_id,mh_booking_order_id,food_booking_id,food_booking_orderid,account_id,foodPartner_name,food_partner_id,foodPartner_sub_name,food_partner_sub_id,food_txn_id,location,kitchen_name,kitchen_type,selected_food_item,food_items_list,item_quantity,item_price FROM mh_food_booking_txn_table WHERE  food_booking_orderid = '${food_booking_orderid}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
    let food_image = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
        food_image = await this.getFoodItemImage(
        element.food_partner_id,
        element.food_partner_sub_id,
        element.food_txn_id
      );
      index = index+1;
      data.push({
        sno: index,
        food_image: food_image,
        ...element,
      });
    }
  }
  return data;
}
async function generateMaxFoodBookingId(params) {
  let sql = `SELECT MAX(food_booking_id)+1 as id FROM mh_food_booking_table WHERE 1`;
  let result = await db.query(sql);
  let data = "";
  if(result[0].id == 0 || result[0].id == null){
    data = 1;
  }else{
    data = result[0].id;
  }
  return data;
}
async function generateMaxFoodBookingLogsId(params) {
  let sql = `SELECT MAX(food_booking_id)+1 as id FROM mh_food_booking_table_logs WHERE 1`;
  let result = await db.query(sql);
  let data = "";
  if(result[0].id == 0 || result[0].id == null){
    data = 1;
  }else{
    data = result[0].id;
  }
  return data;
}
async function generateMaxAarthiBookingId(table_name,col_name) {
  let selectSql = `SELECT MAX(${col_name})+1 as id FROM ${table_name}`;
  let result = await db.query(selectSql);
  let data = "";

  if (result[0].id === 0 || result[0].id === null) {
    data = 1;
  } else {
    data = result[0].id;
  }

  return data;
}

async function generatereachusID(table_name,col_name) {
  let sql = `SELECT MAX(${col_name})+1 as id FROM ${table_name}`;
  let result = await db.query(sql);
  let data = "";
  if(result[0].id == 0 || result[0].id == null){
    data = 1;
  }else{
    data = result[0].id;
  }
  return data;
}
async function generateMaxMedicalBookingId(params) {
  let sql = `SELECT MAX(medical_booking_id)+1 as id FROM mh_equipment_booking_table WHERE 1`;
  let result = await db.query(sql);
  let data = "";
  if(result[0].id == 0 || result[0].id == null){
    data = 1;
  }else{
    data = result[0].id;
  }
  return data;
}
async function generateMaxTravelBookingId(params) {
  let sql = `SELECT MAX(travel_booking_id)+1 as id FROM mh_travel_booking_table WHERE 1`;
  let result = await db.query(sql);
  let data = "";
  if(result[0].id == 0 || result[0].id == null){
    data = 1;
  }else{
    data = result[0].id;
  }
  return data;
}
async function getMedicalBkngItems(medical_booking_orderid) {
  let sql = `SELECT sno,account_id, equipment_id, equipment_name, equipment_sub_id, equipment_sub_name, txn_id, item_name, location, medical_store, units, item_quantity, item_price,mh_booking_id, mh_booking_order_id, medical_booking_id, medical_booking_orderid, account_id, equipment_id, equipment_name, equipment_sub_id, equipment_sub_name, txn_id, item_name, location, medical_store, units, item_quantity, item_price FROM mh_equipment_booking_txn_table WHERE medical_booking_orderid = '${medical_booking_orderid}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let equipment_image = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      equipment_image = await this.getMedicalItemImage(
        element.equipment_id,
        element.equipment_sub_id,
        element.txn_id
      );
      index = index+1;
      data.push({
        index: index,
        equipment_image: equipment_image,
        ...element,
      });
    }
  }
  return data;
}
async function getMedicalItems(medical_booking_orderid) {
  let sql = `SELECT sno,account_id, equipment_id, equipment_name, equipment_sub_id, equipment_sub_name, txn_id, item_name, location, medical_store, units, item_quantity, item_price,mh_booking_id, mh_booking_order_id, medical_booking_id, medical_booking_orderid, account_id, equipment_id, equipment_name, equipment_sub_id, equipment_sub_name, txn_id, item_name, location, medical_store, units, item_quantity, item_price FROM mh_equipment_booking_txn_table WHERE medical_booking_orderid = '${medical_booking_orderid}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let equipment_image = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      equipment_image = await this.getMedicalItemImage(
        element.equipment_id,
        element.equipment_sub_id,
        element.txn_id
      );
      index = index+1;
      data.push({
        index: index,
        equipment_image: equipment_image,
        ...element,
      });
    }
  }
  return data;
}

async function getMedicalItemImage(equipment_id,equipment_sub_id,txn_id) {
  let sql = `SELECT equipment_image FROM mh_equipment_location_table WHERE equipment_id = '${equipment_id}' AND equipment_sub_id = '${equipment_sub_id}' AND txn_id = '${txn_id}'`;
  let result = await db.query(sql);
  return result[0].equipment_image;
}
async function getTravelBkngItems(travel_booking_orderid) {
  let sql = `SELECT sno,booking_id,booking_order_id,travel_booking_id,travel_booking_orderid,account_id,agent_id,travel_name,transport_sub_id,transport_sub_name,txn_id,vehicle_type,vehicle_name,no_of_seaters,price,special_offer	 FROM mh_travel_booking_txn_table WHERE travel_booking_orderid = '${travel_booking_orderid}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let vehicle_image = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      vehicle_image = await this.getTravelItemImage(
        element.agent_id,
        element.transport_sub_id,
        element.txn_id
      );
      index = index+1;
      data.push({
        sno: index,
        vehicle_image: vehicle_image,
        ...element,
      });
    }
  }
  return data;
}
async function loadPartnerName(partner_id) {
  let sql = `SELECT partner_name FROM mh_property_details_table WHERE partner_id = '${partner_id}'`;
  let result = await db.query(sql);
  return result[0].partner_name;
}
async function loadFoodDetailsData(mh_booking_id) {

  let sql = `SELECT account_id, booking_id, booking_order_id, food_booking_id, food_booking_orderid, invoice_number, booking_city, booking_city_id, hotel_property_name, near_hospital_name, check_in, check_out, guest_count, no_of_days, foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id, food_booking_date, food_booking_type, total_qty_booked,total_item_qty, food_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, final_price_amount, country_name, country_code, mobile_number, gstin_no, date_format(updated_time,"%d-%m-%Y") as updated_time FROM mh_food_booking_table WHERE booking_order_id = '${mh_booking_id}' ORDER BY updated_time DESC`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let food_items = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      food_items = await loadFoodItemDataFromDb(element.booking_order_id,element.food_booking_orderid);
      index = index+1;
      data.push({
        sno: index,
        food_items: food_items,
        ...element,
      });
    }
  }
  return data;
}
async function loadFoodItemDataFromDb(mh_booking_id,food_booking_id) {
  let sql = `SELECT mh_booking_id, mh_booking_order_id, food_booking_id, food_booking_orderid, account_id, foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id, food_txn_id, location, kitchen_name, kitchen_type, selected_food_item, food_items_list, item_quantity, item_price, date_format(updated_time, "%d-%m-%y") as updated_time FROM mh_food_booking_txn_table WHERE mh_booking_order_id = '${mh_booking_id}' AND food_booking_orderid= '${food_booking_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let food_image = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      food_image = await getFoodItemImage(element.food_partner_id,element.food_partner_sub_id,element.food_txn_id);
      index = index+1;
      data.push({
        index: index,
        food_image: food_image,
        ...element,
      });
    }
  }
  return data;
}
async function loadMedicalDetailsData(mh_booking_id) {

  let sql = `SELECT account_id, booking_id, booking_order_id, medical_booking_id, medical_booking_orderid, booking_city, booking_city_id, hotel_property_name,equipment_name, equipment_sub_name, near_hospital_name, check_in, check_out, guest_count, no_of_days, eqp_booking_date, eqp_booking_type, total_qty_booked, medical_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, final_price_amount, country_name, country_code, mobile_number, gstin_no, date_format(updated_time,'%d-%m-%y') as updated_time FROM mh_equipment_booking_table WHERE booking_order_id = '${mh_booking_id}' ORDER BY updated_time DESC`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let equipment_items = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      equipment_items = await loadMedicalItemDataFromDb(element.booking_order_id,element.medical_booking_orderid);
      index = index+1;
      data.push({
        index: index,
        equipment_items: equipment_items,
        ...element,
      });
    }
  }
  return data;
}
async function loadMedicalItemDataFromDb(mh_booking_id,equipment_booking_id) {

  let sql = `SELECT mh_booking_id, mh_booking_order_id, medical_booking_id, medical_booking_orderid, account_id, equipment_id, equipment_name, equipment_sub_id, equipment_sub_name, txn_id, item_name, location, medical_store, units, item_quantity, item_price, date_format(updated_time, '%d-%m-%y') as updated_time  FROM mh_equipment_booking_txn_table WHERE mh_booking_order_id = '${mh_booking_id}'  AND medical_booking_orderid = '${equipment_booking_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let equipment_image = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      equipment_image = await getMedicalItemImage(element.equipment_id,element.equipment_sub_id,element.txn_id);
      index = index+1;
      data.push({
        index: index,
        equipment_image: equipment_image ?? "",
        ...element,
      });
    }
  }
  return data;
}
async function loadTravelDetailsData(mh_booking_id) {

  let sql = `SELECT account_id, booking_id, booking_order_id, travel_booking_id, travel_booking_orderid, invoice_number,travel_reference_id,hotel_property_name,property_city_name, property_city_id, near_hospital_name, check_in, check_out, guest_count, no_of_days, booked_date, booking_origin, booking_destination, booking_time, travel_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount, payable_amount, country_code, country_name, mobile_number, gst_number, date_format(updated_datetime,'%d-%m-%y') as update_datetime, agent_id, travel_name, transport_sub_id, transport_sub_name,whatsapp_number,email_id,booking_status FROM mh_travel_booking_table WHERE booking_order_id = '${mh_booking_id}' ORDER BY updated_datetime DESC`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let travel_items = [];
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      travel_items = await loadTravelItemDataFromDb(element.booking_order_id,element.travel_booking_orderid);
      index = index+1;
      data.push({
        sno: index,
        travel_items: travel_items,
        ...element,
      });
    }
  }
  return data;
}
async function loadTravelItemDataFromDb(mh_booking_id,travel_booking_id) {

  let sql = `SELECT booking_id, booking_order_id, travel_booking_id, travel_booking_orderid, account_id, agent_id, travel_name, transport_sub_id, transport_sub_name,txn_id,vehicle_name, no_of_seaters, price, units, date_format(updated_time,'%d-%m-%y') as updated_time FROM mh_travel_booking_txn_table WHERE booking_order_id = '${mh_booking_id}' AND travel_booking_orderid = '${travel_booking_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let vehicle_image = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      vehicle_image = await loadTravelItemImage(element.agent_id,element.transport_sub_id,element.txn_id);
      index = index+1;
      data.push({
        index: index,
        vehicle_image: vehicle_image,
        ...element,
      });
    }
  }
  return data;
}

async function loadTravelItemImage(partner_id,partner_sub_id,txn_id) {
  let sql = `SELECT vehicle_image FROM mh_travel_location_table WHERE agent_id = '${partner_id}' AND transport_sub_id = '${partner_sub_id}' AND txn_id = '${txn_id}'`;
  let result = await db.query(sql);
  return result[0].vehicle_image;
}
async function loadSubPartnerName(partner_id,partner_sub_id) {
  let sql = `SELECT sub_partner_name FROM mh_property_details_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}'`;
  let result = await db.query(sql);
  return result[0].sub_partner_name;
}
async function loadGuestDetailsDataFromDb(mh_booking_id) {
  let sql = `SELECT mh_booking_id,guest_type, first_name, last_name, guest_name, guest_gender FROM mh_booking_txn_table WHERE mh_booking_id = '${mh_booking_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return data;
}
async function loadHotelImageBasedonPartner(partner_id,partner_sub_id,property_txn_id) {
  let sql = `SELECT upload_image FROM mh_property_details_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND txn_id = '${property_txn_id}'`;
  let result = await db.query(sql);
  return result[0].upload_image;
}
async function loadRoomImage1(partner_id,partner_sub_id,property_txn_id,room_txn_id) {
  let sql = `SELECT room_image_1 FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND property_txn_id = '${property_txn_id}' AND txn_id = '${room_txn_id}'`;
  let result = await db.query(sql);
  return result[0].room_image_1;
}
async function loadRoomImage2(partner_id,partner_sub_id,property_txn_id,room_txn_id) {
  let sql = `SELECT room_image_2 FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND property_txn_id = '${property_txn_id}' AND txn_id = '${room_txn_id}'`;
  let result = await db.query(sql);
  return result[0].room_image_2;
}
async function loadRoomImage3(partner_id,partner_sub_id,property_txn_id,room_txn_id) {
  let sql = `SELECT room_image_3 FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND property_txn_id = '${property_txn_id}' AND txn_id = '${room_txn_id}'`;
  let result = await db.query(sql);
  return result[0].room_image_3;
}
async function getCancellationByPropertyName(account_id, txn_id) {
  let sql = `SELECT * FROM mh_accommodation_cancellation_table WHERE account_id='${account_id}' AND txn_id ='${txn_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;
      data.push({
        s_no: index,
        ...element,
      });
    }
  }
  return data;
}
async function getMonthwisePartnerAccBookings(txn_id) {
  let sql = `SELECT
    MONTHNAME(inserted_date_time) AS month_name, COUNT(s_no) AS total_bookings, SUM(no_of_days) as total_nights, SUM(guest_count) as total_guests, SUM(room_booked_count) as total_rooms, SUM(total_price) as booking_amount
    FROM mh_bookings_table
    WHERE inserted_date_time > '2023-03-15' AND total_price > 200 AND 
    booking_status = 'Booked' AND hotel_txn_id = '${txn_id}'
    GROUP BY MONTHNAME(inserted_date_time)
    ORDER BY MONTH(inserted_date_time) `;
    
   let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index + 1;
      data.push({
        s_no: index,
        ...element,
      });
    }
    // console.log("helperdata",data);
  }
  return {data};
}
async function getMonthwisePartnerAccCancellations(txn_id) {
  let sql = ` SELECT 
  MONTHNAME(created_datetime) AS month_name,
  COUNT(s_no) AS total_cancellations,
  SUM(no_of_days) AS total_nights,
  SUM(total_price) AS total_booking_amount,
  SUM(refundAmount) AS total_refund_amount
FROM mh_accommodation_cancellation_table
WHERE created_datetime > '2023-03-15'  AND txn_id = '${txn_id}'
GROUP BY MONTHNAME(created_datetime)
ORDER BY MONTH(created_datetime); `;
    
let result = await db.query(sql);
  let data = [];
  
  for (let i = 0; i < result.length; i++) {
    const element = result[i];
    data.push({
      s_no: i + 1,
      month_name: element.month_name,
      total_cancellations: element.total_cancellations,
      total_nights: element.total_nights,
      total_booking_amount: element.total_booking_amount,
      total_refund_amount: element.total_refund_amount,
    });
  }
  
  return data;
}
async function getpartnerDetails(PARTNERID,PARTNERSUBID,txn_id) {
  let sql = `SELECT account_id, booking_id, booking_order_id,reference_id,invoice_number,partner_id, partner_sub_id, hotel_txn_id, room_txn_id, property_name, property_type, room_type, near_hospital_id, near_hospital_name,date_format(check_in,"%d/%m/%Y") as check_in,date_format(check_out,"%d/%m/%Y") as check_out , guest_count, no_of_days, room_price, discount,partner_offer_percentage,partner_offer,base_price, discount_price, price_after_discount, mh_offer_price, mh_offer_name, gst_percentage, gst_amount,cgst_percentage, cgst_amount,sgst_percentage, sgst_amount, total_price, country_code, country_name,phone_no,primary_no,alternate_email_id,address_line_1,address_line_2,state_id,state_name,city,property_city_id,property_city_name,property_state_id,property_state_name,email_id,alternate_no,pincode,gstin_no,date_format(inserted_date_time,'%d/%m/%y') as inserted_date_time,date_format(inserted_date_time,'DD MMM YYYY') as inserted_date,checkIn_time,checkOut_time,facilities,room_category,address FROM mh_bookings_table WHERE inserted_date_time > '2023-03-15' AND total_price > 200 AND booking_status = 'Booked' AND partner_id='${PARTNERID}' AND partner_sub_id='${PARTNERSUBID}' AND hotel_txn_id = '${txn_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let GuestDetails = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      GuestDetails = await getAccDetails(element.booking_order_id);
      index = index+1;
      data.push({
        sno: index,
        GuestDetails: GuestDetails,
        ...element,
      });
    }
  }
  return data;
}
async function getAccDetails(booking_order_id) {
  let sql = `SELECT mh_booking_id,guest_type, first_name, last_name, guest_name, guest_gender FROM mh_booking_txn_table WHERE mh_booking_id='${booking_order_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return {data};
}
async function getpartnerroomDetails(account_id,txn_id) {
  let sql = `SELECT *,(SELECT COUNT(*) FROM mh_property_rooms_table WHERE account_id='${account_id}' AND property_txn_id='${txn_id}') AS chandu FROM mh_property_rooms_table WHERE account_id='${account_id}' AND property_txn_id='${txn_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return {data};
}
async function getTravelVechicle(accountid,agentid,transportsubid) {
  let sql = `SELECT sno, account_id, booking_id, booking_order_id, travel_booking_id, travel_booking_orderid, invoice_number, property_city_name, property_city_id, near_hospital_name, date_format(check_in, "%d/%m/%Y") as check_in, date_format(check_out, "%d/%m/%Y") as check_out, guest_count, no_of_days, date_format(booked_date, "%d-%m-%Y") as booked_date, booking_origin, booking_destination, booking_time, travel_charges, discount, discount_price, base_price, mh_offer_price, mh_offer_coupon, price_after_discount, gst_percentage, gst_on_base_price, payable_amount, country_code, country_name, mobile_number, gst_number, date_format(updated_datetime, '%d-%m-%y') as update_time, agent_id, travel_name, transport_sub_id, transport_sub_name, hotel_property_name, travel_reference_id, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, whatsapp_number, email_id,booking_status FROM mh_travel_booking_table WHERE booking_status = 'Booked' AND account_id = '${accountid}' AND agent_id = '${agentid}' AND transport_sub_id = '${transportsubid}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return {data};
}
async function getTravelcancelData(transportsubid) {
  let sql = `SELECT s_no, booking_order_id, travel_booking_orderid, travel_name, transport_sub_name,account_id, agent_id, transport_sub_id, booking_origin, booking_destination, mobile_number, booked_date, booking_time, travel_charges, mh_offer_coupon, mh_offer_price, gst_percentage, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, payable_amount, cancellation_percentage, cancellationtravel, travelrefundamount, created_datetime FROM mh_travel_cancellation_table WHERE  transport_sub_id = '${transportsubid}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const element of result) {
    index = index + 1;
    data.push({
      sno: index,
      ...element,
    });
  }
  return data;
}
async function getVehicledetails(travel_booking_orderid) {
  let sql = `SELECT sno,booking_id,booking_order_id,travel_booking_id,travel_booking_orderid,account_id,agent_id,travel_name,transport_sub_id,transport_sub_name,txn_id,vehicle_type,units,vehicle_name,no_of_seaters,price,special_offer	 FROM mh_travel_booking_txn_table WHERE travel_booking_orderid = '${travel_booking_orderid}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  let vehicle_image = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      
      vehicle_image = await this.getTravelItemImage(
        element.agent_id,
        element.transport_sub_id,
        element.txn_id
      );
      index = index+1;
      data.push({
        index: index,
        vehicle_image: vehicle_image,
        ...element,
      });
    }
  }
  return data;
}
async function getguestdetails(mh_booking_id) {
  let sql = `SELECT mh_booking_id,guest_type, first_name, last_name, guest_name, guest_gender FROM mh_booking_txn_table WHERE mh_booking_id = '${mh_booking_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return data;
}
async function getFoodItemsData(itemTxnId,accountid,partnerid,partnersubid) {
  let sql = `SELECT item_txn_id, agent_id, agent_sub_id, item_txn_id, kitchen_name, kitchen_type, item_name, items_available_from, items_available_to, food_type_id, food_items_name, price, units, food_image, status, partner_status, updated_datetime, ip_address FROM mh_foodpartner_details WHERE item_txn_id = '${itemTxnId}' AND account_id = '${accountid}' AND agent_id='${partnerid}' AND agent_sub_id='${partnersubid}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return {data};
}

async function getfood(accountid,partnerid,partnersubid) {
  let sql = `SELECT s_no,account_id,booking_id,	booking_order_id,account_id,food_booking_id,food_booking_orderid,invoice_number,booking_city,booking_city_id,hotel_property_name,near_hospital_name,date_format(check_in,"%d/%m/%Y") as check_in,date_format(check_out,"%d/%m/%Y") as check_out,guest_count,no_of_days,	date_format(food_booking_date,"%d-%m-%Y") as food_booking_date,food_booking_type,total_qty_booked,total_item_qty,food_charges,discount,discount_price,base_price,mh_offer_price,mh_offer_coupon,price_after_discount,gst_percentage,gst_on_base_price,final_price_amount,country_name,country_code,mobile_number,gstin_no,foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id,whatsapp_number,email_id,food_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount FROM mh_food_booking_table WHERE account_id = '${accountid}' AND food_partner_id='${partnerid}' AND food_partner_sub_id='${partnersubid}' `;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return {data};
}
async function getMedicalStoreitems(accountid,partnerid,partnersubid) {
  let sql = `SELECT account_id, txn_id, equipment_id, equipment_sub_id, agent_name, equipment_sub_name, item_id, item_name, price, units_id, units, equipment_image, status, medical_store, purchased_type, address, location, city, city_id, special_offer, partner_status, ip_address FROM mh_equipment_location_table WHERE  account_id = '${accountid}' AND equipment_id='${partnerid}' AND equipment_sub_id='${partnersubid}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return {data};
}
async function getequipment(accountid,partnerid,partnersubid) {
  let sql = `SELECT sno,account_id,booking_id,booking_order_id,account_id,medical_booking_id,medical_booking_orderid,invoice_number,booking_city,booking_city_id,hotel_property_name,near_hospital_name,date_format(check_in,"%d/%m/%Y") as check_in,date_format(check_out,"%d/%m/%Y") as check_out ,guest_count,no_of_days,	date_format(eqp_booking_date,"%d-%m-%Y") as eqp_booking_date,eqp_booking_type,total_qty_booked,total_item_qty,equipment_name,equipment_id,equipment_sub_name,equipment_sub_id,medical_charges,discount,discount_price,base_price,mh_offer_price,mh_offer_coupon,price_after_discount,gst_percentage,gst_on_base_price,final_price_amount,country_name,country_code,mobile_number,gstin_no,whatsapp_number,email_id,medical_reference_id,cgst_percentage,cgst_amount,sgst_percentage,sgst_amount,days_booked_for FROM mh_equipment_booking_table WHERE account_id = '${accountid}' AND equipment_id='${partnerid}' AND equipment_sub_id='${partnersubid}' `;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return {data};
}
async function getfoodDetails(booking_id) {
  const sql = `SELECT mh_booking_id, mh_booking_order_id, food_booking_id, food_booking_orderid, account_id, foodPartner_name, food_partner_id, foodPartner_sub_name, food_partner_sub_id, food_txn_id, location, kitchen_name, kitchen_type, selected_food_item, food_items_list, item_quantity, item_price, date_format(updated_time, "%d-%m-%y") as updated_time FROM mh_food_booking_txn_table WHERE food_booking_orderid='${booking_id}' `;
  const result = await db.query(sql);
  let data = [];
  let index = 0;
  let food_image="";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      food_image = await getFoodItemImage(element.food_partner_id,element.food_partner_sub_id,element.food_txn_id);
      data.push({
        sno: index,
        food_image:food_image,
        ...element,
      });
    }
  }
  return data;
}
async function getmedical(booking_id) {
  const sql = `SELECT  mh_booking_id, mh_booking_order_id, medical_booking_id, medical_booking_orderid, account_id, equipment_id, equipment_name, equipment_sub_id, equipment_sub_name, txn_id, item_name, location, medical_store, units, item_quantity, item_price, date_format(updated_time, '%d-%m-%y') as updated_time  FROM mh_equipment_booking_txn_table WHERE medical_booking_orderid='${booking_id}' `;
  const result = await db.query(sql);
  let data = [];
  let index = 0;
  let equipment_image = "";
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      equipment_image = await getMedicalItemImage(element.equipment_id,element.equipment_sub_id,element.txn_id);
      
      index = index+1;
      data.push({
        sno: index,
        equipment_image: equipment_image ?? "",
        ...element,
      });
    }
  }
  return data;
}
async function getTravelLocationData(account_id,agentid,transportsubid) {
  let sql = `SELECT txn_id, agent_id, account_id, transport_sub_id, travel_name, no_of_seaters, transport_sub_name, city_id, city, address, location, vehicle_type, vehicle_name, day_price, night_price, units, description, special_offer, vehicle_image, travel_status, status, ip_address FROM mh_travel_location_table WHERE agent_id = '${agentid}' AND transport_sub_id = '${transportsubid}' AND account_id = '${account_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return {data};
}
async function getCancellationForMasterReport(booking_order_id) {
  let sql = `SELECT booking_order_id, property_name, property_type, room_type, phone_no, check_in, check_out, no_of_days, room_price, discount, discount_price, mh_offer_name, mh_offer_price, gst_percentage, gst_amount, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, total_price, cancellation_percentage, cancellAmount, refundAmount FROM mh_accommodation_cancellation_table WHERE booking_order_id = '${booking_order_id}' `;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return {data};
}
async function getPropertyRoomDetailsForMasterReport(partner_id,partner_sub_id,account_id) {
  let sql = `SELECT * FROM mh_property_rooms_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND account_id = '${account_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return data;
}

async function generateHospitalMasterID(table_name, col_name) {
  let sql = `SELECT MAX(${col_name}) +1 as id FROM ${table_name}`;
  let result = await db.query(sql);
  let data = "";
  if (result[0].id == 0 || result[0].id == null) {
    data = 1;
  } else {
    data = result[0].id;
  }
  return data;
}
//Patient Details ID Helper
async function generatehealthSupportID(table_name, col_name) {
  let sql = `SELECT MAX(${col_name}) +1 as id FROM ${table_name}`;
  let result = await db.query(sql);
  let data = "";
  if (result[0].id == 0 || result[0].id == null) {
    data = 1;
  } else {
    data = result[0].id;
  }
  return data;
}
async function generatePaymentForPartnerID(table_name,col_name) {
  let sql = `SELECT MAX(${col_name})+1 as id FROM ${table_name}`;
  let result = await db.query(sql);
  let data = "";
  if(result[0].id == 0 || result[0].id == null){
    data = 1;
  }else{
    data = result[0].id;
  }
  return data;
}
async function getMhService(account_id) {
  let sql = `SELECT mh_service_fee,property_gstin FROM mh_property_details_table WHERE property_status !='property_status' AND account_id = '${account_id}' `;

  // let sql = `SELECT mh_property_details_table,guest_type, first_name, last_name, guest_name, guest_gender FROM mh_booking_txn_table WHERE mh_booking_id = '${mh_booking_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return data;
}

async function getagentFeeonProperty(account_id,txn_id) {
  // console.log("account_id,txn_id",account_id,txn_id);
  let sql = `SELECT agent_fee_on_property FROM mh_property_details_table WHERE  account_id = '${account_id}' AND txn_id = '${txn_id}' `;


  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return data;
}


async function loadpropertyGstNumberFromDb(account_id) {
  let sql = `SELECT property_gstin FROM mh_property_details_table WHERE property_status !='Pending' AND account_id = '${account_id}' `;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
   
  }
  return data;
}

async function loadAgentCommissionFromDb(account_id) {
  let sql = `SELECT agent_commission FROM mh_agent_master WHERE status !='Pending' AND account_id = '${account_id}' `;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
    // console.log("agent commmision",data)
  }
  return data;
}
async function loaddateOfCancellationDataFromDb(	booking_order_id) {
  let sql = `SELECT date_format(created_datetime,'%Y/%m/%d') as created_datetime FROM mh_accommodation_cancellation_table WHERE 	booking_order_id = '${	booking_order_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return data;
}
async function loadcancelledAmountDataFromDb(	booking_order_id) {
  let sql = `SELECT refundAmount,partner_amount_on_cancel,cancellAmount FROM mh_accommodation_cancellation_table WHERE 	booking_order_id = '${	booking_order_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return data;
}
async function getGSTOnProperty(account_id) {
  let sql = `SELECT property_gstin FROM mh_property_details_table WHERE property_status !='Pending' AND account_id = '${account_id}' `;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return data;
}




async function getBankDetailsofProperty(account_id) {
  let sql = `SELECT bankAccountNo,bankName,branchName,ifsc,cancelled_cheque_doc FROM mh_property_details_table WHERE property_status !='Pending' AND account_id = '${account_id}' `;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return data;
}
async function loadtesttypeFromDb(	mh_aarthi_booking_id) {
  let sql = `SELECT s_no, mh_aarthi_booking_id, test_type, test_name, price, total_price, date_format(booked_date,'%d-%m-%Y') as booked_date, date_format(test_date,'%d-%m-%Y') as test_date, test_time, payment_type, status, updated_date FROM mh_aarthi_scan_booking_txn WHERE 	mh_aarthi_booking_id = '${	mh_aarthi_booking_id}'`;
  let result = await db.query(sql);
  let data = [];
  let index = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const element = result[key];
      index = index+1;
      data.push({
        sno: index,
        ...element,
      });
    }
  }
  return data;
}
async function generateUserID(table_name,col_name) {
  let sql = `SELECT MAX(${col_name})+1 as id FROM ${table_name}`;
  let result = await db.query(sql);
  let data = "";
  if(result[0].id == 0 || result[0].id == null){
    data = 1;
  }else{
    data = result[0].id;
  }
  return data;
}
async function getPropertyinfo(partner_id,partner_sub_id,account_id) {
  let sql = `SELECT txn_id, account_id, partner_id, partner_sub_id, partner_name, sub_partner_name, partner_phone, property_id, property_name, sub_property_name, property_phone, property_email, property_alternate_email, property_email_bkp, property_description, property_latitude, property_longitude, building_no, street, land_mark, country, state_id, state_name, city_id, city_name, pin_code, amenity_name, amenity_icon, checkIn_time, checkOut_time, Name_Of_Contact_Person, upload_image, upload_image1, upload_image2, upload_image3, upload_image4, remarks, property_status, ip_address, bankAccountNo, bankName, branchName, ifsc, cancelled_cheque_doc, mh_agreement, mh_declaration, mh_bankmandate, mh_gstin, mh_offer_status, mh_service_fee, property_gstin FROM mh_property_details_table WHERE partner_id = '${partner_id}' AND partner_sub_id = '${partner_sub_id}' AND account_id = '${account_id}' `;
  let result = await db.query(sql);
  return result[0];
}
async function getPropertyHotelMasterinfo(city_seo_name,hospital_seo_name,subproperty_seo_name) {
  let sql = `SELECT sno, near_hospital_id, concat(near_hospital_name,"," , " ",locality) as near_hospital_name, locality, hospital_nick_name, city_seo_name, hospital_seo_name,subproperty_seo_name, type, latitude, longitude, distance_from_hospital, city_id, city, city_alias, state, address, pin_code, specialty, gmap_loc_link, no_of_bed, hospital_link, ratings, status FROM mh_hospital_master WHERE city_seo_name = '${city_seo_name}' AND  hospital_seo_name = '${hospital_seo_name}' AND subproperty_seo_name = '${subproperty_seo_name}' `;
  let result = await db.query(sql);
  return result[0];
}
async function generatePatientID() {
  let currentDate = new Date();
  let day = String(currentDate.getDate()).padStart(2, "0");
  let month = String(currentDate.getMonth() + 1).padStart(2, "0");
  let year = String(currentDate.getFullYear()).slice(2);
  
  let sql = `SELECT COUNT(*) as patient_count FROM mhgenie_patient_details WHERE DATE(created_datetime) = CURDATE();`;
  let result = await db.query(sql);

  let patientCount = result[0].patient_count;
  let sequenceNumber = String(patientCount + 1).padStart(2, "0");

  let newPatientId = `PID${day}${month}${year}${sequenceNumber}`;

  return newPatientId;
}



module.exports = {
  getOffset,
  emptyOrRows,
  generateNumeraricIncID,
  getSchemeNameBySchemeId,
  getvarietalNameByVarietalId,
  getCropNameByCropId,
  getCountOfPartnerId,
  getCountOfAgentId,
  getCountOfEquipmentId,
  generatePartnerSUBID,
  generateAgentSUBID,
  generateEquipmentSUBID,
  getCountOfTransportId,
  generateTransportSUBID,
  // generatePropertyTxnId,
  getCountOfFoodId,
  generateFoodPartnerSUBID,
  getHotelImageBasedonPartner,
  getHotelImageBasedonPartner1,
  getRoomDetails,
  getRoomUnits,
  getHotelAddress,
  generateMaxBookingId,
  generateNumeraricInGrievance,
  getRoomImage1,
  getRoomImage2,
  getRoomImage3,
  getGuestDetailsDataFromDb,
  getPartnerName,
  getSubPartnerName,
  generateMaxFoodBookingId,
  generateMaxFoodBookingLogsId,
  getFoodBkngItems,
  getFoodDetailsData,
  getFoodItemDataFromDb,
  getTravelDetailsData,
  getTravelItemDataFromDb,
  getMedicalDetailsData,
  getMedicalItemDataFromDb,
  getFoodItemImage,
  generateMaxTravelBookingId,
  getTravelBkngItems,
  getTravelItemImage,
  generateMaxMedicalBookingId,
  getMedicalBkngItems,
  getMedicalItemImage,
  getGuestDetailsData,
  getMedicalItems,
  getFoodItems,
  getbookingDetails,
  getgststate,
  loadMedicalDetailsData,
  loadPartnerName,
  loadFoodDetailsData,
  loadTravelDetailsData,
  loadSubPartnerName,
  loadGuestDetailsDataFromDb,
  loadHotelImageBasedonPartner,
  loadRoomImage1,
  loadRoomImage2,
  loadRoomImage3,
  getpartnerDetails,
  getpartnerroomDetails,
  getTravelVechicle,
  getVehicledetails,
  getguestdetails,
  getfood,
  getfoodDetails,
  getequipment,
  getmedical,
  getTravelLocationData,
  getFoodItemsData,
  getFoodbookingItemImage,
  getMedicalStoreitems,
  getCancellationForMasterReport,
  getPropertyRoomDetailsForMasterReport,
  getHotelAddressForPage2,
  getRoomSpecialOfferDetails,
  getgstetails,
  getpartneSpecialOffer,
  generatereachusID,
  generateHospitalMasterID,
  generatehealthSupportID,
  getnoOfAvalableRoomMdetails,
  getMaximumAdultAllowdetails,
  getMaximumKidsAllowdetails,
  getmhOfferStatus,
  generatePaymentForPartnerID,
  getMhService,
  getGSTOnProperty,
  getBankDetailsofProperty,
  loadpropertyGstNumberFromDb,
  loaddateOfCancellationDataFromDb,
  loadcancelledAmountDataFromDb,
  loadAgentCommissionFromDb,
  getCancellationByPropertyName,
  getMonthwisePartnerAccBookings,
  getMonthwisePartnerAccCancellations,
  generateMaxAarthiBookingId,
  loadtesttypeFromDb,
  getgetPropertydata,
  getgetPropertydata1,
  getHotelAddressForPage21,
  getmhOfferStatus1,
  getroomTypePrioritydetails,
  generateMaxCancelId,
    // getwelcomeOfferDetails,
  getHotelAddressForHotelInfo,
getPropertyHotelMasterinfo,
getPropertyinfo,
generateUserID,
getTravelcancelData,
generatePatientID,
getagentFeeonProperty,
};